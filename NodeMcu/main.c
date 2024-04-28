// SUITABLE ONLY FOR AURDUNIO UNO 


#include <ESP8266WiFi.h> 
#include <DHT.h>
#include <WiFiClient.h>
#include <Servo.h>

#define DHTPIN D1
#define DHTTYPE DHT11
#define LIGHT_SENSOR_PIN A0
#define SOIL_MOISTURE_SENSOR_PIN A0
#define TRIG_PIN D5
#define ECHO_PIN D6
#define GAS_SENSOR_ANALOG_PIN A0


Servo myservo;

const char* ssid = "Ninjacart_Guest";
const char* password = "@Guest$567";
const char* serverAddress = "192.168.9.78";
const int serverPort = 5600;

DHT dht(DHTPIN, DHTTYPE);
WiFiClient client;

void setup() {
  myservo.attach(D2);
  Serial.begin(115200);
  delay(1000);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to WiFi");

  dht.begin();
  pinMode(LIGHT_SENSOR_PIN, INPUT);
  pinMode(SOIL_MOISTURE_SENSOR_PIN, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(GAS_SENSOR_ANALOG_PIN, INPUT);

}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int lightIntensity = analogRead(LIGHT_SENSOR_PIN);
  int soilMoistureDigital = digitalRead(SOIL_MOISTURE_SENSOR_PIN);
  int soilMoistureAnalog = map(soilMoistureDigital, 0, 1, 0, 1023);
  long duration, distance;
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  duration = pulseIn(ECHO_PIN, HIGH);
  distance = duration * 0.0343 / 2;
  float wind_speed = (10 * distance) / 100;
  int gas_analog_value = analogRead(GAS_SENSOR_ANALOG_PIN);
  String device_id = "ab010";
 
if (client.connect(serverAddress, serverPort)) {
    String payload = "{\"device_id\":\"" + device_id + "\",\"temperature\":" + String(temperature) +
                     ",\"humidity\":" + String(humidity) +
                     ",\"light_intensity\":" + String(lightIntensity) +
                     ",\"soil_moisture\":" + String(soilMoistureAnalog) +
                     ",\"wind_speed\":" + String(wind_speed) +
                     ",\"gas_analog_value\":" + String(gas_analog_value) + "}";

    client.print("POST /api/data HTTP/1.1\r\n");
    client.print("Host: ");
    client.print(serverAddress);
    client.print("\r\n");
    client.print("Content-Type: application/json\r\n");
    client.print("Content-Length: ");
    client.print(payload.length());
    client.print("\r\n\r\n");
    client.print(payload);
    Serial.println("Data sent to server");
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
    Serial.print("Light Intensity: ");
    Serial.println(lightIntensity);
    Serial.print("Soil Moisture: ");
    Serial.println(soilMoistureAnalog);
    Serial.print("Wind Speed: ");
    Serial.print(wind_speed);
    Serial.println(" m/s");
    Serial.print("Gas Analog Value: ");
    Serial.println(gas_analog_value);
   
    client.stop();
  } else {
    Serial.println("Failed to connect to server");
  }

  delay(20000);
}