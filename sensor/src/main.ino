#include <jsonrpccpp/client/connectors/httpclient.h>
#include "gen/stubclient.h"

#include "corefunctionality.h"
//I don't know why, but any esp32 libraries included in corefunctionality.h need to be included here
#include <WiFi.h>
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
        HttpClient httpclient(http);
        StubClient jsonClient(httpclient, JSONRPC_CLIENT_V2);
        Json::Value testArr;
        Json::Value testRetArr;

        //put sample data into testArr
        testArr[0] = 3.1;
        testArr[1] = 4.2;
        testArr[2] = 5.3;
        testArr[3] = 6.4;
        testArr[4] = 7.5;

        try {
            testRetArr = jsonClient.sendTemperatureData(testArr);
            if(testArr == testRetArr) {
                Serial.println("Success!");
            } else {
                Serial.println("Failure :(");
            }
        } catch(JsonRpcException &e) {
            Serial.print("Error: ");
            Serial.println(e.what());
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
