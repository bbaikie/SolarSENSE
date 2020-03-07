#include "corefunctionality.h"

void activateLowPowerMode(int sleepSeconds){
    //TODO fill in
    
    //turn off wifi (figure out how to call turnOffWiFi from turn_Off_WiFi.cpp)
    turnOffWiFi();

    //put sensor to sleep
    //TODO we should research if this is the best way to put the sensor to sleep
    sleep(sleepSeconds);
}

void sampleAndStoreTemperature(){
    //pin A1 uses ADC2
    //Pin A1 is also gpio #25
    int adc_value = analogRead(25);
    Serial.println(adc_value);
}

//function that takes a pointer to a list                       
//then adds the Moisture variable to end of list 
void sampleAndStoreMoisture(){
    
    double moist; 
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
