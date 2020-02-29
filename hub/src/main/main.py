from jsonrpcserver import method, serve
# This is used to start an instance of a server

# Might need to include a method or someway to store the data
# into a list or database to use later
def main():

# List of methods to grab all 4 points of data
@method
def storeTemp(temp):
    return bool

@method
def storeMoisture(moisture):
    return bool

@method
def storePhosphorus(phosphorus):
    return bool

@method
def storeSunlight(sunlight):
    return bool

# Starts instance of server
if __name__ == "__main__":
    serve()