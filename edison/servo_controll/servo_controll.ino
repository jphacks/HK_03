#include <Servo.h>

#define PUSH_MIN -180           // もっとも緩んでいる状態のサーボ角度(deg)
#define PUSH_MAX 180            // もっとも締めている状態のサーボ角度(deg)
#define STEP_DEG 10             // 1回に変化させる角度(deg)
#define STEP_INTERVAL 10        // 変化させる時間の頻度(ms)
#define PUSH_TIME_LENGTH 3000   // 押している時間(ms)

#define MAX_CHAR_LENGTH 100

Servo myservo;  // サーボ

int pos;        // サーボの角度
char input_string[MAX_CHAR_LENGTH];   // 入力文字列のための配列
int char_length;                      // 入力文字列の長さ
int push_now;   // 今押してる最中なら1, でなければ0
int i;


// 押し始め
void start_push(){
  for(pos = PUSH_MIN; pos <= PUSH_MAX; pos += STEP_DEG) // PUSH_MIN度からPUSH_MAX度まで, STEP_DEG度ずつ押す 
  {
    push_now = 1;
    myservo.write(pos);
    delay(STEP_INTERVAL);                               // 1STEP_DEG度の移動につきSTEP_INTERVAL msだけかける
  } 
}

// 押し終わり
void end_push(){
  for(pos = PUSH_MAX; pos>=PUSH_MIN; pos-= STEP_DEG)    // PUSH_MAX度からPUSH_MIN度まで, STEP_DEG度ずつ緩める 
  { 
    push_now = 0;                        
    myservo.write(pos);
    delay(STEP_INTERVAL);                               // 1STEP_DEG度の移動につきSTEP_INTERVAL msだけかける
  } 
}


void setup()
{
  myservo.attach(9);  // pin 9 をサーボ用に設定
  Serial.begin(115200);
  push_now = 0;
}

void loop() 
{ 
  // 届いている文字列を最大許容数まで格納
  char_length = 0;
  while( Serial.available() ){
    input_string[char_length] = Serial.read();
    char_length++;
    if( char_length == MAX_CHAR_LENGTH ){
      break;
    }
  }

  // 何も来てなければpush終了
  if( char_length == 0 && push_now ){
    end_push();
  }

  // 文字列を処理
  for( i = 0 ; i < char_length ; i++ ){
    if( input_string[i] == 'p' ){   // 一つでもpが来たらpush!
      if( !push_now ){              // 今押してる最中ならそのままでおk
        start_push();
      }
      delay(PUSH_TIME_LENGTH);
      break;
    }else if( i == char_length-1 ){ // 最後までpが来なかったらpush終了
      end_push();
    }
  }
  
  delay(10);
} 

