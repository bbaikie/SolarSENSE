#include "corefunctionality.h"

Preferences prefs;
HTTPClient httpclient;

#define DATAPOINT_COUNT_LIMIT 20

static const String host = "http://192.168.4.1/RPC2";
static unsigned char sendCount = 0;

#define DATAPOINT_COUNT_LIMIT 20

void activateLowPowerMode(int sleepSeconds){
    //TODO fill in
    
    //turn off wifi (figure out how to call turnOffWiFi from turn_Off_WiFi.cpp)
    turnOffWiFi();

    //put sensor to sleep
    //TODO we should research if this is the best way to put the sensor to sleep
    sleep(sleepSeconds);
}

//Must be called when certain type of data has been successfully transmitted to the hub
void clearData(string name) {
    //open up datapoint's namespace in rw mode
    prefs.begin(name, false);

    //clear data from current namespace
    prefs.clear();

    //close datapoint namespace
    prefs.end();
}

void storeData(string name, uint16_t data) {
    uint16_t latest_data = data;

    //open up datapoint's namespace in rw mode
    prefs.begin(name, false);

    //Get current count, with default of 0
    unsigned int count = prefs.getUChar("C", 0);

    //make sure we don't store too many datapoints
    count %= DATAPOINT_COUNT_LIMIT;

    //Store updated count
    prefs.putUChar("C", count);

    //if data is already stored, need to average it with new data
    if(prefs.getUShort(to_string(count))) {
        latest_data += prefs.getUShort(to_string(count));
        latest_data /= 2;
    }

    //Put latest piece of data
    prefs.putUShort(to_string(count), latest_data);

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

//function that takes a pointer to a list                       
//then adds the Moisture variable to end of list 
void sampleAndStoreMoisture(){
    /* uses GPIO 26 and ADC #2*/

    /*this samples the  value from the sensor*/
    uint16_t adc_moist = analogRead(26);
    Serial.println(adc_moist);

    storeData("mois", adc_moist);
}

//function that takes a pointer to a list                       
//then adds the phosphate variable to end of list 
void sampleAndStorePhosphate(){
    
    uint16_t adc_phos = analogRead(26);
    Serial.println(adc_phos);

    storeData("phos", adc_phos);
        
}

//function that takes a pointer to a list                       
//then adds the sunlight variable to end of list 
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
