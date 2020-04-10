/*******************************************************************************
 * corefunctionality.h
 *
 * SolarSENSE
 * Fall 2019 - Spring 2020
 * Written by: Jeremiah Miller and Joshua Paragoso
 * Modified by:
 *
 * This file defines which functions can be called from main on the SolarSENSE
 * sensor hardware.
 *
 * NOTE: Feel free to reach out with questions to Jeremiah at jpm@hiya.ca
 */

void initialize(); //Run any initialization
void sampleAndStoreMoisture(); //Get moisture data
void sampleAndStoreTemperature(); //Get temperature data
void sampleAndStoreSunlight(); //Get sunlight data
void sampleAndStorePhosphate(); //Get phosphate data
void incrementCount(); //Increment the count after all data has been collected
//Connect to a wifi network
void connectToWifi(const char* ssid, const char* password);
void sendAllData(); //send all the data that's been stored so far
//Activate deep sleep on the sensor for a certain amount of seconds
void activateLowPowerMode(int sleepSeconds);
