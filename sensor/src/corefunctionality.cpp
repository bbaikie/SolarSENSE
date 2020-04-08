#include "corefunctionality.h"

Preferences prefs;
HTTPClient httpclient;

#define DATAPOINT_COUNT_LIMIT 20

static const String host = "http://192.168.4.1/RPC2";
static unsigned char sendCount = 0;

void activateLowPowerMode(int sleepSeconds){
    //TODO fill in
    
    //turn off wifi (figure out how to call turnOffWiFi from turn_Off_WiFi.cpp)
    turnOffWiFi();

    //put sensor to sleep
    //TODO we should research if this is the best way to put the sensor to sleep
    sleep(sleepSeconds);
}

void sampleAndStoreTemperature(){
}

//function that takes a pointer to a list                       
//then adds the Moisture variable to end of list 
void sampleAndStoreMoisture(){
}

//function that takes a pointer to a list                       
//then adds the phosphate variable to end of list 
void sampleAndStorePhosphate(){
    
    double phos; 
}

//function that takes a pointer to a list                       
//then adds the sunlight variable to end of list 
void sampleAndStoreSunlight(){
    
    double sun; 
}

//function that takes in pointer to list
//then transmitts list containing temperature
void transmitStoredTemperature(){
    
    //Storing data as raw adc value int, need to convert to celcius before sending to hub
    //Also, if it was successfully transmitted, then set temp_is_valid to false
     
}

//function that takes in pointer to list 
//then transmitts list containing moisture 
void transmitStoredMoisture(){
    //TODO fill in
}

//function that takes in pointer to list 
//then transmitts list containing phosphate
void transmitStoredPhosphate(){
    //TODO fill in
}

//function that takes in pointer to list 
//then transmitts list containing sunlight 
void transmitStoredSunlight(){
    //TODO fill in
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
    /*
     * TODO uncomment when merged with other preferences changes
    String data = "";
    String name;
    unsigned short tempData;

    for(int i = 0; i < 4; i++) {
        //TODO Update to correct name Strings and correct order
        //Order must be moisture, temperature, sunlight, phosphate
        if(i == 0;) {
            name = "mois";
        } else if(i == 1) {
            name = "temp";
        } else if(i == 2) {
            name = "sun";
        } else {
            name = "phos";
        }
        data+= "\"";

        //open up datapoint's namespace in read only mode
        prefs.begin(name, true);

        tempData = prefs.getUShort(to_String(sendCount));

        prefs.end();

        //TODO Convert to double according to datatype
        data += to_String(tempData);

        //add comma and space after all elements except the last one
        if(i < (4-1)) {
            data += ", ";
        }
        data+= "\"";
    }

    return data;
    */

    //TODO delete this sample return
    return "\"3.1\", \"4.2\", \"5.3\", \"6.4\"";
}

void sendJsonRPCRequest() {
    String data = getDataAsArrayString();

    //no data to be sent
    if(data == "") {
        return;
    }


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
                /* TODO uncomment when preferences stuff is sorted out
                for(int i = 0; i < 4; i++) {
                    if(i == 0;) {
                        name = "mois";
                    } else if(i == 1) {
                        name = "temp";
                    } else if(i == 2) {
                        name = "sun";
                    } else {
                        name = "phos";
                    }

                    //open up datapoint's namespace in read/write mode
                    prefs.begin(name, true);

                    prefs.remove(to_String(sendCount));
                    prefs.end();
                }
                //Increment sendCount
                sendCount++;
                sendCount %= DATAPOINT_COUNT_LIMIT;
                prefs.begin("counts", true);
                //TODO update stored sendcount
                prefs.end();
                */
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
