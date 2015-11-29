var all_str = [20];
var cur = 0;
var str_num = 0;
var num_inter = 0;
//検索する文字数
var match_str = new Array("あー","えー","そのー");
//var fs = WScript.CreateObject("Scripting.FileSystemObject");
//var file = fs.CreateTextFile("ニャンまげ.txt");

var recognition3 = new webkitSpeechRecognition();
recognition3.lang = "ja-JP";
recognition3.interimResults = true;
recognition3.continuous = true;

recognition3.onsoundstart = function(){
};
recognition3.onnomatch = function(){
};
recognition3.onerror= function(){
  //音声がしばらく認識されなかったときもendと同じ処理を行う
  var string = new String();
  for(var i = 0; i <= str_num; i++){
    string += all_str[i];
    //正確な間投詞の数をここで計算する
    //下の計算だと誤差が出る場合があるので文章が固まった状態のものをまとめて処理する
    //そして、正しい間投詞の情報とall_str[i]をkintoneに送る
  }
};
recognition3.onsoundend = function(){
  //処理が終わったら
  var string = new String();
  for(var i = 0; i <= str_num; i++){
    string += all_str[i];
    //正確な間投詞の数をここで計算する
    //下の計算だと誤差が出る場合があるので文章が固まった状態のものをまとめて処理する
    //そして、正しい間投詞の情報とall_str[i]をkintoneに送る
  }
};

recognition3.onresult = function(event){
    var results = event.results;
    var flag = 0;
    var p = 0;
    var str = new String();
    var temp = new String();
    
    console.log(event.resultIndex  + ' '  + results.length + '\n');
    for (var i = event.resultIndex; i<results.length; i++){
      str += results[i][0].transcript;
    }
    all_str[str_num] = temp = results[event.resultIndex][0].transcript;
    
    //var i = event.resultIndex;
    /*
        if(results[i].isFinal){
             var str1 = results[i][0].transcript;
        //  var str2 = results[i+1][0].transcript;
          if(str1.indexOf("あー") != -1){
            $("#recognizedText3").text("ニャンまげ");
          
          }
          else{
            $("#recognizedText3").text(results[i][0].transcript);
          }
        }
        else{
          var str1 = results[i][0].transcript;
        //  var str2 = results[i+1][0].transcript;
          if(str1.indexOf("あー") != -1){
            $("#recognizedText3").text("ニャンまげ");
          }
          else{
            $("#recognizedText3").text(results[i][0].transcript);
          }
        }
    }
    */
    //文字列に対しcur番目から探索　探索後その文字列の長さ分curを増やす(現在curは諸般の事情で操作していない)
    for(var i = 0; i < match_str.length; i++ ){
       if((p = temp.indexOf(match_str[i],cur))!= -1){
        //間投詞の場所+1に現在地を移動する
        cur += p + 1;
        num_inter++;
        
        //ここにkintoneへ「間投詞が入った」という情報を送る
        //ただしこのままだと，1回の間投詞に対し複数回情報を送る可能性がある
        //そのためにcurを導入したが、いれたら逆に間投詞を見逃す場合が出てきた
        flag++;
        break;
      }
    } 
    
    //間投詞が一つもなければ
    if(flag == 0){
      //kintoneに間投詞はないという情報を送る
    }
    
    //次の音節に移ったらcurを最初に戻しstr_numを一つ増やす またその文字列を保存する
    if(str_num + 1 == event.resultIndex){
      cur = 0;
      str_num++;
      all_str[str_num] = temp;
    }  
    $("#recognizedText3").text(flag + ' ' +num_inter);
    console.log(str + '\n');
    
};

function reload_func(event){
    /*
    var string = new String();
        for(var i = 0; i <= str_num; i++){
          string += all_str[i];
          //正確な間投詞の数をここで計算する
          //下の計算だと誤差が出る場合があるので文章が固まった状態のものをまとめて処理する
          //そして、正しい間投詞の情報とall_str[i]をkintoneに送る
        }
        event.record['voice'].value = string;
        event.record['num'].value = num_inter;
  */
   location.reload();
   
}

(function () {
    "use strict";
    kintone.events.on('app.record.create.show', function (event) {
      recognition3.start(); 

      setTimeout(function(){event.record['num'].value = num_inter;reload_func(event);return event;}, 5000);
    return event;
    });
    

    kintone.events.on('app.record.create.submit', function (event) {
        var string = new String();
        for(var i = 0; i <= str_num; i++){
          string += all_str[i];
          //正確な間投詞の数をここで計算する
          //下の計算だと誤差が出る場合があるので文章が固まった状態のものをまとめて処理する
          //そして、正しい間投詞の情報とall_str[i]をkintoneに送る
        }
        event.record['voice'].value = string;
        event.record['num'].value = num_inter;
        return event;
    });
})();