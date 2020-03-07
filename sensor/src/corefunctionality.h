#include "Arduino.h"
#include <WiFi.h>
/**
 * corefunctionality.h
 *
 * This file contains the main functions we'll be using to control the esp32
 * sensor processor boards.
 */

/**
 * activateLowPowerMode(int sleepSeconds)
 *
 * This function will activate a low power mode for a certain number of seconds
 *
 * arguments:
 *   sleepSeconds - the number of seconds to be in the low power mode
 *
 * returns:
 *
 * hardware changes:
 *   The ESP32 board will be in a low power state, so it won't be able to do
 *   anything for the entire time it's in a low power mode.
 */
void activateLowPowerMode(int sleepSeconds);

/**
 * sampleAndStoreTemperature()
 *
 * This function samples the temperature and stores it with the rest of the
 * collected temperature values.
 */
void sampleAndStoreTemperature();

/**
 * sampleAndStoreMoisture()
 *
 * This function samples the moisture and stores it with the rest of the
 * collected temperature values.
 */
void sampleAndStoreMoisture();

/**
 * sampleAndStorePhosphate()
 *
 * This function samples the phosphate and stores it with the rest of the
 * collected temperature values.
 */
void sampleAndStorePhosphate();

/**
 * sampleAndStoreSunlight()
 *
 * This function samples the sunlight and stores it with the rest of the
 * collected temperature values.
 */
void sampleAndStoreSunlight();

/**
 * transmitStoredTemperature()
 *
 * This function attempts to transmit all the temperature data points that it
 * has stored to the hub
 */
void transmitStoredTemperature();

/**
 * transmitStoredMoisture()
 *
 * This function attempts to transmit all the moisture data points that it
 * has stored to the hub
 */
void transmitStoredMoisture();

/**
 * transmitStoredPhosphate()
 *
 * This function attempts to transmit all the phosphate data points that it
 * has stored to the hub
 */
void transmitStoredPhosphate();

/**
 * transmitStoredSunlight()
 *
 * This function attempts to transmit all the sunlight data points that it
 * has stored to the hub
 */
void transmitStoredSunlight();

void turnOffWiFi();

void turnOnWifi();

void connectToWifi(const char* ssid, const char* password);
