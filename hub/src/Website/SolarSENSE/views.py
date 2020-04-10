from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from SolarSENSE.models import Video
from django.urls import reverse
from django.db.models import Case, CharField, Value, When, Count
from django.contrib.contenttypes.models import ContentType
from django.views.generic import ListView

def test(request):
    return HttpResponse('This is a test page')

def templateTest(request):
    mediaImage = Video.objects.get(name = "testMedia")
    context = {
        "media":mediaImage
    }
    return render(request, "templateTest.html", context)

class VideosView(ListView):
    paginate_by = 7
    model = Video
    template_name = "list.html"

def tagTest(request):
    context = {}
    return render(request, "tagTest.html", context)

def showTags(request):
    temp = 0
    water = 0
    sunlight = 0
    phosphate = 0
    try:
        temp = request.POST["temperature"]
        water = request.POST["water"]
        sunlight = request.POST["sunlight"]
        phosphate = request.POST["phosphate"]
    except (KeyError):
        HttpResponse("The value was invalid")

    allVideos = Video.objects.all()

    waterSet = allVideos.filter(tags__type="water", tags__min__lte=water, tags__max__gte=water)
    waterSet = allVideos.difference(allVideos.filter(tags__type="water")).union(waterSet)

    tempSet = allVideos.filter(tags__type="temperature", tags__min__lte=temp, tags__max__gte=temp)
    tempSet = allVideos.difference(allVideos.filter(tags__type="temperature")).union(tempSet)

    sunSet = allVideos.filter(tags__type="sunlight", tags__min__lte=sunlight, tags__max__gte=sunlight)
    sunSet = allVideos.difference(allVideos.filter(tags__type="sunlight")).union(sunSet)

    phosSet = allVideos.filter(tags__type="phosphate", tags__min__lte=phosphate, tags__max__gte=phosphate)
    phosSet = allVideos.difference(allVideos.filter(tags__type="phosphate")).union(phosSet)

    videos = waterSet.intersection(tempSet, phosSet, sunSet)
    
    names = []
    for x in videos:
        names.append(x.tags.names())

    context = {
        "videos":videos,
        "nameSet":tuple(names)
    }
    return render(request, "tagResult.html", context)

def uploadVideos(request):
    if request.method == "POST":
        files = request.FILES.getlist('videos')
        for f in files:
            Video.objects.create(name=f.name, content=f)
    return HttpResponseRedirect(reverse("admin:SolarSENSE_video_changelist"))

def changeTags(request):
    if request.method == "GET":
        request.session["ct"] = request.GET["ct"]
        request.session["ids"] = request.GET["ids"].split(",")
        return render(request, "admin/set_tag_page.html", {})
    elif request.method == "POST":
        objType = ContentType.objects.get_for_id(request.session["ct"])
        video_query_set = []
        for id in request.session["ids"]:
            video_query_set.append(objType.get_object_for_this_type(pk=id))
        
        for video in video_query_set:
            for tag in request.POST.getlist("Option"):
                video.tags.add(tag)
    return HttpResponseRedirect(reverse("admin:SolarSENSE_video_changelist"))

    
# def importTagSettings(request):
#     return HttpResponseRedirect(reverse("admin:SolarSENSE_video_changelist"))

# def exportTagSettings(request):
#     return HttpResponseRedirect(reverse("admin:SolarSENSE_video_changelist"))
