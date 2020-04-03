#include "corefunctionality.h"

Preferences prefs;
HTTPClient httpclient;

static const String host = "http://192.168.4.1";

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

string getDataAsArrayString(string name) {
    /*
     * TODO uncomment when merged with other preferences changes
    string data = "";
    unsigned char count;

    //open up datapoint's namespace in read only mode
    prefs.begin(name, true);

    count = prefs.get("C", 0);
    for(int i = 0; i < count; i++) {
        //TODO convert data to double value based on which name it is
        unsigned short tempData = prefs.getUShort(to_string(i));

        data += to_string(tempData);

        //Ensure all values are a double until we properly convert them
        //TODO remove when possible
        data += ".0";

        //add comma and space after all elements except the last one
        if(i < (count-1)) {
            data += ", ";
        }
    }

    prefs.end();

    return data;
    */

    return "3.1, 4.2, 5.3, 6.4, 7.5";
}

void sendJsonRPCRequest(string name) {
    String http = host + ":8080/json/";
    string functionName;
    string data = getDataAsArrayString(name);

    //no data stored for this name
    if(data == "") {
        return;
    }

    //TODO add other cases
    if(name == "temp") {
        functionName = "sendTemperatureData";
    } else {
        //Invalid name
        return;
    }

    String testjsonrpccall = "{\"jsonrpc\": \"2.0\", \"method\": \"" + functionName + "\", \"params\": [" + data + "], \"id\": 1}";
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
                //clearData(name);
            }
        }
    } else {
        Serial.println("Error");
    }

    httpclient.end();
}
