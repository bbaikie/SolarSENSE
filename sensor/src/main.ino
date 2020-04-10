/*
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
*/
//#include <jsonrpccpp/client/connectors/httpclient.h>
#include "corefunctionality.h"
//I don't know why, but any esp32 libraries included in corefunctionality.h need to be included here
#include <WiFi.h>
#include <Preferences.h>

const char* ssid "NameOfNetwork"
const char* password "AardvarkBadgerHedgehog"

void setup() {
    Serial.begin(115200);
    delay(1000);
    //TODO figure out what setup stuff we need to do
}

void loop() {
    //sending four list to perspective sampel and store functions
    sampleAndStoreTemperature();
    sampleAndStoreMoisture();
    sampleAndStorePhosphate();
    sampleAndStoreSunlight();

    //TODO put in correct wifi info
    connectToWifi(ssid, password);

    if (WiFi.status() == WL_CONNECTED) {
        //connected to wifi
        //TODO get jsonrpc stuff set up
        //HttpClient httpclient(WiFi.localIP());

        //TODO these functions may need no have jsonrpc stuff passed to them so they can transmit properly
        transmitStoredTemperature();
        transmitStoredMoisture();
        transmitStoredPhosphate();
        transmitStoredSunlight();
    }

    //Go into low power mode for 6 minutes
    //TODO find better low power mode time
    activateLowPowerMode(600);
}
