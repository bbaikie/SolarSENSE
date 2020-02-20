#include <jsonrpccpp/client/connectors/httpclient.h>
#include "corefunctionality.h"

void setup() {
    //TODO make sure there's no set up stuff we need to do
}

void loop() {
    sampleAndStoreTemperature();
    sampleAndStoreMoisture();
    sampleAndStorePhosphate();
    sampleAndStoreSunlight();

    //TODO put in correct wifi info
    connectToWifi("Wifi name", "wifi password");

    if (WiFi.status() == WL_CONNECTED) {
        //connected to wifi
        //TODO get jsonrpc stuff set up
        HttpClient httpclient(WiFi.localIP());

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
