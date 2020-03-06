#include "corefunctionality.h"
#include <list>

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
void sampleAndStoreMoisture(list *list){
    
    double moist; 
    for(int i = 1; i<= list.size();i++){
    list.emplace_back(i); 
    }
}

//function that takes a pointer to a list                       
//then adds the phosphate variable to end of list 
void sampleAndStorePhosphate(list *list){
    
    double phos; 
    for(int i = 1; i<= list.size();i++){
    list.emplace_back(i); 
    }
}

//function that takes a pointer to a list                       
//then adds the sunlight variable to end of list 
void sampleAndStoreSunlight(list *list){
    
    double sun; 
    for(int i = 1; i<= list.size();i++){
    list.emplace_back(i); 
    }
}

//function that takes in pointer to list
//then transmitts list containing temperature
void transmitStoredTemperature(list *list){
    
    for(int i = 1; i<=list.size();i++){

    }
     
}

//function that takes in pointer to list 
//then transmitts list containing moisture 
void transmitStoredMoisture(list *list){
    //TODO fill in
   for(int i = 1; i<=list.size();i++){

    } 
}

//function that takes in pointer to list 
//then transmitts list containing phosphate
void transmitStoredPhosphate(){
    //TODO fill in
   for(int i = 1; i<=list.size();i++){

   } 
}

//function that takes in pointer to list 
//then transmitts list containing sunlight 
void transmitStoredSunlight(){
    //TODO fill in
    for(int i = 1; i<=list.size();i++){

    } 
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
