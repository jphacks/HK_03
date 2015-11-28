var str = [20];
var cur = -1;
var num_inter = 0;

var recognition3 = new webkitSpeechRecognition();
recognition3.lang = "ja-JP";
recognition3.interimResults = true;
recognition3.continuous = true;

recognition3.onresult = function(event){
    var results = event.results;
    console.log(event.resultIndex  + ' '  + results.length + '\n');
    //for (var i = event.resultIndex; i<results.length; i++){
    var i = event.resultIndex;
      
    if(cur + 1 == i){
      cur++;
    }
    str[cur] = results[cur][0].transcript;
    console.log(results[cur][0].transcript + '\n');
    
};


recognition3.onsoundend = function(){
  
};



(function () {
    "use strict";
    kintone.events.on('app.record.create.show', function (event) {
    
    //音声の録音
    recognition3.start();
    
    //ボタンの配置
     var myIndexButton = document.createElement('button');
      myIndexButton.id = 'my_index_button';
      myIndexButton.onclick = function () {
         for(var i = 0; i <= cur; i++){
           event.record['音声'].value += str[i];
         }
      }
      kintone.app.record.getHeaderMenuSpaceElement().appendChild(myIndexButton);
    
    return event;
    });
    
    
    
    
    
     kintone.events.on('app.record.create.submit', function (event) {
    recognition3.stop();
    var num ;
    for(var i = 0; i <= cur; i++){
      num = 0;
      while(1){
        //あーがあるとその場所を返し+1した値をnumに入れる　次はnum番目から調べる　端(length)まで調べたら抜ける
        if((num = str[i].indexOf("あー",num) + 1) != 0 && num < str[i].length){
          num_inter++;
        }
        else{
          break;
        }
      }
      
      event.record['音声'].value += str[i];
    }
    return event;
    });
})();