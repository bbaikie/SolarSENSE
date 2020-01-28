from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def test(request):
    return HttpResponse('This is a test page')

def templateTest(request):
    video = Video.objects.get(id=1)
    context = {video}
    template = loader.get_template('templateTest.html')
    return HttpResponse(template.render(context, request))


