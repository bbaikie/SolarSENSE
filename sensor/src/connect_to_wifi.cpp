#include <WiFi.h>
#include "../submodules/grpc/include/grpc/grpc.h"
//./sensor/submodules/grpc/include/grpc/grpc.h

void connectToWifi(const char* ssid, const char* password)
{
    // We start by connecting to a WiFi network
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void setup() {
    Serial.begin(115200);
    delay(5000);
    Serial.println(WiFi.macAddress());

    //TODO update
    connectToWifi("Wifi name", "wifi password");
}

void loop() {
    Serial.println();

    if (WiFi.status() != WL_CONNECTED) {
        Serial.print("disconnected");
    } else {
        Serial.print("connected");
    }
    delay(5000);
}
