#include "corefunctionality.h"

Preferences prefs;
HTTPClient httpclient;

#define DATAPOINT_COUNT_LIMIT 20

static const String host = "http://192.168.4.1";
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

string getDataAsArrayString() {
    /*
     * TODO uncomment when merged with other preferences changes
    string data = "";
    string name;
    unsigned short tempData;

    for(int i = 0; i < 4; i++) {
        //TODO Update to correct name strings and correct order
        if(i == 0;) {
            name = "temp";
        } else if(i == 1) {
            name = "mois";
        } else if(i == 2) {
            name = "phos";
        } else {
            name = "sun";
        }

        //open up datapoint's namespace in read only mode
        prefs.begin(name, true);

        tempData = prefs.getUShort(to_string(sendCount));
        //TODO Convert according to datatype
        data += to_string(tempData);
        //Ensure all values are a double until we properly convert them
        //TODO remove when possible
        data += ".0";

        //add comma and space after all elements except the last one
        if(i < (4-1)) {
            data += ", ";
        }

        prefs.end();
    }

    return data;
    */

    return "3.1, 4.2, 5.3, 6.4";
}

void sendJsonRPCRequest() {
    string data = getDataAsArrayString(name);

    //no data to be sent
    if(data == "") {
        return;
    }

    String http = host + ":8080/json/";

    String testjsonrpccall = "{\"jsonrpc\": \"2.0\", \"method\": \"TODOFILLINFUNCNAME\", \"params\": [" + data + "], \"id\": 1}";
    httpclient.begin(http);
    httpclient.POST(testjsonrpccall);
    //Examples used as reference: https://www.jsonrpc.org/specification

    int httpcode = httpclient.GET();

    if (httpcode > 0) {
        if(httpcode == HTTP_CODE_OK) {
            String payload = httpclient.getString();
            Serial.println(payload);
            if(payload.find(data) != npos) {
                Serial.println("Transmitted successfully");
                //TODO uncomment once done testing
                //Remove sent data
                /*
                for(int i = 0; i < 4; i++) {
                    //TODO Update to correct name strings and correct order
                    if(i == 0;) {
                        name = "temp";
                    } else if(i == 1) {
                        name = "mois";
                    } else if(i == 2) {
                        name = "phos";
                    } else {
                        name = "sun";
                    }

                    //open up datapoint's namespace in read/write mode
                    prefs.begin(name, true);

                    prefs.remove(to_string(sendCount));
                    prefs.end();
                }
                */
                //Increment sendCount
                sendCount++;
                sendCount %= DATAPOINT_COUNT_LIMIT;
            }
        }
    } else {
        Serial.println("Error");
    }

    httpclient.end();
}
