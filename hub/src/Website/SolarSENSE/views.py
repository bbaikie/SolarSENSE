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
    return render(request, "templateTest.html", context)

def showTags(request):
    temperature = request.GET['temperature']
    water = request.GET['water']
    phosphate = request.GET['phosphate']
    sunlight = request.GET['sunlight']

    

    context = {
    }
    return HttpResponse("This will show the tags")
