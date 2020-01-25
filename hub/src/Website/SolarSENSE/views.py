from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import SensorData

def test(request):
    return HttpResponse('This is a test page')

def templateTest(request):
    data = SensorData.objects.all()
    context = {
        'sensorData':data,
    }
    template = loader.get_template('templateTest.html')
    return HttpResponse(template.render(context, request))


def storeSensorData(request):
    data = SensorData(temperature=request['temperature'], water=request['water'], phosphate=request['phosphate'],
     sunshine=request['sunshine'])
    data.save()
    return HttpResponseRedirect(reverse('SolarSENSE:templateTest'))