from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from SolarSENSE.models import Video

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

    videos = Video.objects.filter(tags__type__exact="temperature", tags__min__lte=temp, tags__max__gte=temp).distinct() |
    Video.objects.filter(tags__type__exact="water", tags__min__lte=water, tags__max__gte=water).distinct() |
    Video.objects.filter(tags__type__exact="phosphate", tags__min__lte=phosphate, tags__max__gte=phosphate).distinct() |
    Video.objects.filter(tags__type__exact="sunlight", tags__min__lte=sunlight, tags__max__gte=sunlight).distinct()
    context = {
        videos : "videos"
    }
    return render(request, "tagResult.html", context)
