#include "corefunctionality.h"
//I don't know why, but any esp32 libraries included in corefunctionality.h need to be included here
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <Preferences.h>

const char* ssid = "NameOfNetwork";
const char* password = "AardvarkBadgerHedgehog";

void setup() {
    //TODO REMOVE all SERIAL STUFF
    Serial.begin(115200);
    delay(1000);
    initialize(ssid, password);
}

void loop() {
    sampleAndStoreTemperature();
    sampleAndStoreMoisture();
    sampleAndStorePhosphate();
    sampleAndStoreSunlight();
    incrementCount();

    connectToWifi(ssid, password);

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Connected to wifi");

        sendAllData();
    } else {
        Serial.println("Not connected to wifi");
    }

    //Go into low power mode for 6 minutes
    //TODO find better low power mode time
    //activateLowPowerMode(600);
    delay(10000);
}
