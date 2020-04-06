#include "corefunctionality.h"

Preferences prefs;

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

    storeData("temp", adc_moist);
}

//function that takes a pointer to a list                       
//then adds the phosphate variable to end of list 
void sampleAndStorePhosphate(){
    
    uint16_t adc_phos = analogRead(26);
    Serial.println(adc_phos);

    storeData("temp", adc_phos);
        
}

//function that takes a pointer to a list                       
//then adds the sunlight variable to end of list 
void sampleAndStoreSunlight(){
    
    uint16_t adc_sun = analogRead(27);
    Serial.println(adc_sun);

    storeData("temp", adc_sun);
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
