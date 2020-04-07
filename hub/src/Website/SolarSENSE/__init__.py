from rpc4django import rpcmethod

@rpcmethod(name='ping', signature=[])
def ping():
    return "pong"

@rpcmethod(name='setTemp', signature=['array'])
def setTemp(request, inputArr):
    from .models import SensorCollections

    if len(inputArr) == 4:
        SensorCollections.objects.create(moisture=inputArr[0], temperature=inputArr[1], sunlight=inputArr[2], phosphate=inputArr[3])
        return True
    else:
        return False
