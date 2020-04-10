/*******************************************************************************
 * main.ino
 *
 * SolarSENSE
 * Fall 2019 - Spring 2020
 * Written by: Jeremiah Miller and Joshua Paragoso
 * Modified by:
 *
 * This file runs the main program for the SolarSENSE sensor hardware. It turns
 * on, collects all data, connects to the hub wifi, sends all the data if it
 * can, and then goes back into deep sleep until it wakes up again and does
 * the same thing
 * 
 * NOTE: Feel free to reach out with questions to Jeremiah at jpm@hiya.ca
 */

#include "corefunctionality.h"
#include <WiFi.h>

#define TIME_TO_SLEEP  3600 // Time ESP32 will go to sleep (in seconds)

static const char* ssid = "NameOfNetwork";
static const char* password = "AardvarkBadgerHedgehog";

void setup() {
    //Serial output is disabled for release, but it can be enabled for debugging
    //Serial.begin(115200);
    delay(1000);
    initialize();

    //Collect data
    sampleAndStoreTemperature();
    sampleAndStoreMoisture();
    sampleAndStorePhosphate();
    sampleAndStoreSunlight();
    incrementCount();

    connectToWifi(ssid, password);

    if (WiFi.isConnected()) {
        //Serial.println("Connected to wifi");
        sendAllData();
    } else {
        //Serial.println("Not connected to wifi");
    }

    //Go into low power mode for amount of time
    activateLowPowerMode(TIME_TO_SLEEP);
}

//This function will not be called, since the sensor just wakes up, does it's
//stuff, and goes back to deep sleep
void loop() {
}
