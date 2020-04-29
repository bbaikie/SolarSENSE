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
/*******************************************************************************
 * corefunctionality.cpp
 *
 * SolarSENSE
 * Fall 2019 - Spring 2020
 * Written by: Jeremiah Miller and Joshua Paragoso
 * Modified by:
 *
 * This file contains the implementation of all the custom functions the sensor
 * needs
 *
 * NOTE: Feel free to reach out with questions to Jeremiah at jpm@hiya.ca
 */

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <Preferences.h>

Preferences prefs;
HTTPClient httpclient;

#define DATAPOINT_COUNT_LIMIT 48

#define MOISTURE "mois"
#define TEMPERATURE "temp"
#define SUNLIGHT "sun"
//Phosphate uses same data as moisture, just a different algorithm
#define PHOSPHATE MOISTURE

//TODO confirm that these are the correct pins to read from
#define MOISTURE_PIN 26
#define TEMPERATURE_PIN 25
#define SUNLIGHT_PIN 34
//Phosphate uses same data as moisture, just a different algorithm
#define PHOSPHATE_PIN MOISTURE_PIN

#define NUM_SAMPLES 5

//TODO THIS NEEDS TO BE UPDATED BASED ON CALIBRATION WITH MOISTURE DATA
//These are just copied from the link below, they should not be used in the
//end product but based on calibration
//https://wiki.dfrobot.com/Capacitive_Soil_Moisture_Sensor_SKU_SEN0193#target_0
#define MOISTURE_DRY 520
#define MOISTURE_WET 260

//TODO THIS MAY BE INCORRECT WITH THE FINAL HARDWARE DESIGN
//See this source and check out how they found the value that should be here.
//They call it SERIESRESISTOR
//https://learn.adafruit.com/thermistor/using-a-thermistor
#define TEMPERATURE_OTHER_RESISTOR 10000
// resistance at 25 degrees C
#define THERMISTOR_NOMINAL 10000
// The beta coefficient of the thermistor (usually 3000-4000)
#define BCOEFFICIENT 3950
// temp. for nominal resistance (almost always 25 C)
#define TEMPERATURE_NOMINAL 25


//Conversion factor for micro seconds to seconds
#define uS_TO_S_FACTOR 1000000ULL

//for types of data: moisture, temperature, sunlight, phosphate
#define DATATYPE_COUNT 4

#define HOST "http://192.168.4.1/RPC2"
static unsigned char sendCount = 0;
static unsigned char storeCount = 0;

/*******************************************************************************
 * turnOffWiFi()
 *
 * This code disconnects from wifi and then turns off wifi functionality
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *   Turns off the wifi hardware
 *
 * NOTE:
 */
static void turnOffWiFi() { 
    //disconnect from wifi
    WiFi.disconnect(true, false);
}

/*******************************************************************************
 * storeData(const char* name, uint16_t data)
 *
 * This function stores the data it receives in the Preferences library of the
 * ESP32
 *
 * arguments:
 *   name - the name of the datatype received. Should use the #defined names at
 *          the top to pass this in
 *   data - the 16 bits of data to store
 *
 * returns:
 *
 * changes:
 *   Stores the data in the eeprom using the preferences library
 *
 * NOTE: Used the eeprom library so we'd get wear leveling automatically
 */
static void storeData(const char* name, uint16_t data) {
    uint16_t latest_data = data;

    //Make sure counts are correct
    prefs.begin("counts", true);
    sendCount = prefs.getUChar("send", sendCount);
    storeCount = prefs.getUChar("store", storeCount);
    prefs.end();

    //open up datapoint's namespace in rw mode
    prefs.begin(name, false);

    //if data is already stored, need to average it with new data
    if(prefs.getUShort(String(storeCount).c_str())) {
        latest_data += prefs.getUShort(String(storeCount).c_str());
        latest_data /= 2;
    }

    //Put latest piece of data
    prefs.putUShort(String(storeCount).c_str(), latest_data);

    //close datapoint namespace
    prefs.end();
}

/*******************************************************************************
 * getDataAsArrayString()
 *
 * This function gets the current array of data in the form of a string to send
 * with jsonrpc. It also converts all data from the raw value before adding it
 * to the string
 *
 * arguments:
 *
 * returns:
 *   array of data to be sent
 *
 * changes:
 *
 * NOTE: Data is stored as a raw value from the ADC. We have to convert it here
 * before sending it to the hub
 */
static String getDataAsArrayString() {
    //Make sure counts are correct
    prefs.begin("counts", true);
    sendCount = prefs.getUChar("send", sendCount);
    storeCount = prefs.getUChar("store", storeCount);
    prefs.end();
    if(sendCount == storeCount) {
        return "";
    }

    //output should be formatted like this: "\"3.1\", \"4.2\", \"5.3\", \"6.4\""
    String data = "";
    String name;
    unsigned short tempData;
    float final_data;

    for(int i = 0; i < DATATYPE_COUNT; i++) {
        //Order must be moisture, temperature, sunlight, phosphate
        if(i == 0) {
            name = MOISTURE;
        } else if(i == 1) {
            name = TEMPERATURE;
        } else if(i == 2) {
            name = SUNLIGHT;
        } else {
            name = PHOSPHATE;
        }
        data += "\"";

        //open up datapoint's namespace in read only mode
        prefs.begin(name.c_str(), true);

        tempData = prefs.getUShort(String(sendCount).c_str());

        prefs.end();

        //TODO Convert to double according to datatype
        if(i == 0) {
            //Moisture
            /*TODO need to get calibration data before being able to get a
             * percentage, see following link*/
            //https://wiki.dfrobot.com/Capacitive_Soil_Moisture_Sensor_SKU_SEN0193#target_0
            /*
             * calculation to convert from raw value to percentage are just
             * guesstimates based on data from the above link and are likely not
             * accurate. More research is needed
             */
            tempData -= MOISTURE_WET;
            //Get percent dry
            final_data = tempData / (MOISTURE_DRY - MOISTURE_WET);
            //Invert to get percent wet
            final_data = 1 - final_data;
        } else if(i == 1) {
            //Temperature
            //calculations from here:
            //https://learn.adafruit.com/thermistor/using-a-thermistor
            //Converts temperature to degrees celcius
            final_data = 1023 / tempData - 1;
            final_data = TEMPERATURE_OTHER_RESISTOR / final_data;

            final_data = final_data / THERMISTOR_NOMINAL;
            final_data = log(final_data);
            final_data /= BCOEFFICIENT;
            final_data += 1.0 / (TEMPERATURE_NOMINAL + 273.15);
            final_data = 1.0 / final_data;
            final_data -= 273.15;
        } else if(i == 2) {
            //Sunlight
            //TODO Find out how to calculate this data
            final_data = tempData;
        } else {
            //Phosphate
            //TODO Find out how to calculate this data
            final_data = tempData;
        }
        data += String(final_data).c_str();

        //add comma and space after all elements except the last one
        if(i < (DATATYPE_COUNT-1)) {
            data += ", ";
        }
        data+= "\"";
    }

    return data;
}

/*******************************************************************************
 * sendJsonRPCRequest()
 *
 * This code sends one jsonRPC request. Due to issues with the jsonrpc library,
 * we're creating a jsonrpc string manually and parsing the response to confirm
 * it worked correctly. This is probably not ideal, but it seems to work for now
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *
 * NOTE:
 */
static void sendJsonRPCRequest() {
    String data = getDataAsArrayString();

    //no data to be sent
    if(data == "") {
        return;
    }

    String name;

    //Examples used as reference: https://www.jsonrpc.org/specification
    String testjsonrpccall =
        "{\"jsonrpc\": \"2.0\", \"method\": \"setSensorData\", \"params\": [["
        + data
        + "]], \"id\": 1}";
    //Serial.println("Sending following http request to " + HOST);
    //Serial.println(testjsonrpccall);

    httpclient.begin(HOST);
    int httpcode = httpclient.POST(testjsonrpccall);
    if (httpcode > 0) {
        //Serial.println("httpcode is > 0. payload:");
        String payload = httpclient.getString();
        //Serial.println(payload);
        if(httpcode == HTTP_CODE_OK) {
            //Serial.println("end payload. httpcode is OK");

            if(payload.indexOf("\"result\": true") != -1) {
                //Serial.println("Hub received data successfully!");
                //Remove sent data
                for(int i = 0; i < DATATYPE_COUNT; i++) {
                    if(i == 0) {
                        name = MOISTURE;
                    } else if(i == 1) {
                        name = TEMPERATURE;
                    } else if(i == 2) {
                        name = SUNLIGHT;
                    } else {
                        name = PHOSPHATE;
                    }

                    //open up datapoint's namespace in read/write mode
                    prefs.begin(name.c_str(), true);

                    prefs.remove(String(sendCount).c_str());
                    prefs.end();
                }
                //Increment sendCount
                sendCount++;
                sendCount %= DATAPOINT_COUNT_LIMIT;
                prefs.begin("counts", false);
                prefs.putUChar("send", sendCount);
                prefs.end();
            } else {
                //Serial.println("Hub didn't receive data successfully");
            }
        } else {
            //Serial.println("end payload. httpcode is not OK");
        }

    } else {
        //Serial.println("POST failed. Error:");
        //Serial.println(httpclient.errorToString(httpcode).c_str());
    }

    httpclient.end();
}

/*******************************************************************************
 * initialize()
 *
 * This code runs any initialization the sensor hardware needs. Currently it
 * just makes sure the counts are correct
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *
 * NOTE:
 */
void initialize() {
    //Make sure counts are correct
    prefs.begin("counts", true);
    sendCount = prefs.getUChar("send", sendCount);
    storeCount = prefs.getUChar("store", storeCount);
    prefs.end();
}

/*******************************************************************************
 * sampleAndStoreMoisture()
 *
 * This function samples the moisture levels and stores it in the eeprom in case
 * the sensor loses power
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *   activates adc to read from the sensors, stores data in the eeprom
 *
 * NOTE:
 */
void sampleAndStoreMoisture(){
    uint16_t average = analogRead(MOISTURE_PIN);

    //take multiple samples and average them for a more accurate reading
    //Subtract 1 from limit since we already read once
    for (int i = 0; i < (NUM_SAMPLES - 1); i++) {
        average += analogRead(MOISTURE_PIN);
        average /= 2;
        delay(10);
    }
    //Serial.println(average);

    storeData(MOISTURE, average);
}

/*******************************************************************************
 * sampleAndStoreTemperature()
 *
 * This function samples the temperature and stores it in the eeprom in case the
 * sensor loses power
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *   activates adc to read from the sensors, stores data in the eeprom
 *
 * NOTE:
 */
void sampleAndStoreTemperature(){
    //https://learn.adafruit.com/thermistor/using-a-thermistor
    uint16_t average = analogRead(TEMPERATURE_PIN);

    //take multiple samples and average them for a more accurate reading
    //Subtract 1 from limit since we already read once
    for (int i = 0; i < (NUM_SAMPLES - 1); i++) {
        average += analogRead(TEMPERATURE_PIN);
        average /= 2;
        delay(10);
    }

    //Serial.println(average);

    storeData(TEMPERATURE, average);
}

/*******************************************************************************
 * sampleAndStoreSunlight()
 *
 * This function samples the sunlight levels and stores it in the eeprom in case
 * the sensor loses power
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *   activates adc to read from the sensors, stores data in the eeprom
 *
 * NOTE:
 */
void sampleAndStoreSunlight(){
    uint16_t average = analogRead(SUNLIGHT_PIN);

    //take multiple samples and average them for a more accurate reading
    //Subtract 1 from limit since we already read once
    for (int i = 0; i < (NUM_SAMPLES - 1); i++) {
        average += analogRead(SUNLIGHT_PIN);
        average /= 2;
        delay(10);
    }
    //Serial.println(average);

    storeData(SUNLIGHT, average);
}

/*******************************************************************************
 * sampleAndStorePhosphate()
 *
 * This function samples the phosphate levels and stores it in the eeprom in
 * case the sensor loses power
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *   activates adc to read from the sensors, stores data in the eeprom
 *
 * NOTE: Made obsolete by the fact that the ph can be calculated from the
 *       moisture sensor data
 */
/*
void sampleAndStorePhosphate(){
    uint16_t average = analogRead(PHOSPHATE_PIN);

    //take multiple samples and average them for a more accurate reading
    //Subtract 1 from limit since we already read once
    for (int i = 0; i < (NUM_SAMPLES - 1); i++) {
        average += analogRead(PHOSPHATE_PIN);
        average /= 2;
        delay(10);
    }
    //Serial.println(average);

    storeData(PHOSPHATE, average);
}
*/

/*******************************************************************************
 * incrementCount()
 *
 * This code increments the count used to determine where data should be stored
 * in the eeprom, and should only be run once all the sensors have stored their
 * data for the previous count
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *   the count in the eeprom used to store the sensor data in the correct spot
 *
 * NOTE:
 */
void incrementCount() {
    prefs.begin("counts", false);
    sendCount = prefs.getUChar("send", sendCount);
    storeCount = prefs.getUChar("store", storeCount);

    if(storeCount == (sendCount - 1) || (sendCount == 0 && storeCount == DATAPOINT_COUNT_LIMIT)) {
        sendCount++;
        sendCount %= DATAPOINT_COUNT_LIMIT;
        prefs.putUChar("send", sendCount);
    }

    storeCount++;
    storeCount %= DATAPOINT_COUNT_LIMIT;

    prefs.putUChar("store", sendCount);
    prefs.end();
}

/*******************************************************************************
 * connectToWifi()
 *
 * This code connects to a specified wifi network
 *
 * arguments:
 *   ssid - the wifi network name
 *   password - the wifi network password
 *
 * returns:
 *
 * changes:
 *   turns on wifi hardware and connects to the network
 *
 * NOTE: currently it waits for 10 seconds before timing out, but that can be
 *   changed. Also, assumes the wifi network has a password. I'm not sure what
 *   the best way to connect to a network without a password would be, but the
 *   source code for the ESP32 wifi libraries can be found here if you need to
 *   do that: https://github.com/espressif/arduino-esp32/tree/master/libraries
 */
void connectToWifi(const char* ssid, const char* password) {
    //connect to a WiFi network
    WiFi.begin(ssid, password);

    //Wait for a connection for 10 minutes, or 600 seconds
    for(int i = 0; i < 600 && WiFi.status() != WL_CONNECTED; i++) {
        //delay one second
        delay(1000);
    }
}

/*******************************************************************************
 * sendAllData()
 *
 * This function loops through and sends all the data it's collected to the hub
 *
 * arguments:
 *
 * returns:
 *
 * changes:
 *   The sendJsonRPCRequest function will delete data from the eeprom if it was
 *   received by the hub successfully
 *
 * NOTE:
 */
void sendAllData() {
    //Make sure counts are correct
    prefs.begin("counts", true);
    sendCount = prefs.getUChar("send", sendCount);
    storeCount = prefs.getUChar("store", storeCount);
    prefs.end();

    //Ensure this will only loop a finite number of times
    int loopCount = 0;

    //Find the number of loops it will take to get from the sendCount to the
    // storeCount
    if(storeCount > sendCount) {
        loopCount = storeCount - sendCount;
    } else if(sendCount > storeCount) {
        loopCount = (DATAPOINT_COUNT_LIMIT - sendCount) + storeCount;
    }

    if(loopCount > DATAPOINT_COUNT_LIMIT) {
        loopCount = DATAPOINT_COUNT_LIMIT;
    }

    for(int i = 0; i < loopCount; i++) {
        sendJsonRPCRequest();
    }
}

/*******************************************************************************
 * activateLowPowerMode(int sleepSeconds)
 *
 * This function will put the sensor into deep sleep for a certain number of
 * seconds
 *
 * arguments:
 *   sleepSeconds - the number of seconds to put the sensor into deep sleep for
 *
 * returns:
 *
 * changes:
 *   puts the sensor into deep sleep
 *
 * NOTE: it's also possible to configure other methods to wake the sensor, if
 *   those are desired in the future you can find examples of it here:
 *   https://github.com/espressif/arduino-esp32/tree/master/libraries/ESP32/examples/DeepSleep
 */
void activateLowPowerMode(int sleepSeconds){
    turnOffWiFi();

    //configure esp to wake from deep sleep after specified time
    esp_sleep_enable_timer_wakeup(sleepSeconds * uS_TO_S_FACTOR);

    //Start deep sleep
    Serial.flush();
    esp_deep_sleep_start();
}
