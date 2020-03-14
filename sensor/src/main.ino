//#include <jsonrpccpp/client/connectors/httpclient.h>
#include "corefunctionality.h"
//I don't know why, but any esp32 libraries included in corefunctionality.h need to be included here
#include <WiFi.h>
#include <Preferences.h>

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
    connectToWifi("Wifi name", "wifi password");

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
