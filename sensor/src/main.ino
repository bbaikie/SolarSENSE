//#include "corefunctionality.h"
//I don't know why, but any esp32 libraries included in corefunctionality.h need to be included here
#include <WiFi.h>
#include <HTTPClient.h>
#include <Preferences.h>

using namespace jsonrpc;

const char* ssid "NameOfNetwork"
const char* password "AardvarkBadgerHedgehog"

void setup() {
    Serial.begin(115200);
    delay(1000);
    //TODO remove this connectToWifi
    connectToWifi(ssid, password);
    //TODO figure out what setup stuff we need to do
}

void loop() {
    //sending four list to perspective sampel and store functions
    /*
    sampleAndStoreTemperature();
    sampleAndStoreMoisture();
    sampleAndStorePhosphate();
    sampleAndStoreSunlight();
    */

    //TODO put in correct wifi info
    //connectToWifi(ssid, password);

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Connected to wifi");
        //connected to wifi
        String http = WiFi.localIP() + ":8080/json/";
        HTTPClient httpclient(http);

        //Examples used as reference: https://www.jsonrpc.org/specification
        String testjsonrpccall = "{\"jsonrpc\": \"2.0\", \"method\": \"sendTemperatureData\", \"params\": [3.1, 4.2, 5.3, 6.4, 7.5], \"id\": 1}";

        int httpcode = http.GET();

        if (httpcode > 0) {
            if(httpCode == HTTP_CODE_OK) {
                String payload = http.getString();
                Serial.println(payload);
            }
        } else {
            Serial.println("Error");
        }

        //TODO these functions may need no have jsonrpc stuff passed to them so they can transmit properly
        /*
        transmitStoredTemperature();
        transmitStoredMoisture();
        transmitStoredPhosphate();
        transmitStoredSunlight();
        */
    } else {
        Serial.println("Not connected to wifi");
    }

    //Go into low power mode for 6 minutes
    //TODO find better low power mode time
    //activateLowPowerMode(600);
    delay(10000);
}
