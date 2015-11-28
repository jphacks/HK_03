var mraa = require("mraa");
var servo = new mraa.Pwm(9);

servo.period_us(20000);
servo.enable(true);

exports.neutral = function() {
  servo.write(0.0);
};
exports.push = function() {
  servo.write(0.1);
}
