"""
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
"""
from jsonrpcserver import method, serve
from django.db import models
# This is used to start an instance of a server

# Might need to include a method or someway to store the data
# into a list or database to use later
def main():

class Data(models.Model):
	temperature_readings = models.DoubleField(default=0.0)
	

# List of methods to grab all 4 points of data
@jsonrpc_method('main.sendTemperatureData')
def storeTemp(request, temperature):
    #for x in (temperature.JSONArray.length)
    	#data = new 		#Data(temperature_readings=(temperature.JSONArray(x)))
    #data.save()
    return temperature

	#How to loop through and save as different data objects? or do 
	#we want to do that?

"""
@jsonrpc_method('main.sendMoistureData')
def storeMoisture(request, moisture):
    #database.add(moisture)
    return moisture

@jsonrpc_method('main.sendPhosphorusData')
def storePhosphorus(request, phosphorus):
    #database.add(phosphorus)
    return phosphorus

@jsonrpc_method('myapp.sendSunlightData')
def storeSunlight(request, sunlight):
    #database.add(sunlight)
    return sunlight

#@method
#def storeSunlight(sunlight):
    #return bool
"""

# Starts instance of server
if __name__ == "__main__":
    serve()
