#include <WiFi.h>

void turnOnWifi() {
    Serial.println();
    if(WiFi.enableSTA(true)) {
        Serial.print("Turned wifi on");
    } else {
        Serial.print("Failed to turn on wifi");
    }
}
