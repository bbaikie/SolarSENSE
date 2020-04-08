#include "corefunctionality.h"

Preferences prefs;
HTTPClient httpclient;

#define DATAPOINT_COUNT_LIMIT 20

//for types of data: moisture, temperature, sunlight, phosphate
#define DATATYPE_COUNT 4

static const String host = "http://192.168.4.1/RPC2";
static unsigned char sendCount = 0;
static unsigned char storeCount = 0;

void activateLowPowerMode(int sleepSeconds){
    //TODO fill in
    
    //turn off wifi (figure out how to call turnOffWiFi from turn_Off_WiFi.cpp)
    turnOffWiFi();

    //put sensor to sleep
    //TODO we should research if this is the best way to put the sensor to sleep
    sleep(sleepSeconds);
}

void initialize(const char* ssid, const char* password) {
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
    //pin A1 uses ADC2
    //Pin A1 is also gpio #25
    uint16_t adc_value = analogRead(25);
    Serial.println(adc_value);

    storeData("temp", adc_value);
}

void sampleAndStoreMoisture(){
    /* uses GPIO 26 and ADC #2*/

    /*this samples the  value from the sensor*/
    uint16_t adc_moist = analogRead(26);
    Serial.println(adc_moist);

    storeData("mois", adc_moist);
}

void sampleAndStorePhosphate(){
    
    uint16_t adc_phos = analogRead(26);
    Serial.println(adc_phos);

    storeData("phos", adc_phos);
        
}

void sampleAndStoreSunlight(){
    
    uint16_t adc_sun = analogRead(27);
    Serial.println(adc_sun);

    storeData("sun", adc_sun);
}

void turnOffWiFi() { 
    WiFi.mode(WIFI_OFF);
}

void turnOnWifi() {
    WiFi.enableSTA(true);
}

void connectToWifi(const char* ssid, const char* password) {
    turnOnWifi();
    // We start by connecting to a WiFi network
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
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

    for(int i = 0; i < DATATYPE_COUNT; i++) {
        //TODO Update to correct name Strings and correct order
        //Order must be moisture, temperature, sunlight, phosphate
        if(i == 0) {
            name = "mois";
        } else if(i == 1) {
            name = "temp";
        } else if(i == 2) {
            name = "sun";
        } else {
            name = "phos";
        }
        data += "\"";

        //open up datapoint's namespace in read only mode
        prefs.begin(name.c_str(), true);

        tempData = prefs.getUShort(String(sendCount).c_str());

        prefs.end();

        //TODO Convert to double according to datatype
        data += String(tempData).c_str();

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
    Serial.println("Sending following http request to " + host);
    Serial.println(testjsonrpccall);

    httpclient.begin(host);
    int httpcode = httpclient.POST(testjsonrpccall);
    if (httpcode > 0) {
        Serial.println("httpcode is > 0. payload:");
        String payload = httpclient.getString();
        Serial.println(payload);
        if(httpcode == HTTP_CODE_OK) {
            Serial.println("end payload. httpcode is OK");

            if(payload.indexOf("\"result\": true") != -1) {
                Serial.println("Hub received data successfully!");
                //Remove sent data
                for(int i = 0; i < DATATYPE_COUNT; i++) {
                    if(i == 0) {
                        name = "mois";
                    } else if(i == 1) {
                        name = "temp";
                    } else if(i == 2) {
                        name = "sun";
                    } else {
                        name = "phos";
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
                Serial.println("Hub didn't receive data successfully");
            }
        } else {
            Serial.println("end payload. httpcode is not OK");
        }

    } else {
        Serial.println("POST failed. Error:");
        Serial.println(httpclient.errorToString(httpcode).c_str());
    }

    httpclient.end();
}
