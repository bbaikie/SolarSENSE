from rpc4django import rpcmethod

@rpcmethod(name='ping', signature=[])
def ping():
    return "pong"
