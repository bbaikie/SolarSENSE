from jsonrpcserver import method, serve
# This is used to start an instance of a server

# Might need to include a method or someway to store the data
# into a list or database to use later
def main():

# List of methods to grab all 4 points of data
@jsonrpc_method('myapp.setData')
def storeTemp(request, temperature):
    #database.add(temperature)
    return temperature

@jsonrpc_method('myapp.setData')
def storeMoisture(request, moisture):
    #database.add(moisture)
    return moisture

@jsonrpc_method('myapp.setData')
def storePhosphorus(request, phosphorus):
    #database.add(phosphorus)
    return phosphorus

@jsonrpc_method('myapp.setData')
def storeSunlight(request, sunlight):
    #database.add(sunlight)
    return sunlight

@method
def storeSunlight(sunlight):
    return bool

# Starts instance of server
if __name__ == "__main__":
    serve()