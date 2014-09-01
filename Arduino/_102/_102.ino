void setup() {
  // put your setup code here, to run once:
  pinMode(7, INPUT);
  pinMode(13, OUTPUT);

}

void loop() {
  // put your main code here, to run repeatedly:
  if (digitalRead(7))
    digitalWrite(13, HIGH);
  else
    digitalWrite(13, LOW);
}
