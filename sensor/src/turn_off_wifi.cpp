#include <WiFi.h>

void turnOffWiFi() {
 Serial.print("Turned wifi off");
 WiFi.mode(WIFI_OFF);
}
