from rpc4django import rpcmethod

@rpcmethod(name='ping', signature=[])
def ping():
    return "pong"

@rpcmethod(name='setTemp', signature=['array'])
def setTemp(request, inputArr):
    from .models import SensorCollections
    request.session['temperature'] = inputArr

    if 'phosphate' in request.session and 'sunlight' in request.session and 'moisture' in request.session:
        phosphate = request.session['phosphate']
        sunlight = request.session['sunlight']
        moisture = request.session['moisture']
        temperature = request.session['temperature']

        size = len(phosphate)

        if size == len(sunlight) and size == len(moisture) and size == len(temperature):
            for x in range(size):
                SensorCollections.objects.create(moisture=moisture[x], temperature=temperature[x], sunlight=sunlight[x], phosphate=phosphate[x])
            
            del request.session['phosphate']
            del request.session['sunlight']
            del request.session['moisture']
            del request.session['temperature']
        else:
            raise Exception("Number of values in response mismatched")
