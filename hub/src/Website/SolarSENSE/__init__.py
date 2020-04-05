from rpc4django import rpcmethod

@rpcmethod(name='ping', signature=[])
def ping():
    return "pong"

@rpcmethod(name='setTemp', signature=['array'])
def setTemp(request, list):
    from .models import Video
    return list
