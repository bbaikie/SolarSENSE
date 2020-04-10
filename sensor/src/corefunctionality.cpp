#include "corefunctionality.h"

Preferences prefs;
HTTPClient httpclient;

#define DATAPOINT_COUNT_LIMIT 24

#define MOISTURE "mois"
#define TEMPERATURE "temp"
#define SUNLIGHT "sun"
#define PHOSPHATE "ph"

//TODO confirm that these are the correct pins to read from
#define MOISTURE_PIN 26
#define TEMPERATURE_PIN 25
#define SUNLIGHT_PIN 27
#define PHOSPHATE_PIN 26

#define NUM_SAMPLES 5

//TODO THIS NEEDS TO BE UPDATED BASED ON CALIBRATION WITH MOISTURE DATA
//These are just copied from the link below, they should not be used in the end product but based on calibration
//https://wiki.dfrobot.com/Capacitive_Soil_Moisture_Sensor_SKU_SEN0193#target_0
#define MOISTURE_DRY 520
#define MOISTURE_WET 260

//TODO THIS MAY BE INCORRECT WITH THE FINAL HARDWARE DESIGN
//See this source and check out how they found the value that should be here. They call it SERIESRESISTOR
//https://learn.adafruit.com/thermistor/using-a-thermistor
#define TEMPERATURE_OTHER_RESISTOR 10000
// resistance at 25 degrees C
#define THERMISTOR_NOMINAL 10000
// The beta coefficient of the thermistor (usually 3000-4000)
#define BCOEFFICIENT 3950
// temp. for nominal resistance (almost always 25 C)
#define TEMPERATURE_NOMINAL 25


#define uS_TO_S_FACTOR 1000000ULL  /* Conversion factor for micro seconds to seconds */

//for types of data: moisture, temperature, sunlight, phosphate
#define DATATYPE_COUNT 4

static const String host = "http://192.168.4.1/RPC2";
static unsigned char sendCount = 0;
static unsigned char storeCount = 0;

void activateLowPowerMode(int sleepSeconds){
    turnOffWiFi();

    //configure esp to wake from deep sleep after specified time
    esp_sleep_enable_timer_wakeup(sleepSeconds * uS_TO_S_FACTOR);

    //Start deep sleep
    //https://github.com/espressif/arduino-esp32/blob/master/libraries/ESP32/examples/DeepSleep/TimerWakeUp/TimerWakeUp.ino
    Serial.flush();
    esp_deep_sleep_start();
}

void initialize(const char* ssid, const char* password) {
    //Make sure counts are correct
    prefs.begin("counts", true);
    sendCount = prefs.getUChar("send", sendCount);
    storeCount = prefs.getUChar("store", storeCount);
    prefs.end();

    connectToWifi(ssid, password);
}

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

void storeData(const char* name, uint16_t data) {
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

void turnOffWiFi() { 
    //disconnect from wifi
    WiFi.disconnect(true, false);
}

void connectToWifi(const char* ssid, const char* password) {
    //connect to a WiFi network
    WiFi.begin(ssid, password);

    //Wait for a connection for 10 minutes, or 600 seconds
    for(int i = 0; i < 600 && WiFi.status() != WL_CONNECTED; i++) {
        //delay one second
        delay(1000);
    }
}

String getDataAsArrayString() {
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
            //TODO need to get calibration data before being able to get a percentage, see following link
            //https://wiki.dfrobot.com/Capacitive_Soil_Moisture_Sensor_SKU_SEN0193#target_0
            //Also, calculation to convert from raw value to percentage are just guesstimates based on data from the above link and are likely not accurate. More research is needed
            tempData -= MOISTURE_WET;
            //Get percent dry
            final_data = tempData / (MOISTURE_DRY - MOISTURE_WET);
            //Invert to get percent wet
            final_data = 1 - final_data;
        } else if(i == 1) {
            //Temperature
            //https://learn.adafruit.com/thermistor/using-a-thermistor calculations from here
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

void sendAllData() {
    //Make sure counts are correct
    prefs.begin("counts", true);
    sendCount = prefs.getUChar("send", sendCount);
    storeCount = prefs.getUChar("store", storeCount);
    prefs.end();

    //Ensure this will only loop a finite number of times
    int loopCount = 0;

    //Find the number of loops it will take to get the sendCount to the storeCount
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

void sendJsonRPCRequest() {
    String data = getDataAsArrayString();

    //no data to be sent
    if(data == "") {
        return;
    }

    String name;

    //Examples used as reference: https://www.jsonrpc.org/specification
    String testjsonrpccall = "{\"jsonrpc\": \"2.0\", \"method\": \"setSensorData\", \"params\": [[" + data + "]], \"id\": 1}";
    //Serial.println("Sending following http request to " + host);
    //Serial.println(testjsonrpccall);

    httpclient.begin(host);
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
