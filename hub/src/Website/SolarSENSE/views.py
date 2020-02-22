from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from SolarSENSE.models import Video
from django.db.models import Case, CharField, Value, When, Count

def test(request):
    return HttpResponse('This is a test page')

def templateTest(request):
    mediaImage = Video.objects.get(name = "testMedia")
    context = {
        "media":mediaImage
    }
    return render(request, "templateTest.html", context)

def tagTest(request):
    context = {}
    return render(request, "tagTest.html", context)

def showTags(request):
    temp = request.GET["temperature"]
    water = request.GET["water"]
    phosphate = request.GET["phosphate"]
    sunlight = request.GET["sunlight"]

    validVideos = {}

    
    totalSet = Video.objects.annotate(valid=Case(When(tags__type="water", then=(Case(When(tags__min__lte=water, tags__max__gte=water, then=Value("True"))))), default=Value("False"), output_field=CharField()))
    possibleSet = totalSet.filter(valid="True").distinct()
    for x in possibleSet:
        validVideos[x.name] = totalSet.filter(name=x.name, valid="True").count() == x.tags.filter(type="water").count()

    
    totalSet = Video.objects.annotate(valid=Case(When(tags__type="temperature", then=(Case(When(tags__min__lte=temp, tags__max__gte=temp, then=Value("True"))))), default=Value("False"), output_field=CharField()))
    possibleSet = totalSet.filter(valid="True").distinct()
    for x in possibleSet:
        validVideos[x.name] = totalSet.filter(name=x.name, valid="True").count() == x.tags.filter(type="temperature").count()

    
    totalSet = Video.objects.annotate(valid=Case(When(tags__type="phosphate", then=(Case(When(tags__min__lte=phosphate, tags__max__gte=phosphate, then=Value("True"))))), default=Value("False"), output_field=CharField()))
    possibleSet = totalSet.filter(valid="True").distinct()
    for x in possibleSet:
        validVideos[x.name] = totalSet.filter(name=x.name, valid="True").count() == x.tags.filter(type="phosphate").count()

    
    totalSet = Video.objects.annotate(valid=Case(When(tags__type="sunlight", then=(Case(When(tags__min__lte=sunlight, tags__max__gte=sunlight, then=Value("True"))))), default=Value("False"), output_field=CharField()))
    possibleSet = totalSet.filter(valid="True").distinct()
    for x in possibleSet:
        validVideos[x.name] = totalSet.filter(name=x.name, valid="True").count() == x.tags.filter(type="sunlight").count()

    trueVideos = []
    
    for x in validVideos.keys():
        if validVideos[x] == True:
            trueVideos.append(x)
    
    videos = Video.objects.filter(name__in=trueVideos)

    context = {
        videos : "videos"
    }
    return render(request, "tagResult.html", context)
