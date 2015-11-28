var mraa = require("mraa");
var servo = new mraa.Pwm(9);

servo.period_us(20000); 
servo.enable(true);

servo.write(0.0);
