from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from SolarSENSE.models import Video

def test(request):
    return HttpResponse('This is a test page')

def templateTest(request):
    mediaImage = Video.objects.get(name = "testMedia")
    video = Video.objects.get(name = "testVideo")
    context = {
        "video":video,
        "media":mediaImage
    }
    return render(request, "templateTest.html", context)


