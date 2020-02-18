void activateLowPowerMode(int sleepSeconds){
    //TODO fill in
    
    //put sensor to sleep
    sleep(sleepSeconds);
    
    //turn off wifi (figure out how to call turnOffWiFi from turn_Off_WiFi.cpp)
    turnOffWiFi();

}

void sampleAndStoreTemperature(){
    //TODO fill in
    double temp;
}
void sampleAndStoreMoisture(){
    //TODO fill in
    double moist;
}
void sampleAndStorePhosphate(){
    //TODO fill in
    double phos;
}
void sampleAndStoreSunlight(){
    //TODO fill in
    double sun;
}

void transmitStoredTemperature(){
    //TODO fill in
}
void transmitStoredMoisture(){
    //TODO fill in
}
void transmitStoredPhosphate(){
    //TODO fill in
}
void transmitStoredSunlight(){
    //TODO fill in
}
 
