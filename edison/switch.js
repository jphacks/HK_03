var mraa = require("mraa");
var led = new mraa.Gpio(13);    // pin 13 for LED
var switchCntl = new mraa.Gpio(12)  // pin 12 for SWITCH

exports.init = function() {
  led.dir(mraa.DIR_OUT);

}

exports.getSwitchState = function() {
  var switchState = switchCntl.read();
  if( switchState > 0 ){
    led.write(1);                 // LED on
    return 1;
  }else{
    led.write(0);                 // LED off
    return 0;
  }

};
