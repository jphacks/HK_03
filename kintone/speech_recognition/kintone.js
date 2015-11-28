var eve;
var str = [20];
var cur = 0;
var num_inter = 0;

var recognition3 = new webkitSpeechRecognition();
recognition3.lang = "ja-JP";
recognition3.interimResults = true;
recognition3.continuous = true;

recognition3.onresult = function(event){
    var results = event.results;
    console.log(event.resultIndex  + ' '  + results.length + '\n');
    console.log(results[cur][0].transcript + '\n');
    //for (var i = event.resultIndex; i<results.length; i++){
    var i = event.resultIndex;
      
    if(cur + 1 == i){
      console.log('nya' + '\n');
      cur++;
    }
    str[cur] = results[cur][0].transcript;
};


recognition3.onsoundend = function(){
  
};



(function () {
    "use strict";
    kintone.events.on('app.record.create.show', function (event) {
    //ここに「追加」に自動的に移動する処理を加える
    recognition3.start();
    eve = event;
    var record = event.record;
    var voice = record['音声'].value;
    return event;
    });
     kintone.events.on('app.record.create.submit', function (event) {
    //ここに「追加」に自動的に移動する処理を加える
    recognition3.stop();
    event.record['音声'].value = '';
    var num ;
    for(var i = 0; i <= cur; i++){
      num = 0;
      while(1){
        if((num = str[i].indexOf("あー",num)) != -1 && num < str[i].length){
          num_inter++;
        }
        else{
          break;
        }
      
      }
      
      event.record['音声'].value += str[i];
    }
    console.log(num_inter + '\n');
    return event;
    });
})();