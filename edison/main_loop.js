var kintone_get = require("./nodejs/kintone_get.js");
var servo = require("./servo_controll/servo.js");
var switchCntl = require("./switch.js");
var connecting = false;
var s;
var strings;


setInterval( function() {
  if( switchCntl.getSwitchState() > 0 ){
    startKintoneGet();
  }else{
    stopKintoneGet();
    console.log("--");
    servo.neutral();
  }
}, 100);

function startKintoneGet() {
  if( !connecting ){
    s = setInterval(function() {
      strings = kintone_get.get();
      console.log(strings);
      if( strings != null ){
        if( strings.indexOf('part') ){
          servo.push();
          console.log("PUSH!!!");
        }else{
          servo.neutral();
        }
      }
    }, 500);
    connecting = true;
  }
};

function stopKintoneGet() {
  if( connecting ){
    clearInterval(s);
    connecting = false;
  }
};

