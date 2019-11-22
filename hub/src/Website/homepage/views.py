from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
# Create your views here.
#function calling the home.html to get rendered
def homePage(request):
    context = {}
    template = loader.get_template('homepage/home.html')
    return HttpResponse(template.render(context, request))