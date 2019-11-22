from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def test(request):
    return HttpResponse('This is a test page')

def templateTest(request):
    context = {}
    template = loader.get_template('testpage/templateTest.html')
    return HttpResponse(template.render(context, request))
