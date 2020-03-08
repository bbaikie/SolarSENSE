#include "corefunctionality.h"

Preferences prefs;

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
    uint16_t adc_value = analogRead(25);
    Serial.println(adc_value);

    //need to set temp to invalid when we transmit temperature data successfully
    if(prefs.getBool("temp_is_valid")) {
        size_t arr_length;

        //Storing data as raw adc value int, need to convert to celcius before sending to hub
        prefs.begin("temp"); // Use the temperature ("temp") preferences namespace

        //get size of currently stored array
        arr_length = prefs.getBytesLength("temp");

        //set up array for adding a datapoint, with 2 extra slots for the 2 bytes of the freshly read value (since it's 16 bit/2 byte)
        uint8_t temperature_data[arr_length + 2];

        //get old data, so we don't overwrite/lose it
        prefs.getBytes("temp", temperature_data, arr_length);

        //most significant 8 stored bits first
        temperature_data[arr_length] = (uint8_t) adc_value >> 8;
        //then the least significant 8 bits
        temperature_data[arr_length + 1] = (uint8_t) (adc_value & 0xFF);

        //store the new data
        prefs.putBytes("temp", temperature_data, (arr_length + 2)*sizeof(uint8_t));
    } else {
        prefs.begin("temp"); // Use the temperature ("temp") preferences namespace

        //array to store data in, with two slots for 2 bytes of adc_value
        uint8_t temperature_data[2];

        //most significant 8 stored bits first
        temperature_data[0] = (uint8_t) adc_value >> 8;
        //then the least significant 8 bits
        temperature_data[1] = (uint8_t) (adc_value & 0xFF);

        //store the new data
        prefs.putBytes("temp", temperature_data, 2*sizeof(uint8_t));

        //temp data is now valid
        prefs.begin("temp_is_valid"); // Use the temperature check ("temp_is_valid") preferences namespace
        prefs.putBool("temp_is_valid", true);
    }
}

//function that takes a pointer to a list                       
//then adds the Moisture variable to end of list 
void sampleAndStoreMoisture(){
    
    /* uses GPIO 26 and ADC #2*/

    /*this samples the  value from the sensor*/
    uint16_t adc_moist = analogRead(26);
    Serial.println("Moist ADC value: ");
    Serial.println(adc_moist);

    /*Now we need to store the data collected from moisture sensor*/

    /* if the data is valid*/
    if(prefs.getBool("moist_valid")){

        /*size of array*/ 
        size_t aLength;
        
        /*begin lookig for data regardign moisture (moist)*/
        prefs.begin("moist",false);

        /*aLength will equal to size of array*/
        aLength = prefs.getBytesLength("moist");

        /* unsigned 8 bit array will have 2 extra slots of 2 new read data */
        uint8_t moistureData[aLength + 2];
        
        /*asks for old data to prevent data overwrite*/
        prefs.getBytes("moist", moistureData, aLength);

        /*first incoming data entry will be the most signigficant bit*/
        moistureData[aLength] = (uint8_t) adc_moist >> 8;
        
        /*the next data entry will be the least significant bits*/
        moistureData[aLength + 1] = (uint8_t) (adc_moist & 0xff);

        /*put bytes into array*/
        prefs.putBytes("moist", moistureData, aLength);

    }
    
    /*if we are just starting to read in data*/
    else{
        
        prefs.begin("moist",false);

        /*the very first input will be the most significant bit*/
        moistureData[0] = (uint8_t) adc_moist >> 8;

        /*the next 8 bits (least significant bits) will store the next entry*/
        moistureData[aLength + 1] = (uint8_t) (adc_moist & 0xff);
        
           /*put bytes into array*/
        prefs.putBytes("moist", moistureData, aLength);

        prefs.begin("Moist_valid");
        prefs.putBool("Moist_valid",true);
    }
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
