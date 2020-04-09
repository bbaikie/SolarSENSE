#include "corefunctionality.h"
//I don't know why, but any esp32 libraries included in corefunctionality.h need to be included here
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <Preferences.h>

#define TIME_TO_SLEEP  3600        /* Time ESP32 will go to sleep (in seconds) */

const char* ssid = "NameOfNetwork";
const char* password = "AardvarkBadgerHedgehog";

void setup() {
    //TODO REMOVE all SERIAL STUFF
    Serial.begin(115200);
    delay(1000);
    initialize(ssid, password);

    sampleAndStoreTemperature();
    sampleAndStoreMoisture();
    sampleAndStorePhosphate();
    sampleAndStoreSunlight();
    incrementCount();

    connectToWifi(ssid, password);

    if (WiFi.isConnected()) {
        Serial.println("Connected to wifi");
        sendAllData();
    } else {
        Serial.println("Not connected to wifi");
    }

    //Go into low power mode for amount of time
    activateLowPowerMode(TIME_TO_SLEEP);
}

//This function will not be called, since the sensor just wakes up, does it's stuff, and goes back to sleep
void loop() {
}
