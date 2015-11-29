# サンプル（プロダクト名）
Interjection Killer

## 製品概要
プレゼンテーションの途中で入った間投詞(えーっと, あー)を,
つぼ(今回は"神門"というリラックス効果のある手首のつぼ)を押すフィードバックにより通知する．
また，プレゼンテーションの間に，間投詞が一定時間の間にどれくらい入ったか，のログを記録し，後で確認することができる．
### 背景(製品開発のきっかけ、課題等）
私達の大半は, 話している過程で無意識のうちに,
間投詞を入れてしまいます.
しかしそれは, 伝わりにくくなる原因につながります.
そこで, 間投詞を無くす支援をしたいと思ったことがきっかけです.
課題としては, 間投詞発生時のkintone 上のデータを
より有効に用いることがあります.
### 製品説明（具体的な製品の説明）
Smartphoneからアクセスするウェブアプリにより,
マイク音声の間投詞リアルタイム解析をします.
また, Edison上のスイッチを押すことで,
解析の間生成される, 間投詞が話されたかどうかの情報を
定期的に取得し, 間投詞が見つかれば,
その場でユーザのツボを押し, LEDが光ります.
また, 間投詞の解析データは,
kintone に蓄積しているので, 後で時系列のグラフ表示が可能です.
### 特長
####1. 特長1
内側に突起物の付いたベルトをサーボで巻き上げて, ユーザのつぼを押します.
####2. 特長2
プレゼンテーションの開始から終了まで日本語発話内容の文字化を行い,
間投詞位置の解析を行います.
####3. 特長3

### 解決出来ること
ハイクオリティーなプレゼンが求められる今日において
無意識の内に発してしまう間投詞を，ユーザ自身で気づき改善することができる．

### 今後の展望
現在実装しているユーザへのフィードバックは,
ツボ押しのみとなっております.
しかし, ユーザが好むデバイスを選択し,
その上で可能な情報提示, またはさらに情報を取得していくことができます.
これにより, コンセプトを統一したままで,
システムの在り方をより多様的にすることができます.
例えば, イヤホンの音やGoogle glassによる
ディスプレイ情報を用いた情報提示,
または, Apple Watchのようなウェアラブル・デバイスからは,
心拍数や皮膚温のような生体信号を取得することができます.
そうしたデバイスを情報提示のみならず,
取得したデータを用いてユーザ状態を推定することができます.
こうして, ユーザの状態に合わせて情報の提示レベルを
変えることも可能となり,
ユーザがより愛着をもって用いられるインターフェースにできます.

### 注力したこと（こだわり等）
* ハード部分：
ベルトに通してある糸をサーボで引っ張り，ユーザの腕に突起物を食い込ませるという原始的な方法を取っているが，腕に突起物が食い込みつつも，どこか気持ちの良いフィードバックを実装することができた．

* ソフト部分：
kintoneを介して音声認識を行うことで，音声データのログを保存することができる．音声認識には，GooglenのWeb Speech APIを用いており，マイクから入力された音声を日本語テキストへと変換することができる．ログから一定時間ごとの，間投詞の出現頻度を
視覚的に表示することにより，フィードバックを得ることができる．


このようにユーザに対して，リアルタイムの通知とデータのログからの情報の２つのフィードバックを行っている点が私達のシステムの特徴的な点です．

*
*

## 開発技術
### 活用した技術
#### API・データ
Google Web Speech API : 日本語の発話文の文章化
https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API?hl=en

kintone API : 日本語解析結果の蓄積, 及びEdisonへの
https://cybozudev.zendesk.com/hc/ja/categories/200147600-kintone-API
*
*
#### フレームワーク・ライブラリ・モジュール
*
*
#### デバイス
* Edison : ボタンを押して定期的にクエリを受信
* ツボ押しデバイス : サーボで巻き取るバンドの内側の凸部分でツボ押し
* Smartphone : ウェブアプリの起動とマイク受付
*
*

### 独自技術
#### ハッカソンで開発した独自機能・技術
ハード部分
* ユーザの手首を締め付け，さらにツボ押しを行うことで，ユーザの精神を安定させる通知手法
ソフト部分
* kintoneを用いてリアルタイムに音声を取得し，保存する機能
*
#### 製品に取り入れた研究内容（データ・ソフトウェアなど）（※アカデミック部門の場合のみ提出必須）
*
*
