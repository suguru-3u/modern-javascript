/**
 * Date型について解説。
 * 詳細は現代版チュートリアルを見た方がいいかも
 * https://ja.javascript.info/date
 */

// 日付を取得する
let now = new Date();
console.log(now);
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
// 週の曜日を取得する。0（日曜日）〜 6（土曜）
console.log(now.getDay());

// UTC
// 自分のタイムゾーンの時間
console.log(now.getHours());
// UTCタイムゾンの時間
console.log(now.getUTCHours());

// タイムゾーン UTC-1 にいる場合、60 を出力
// タイムゾーン UTC+3 にいる場合、-180 を出力
console.log(new Date().getTimezoneOffset());

// 日付の構成要素を設定する
let today = new Date();

today.setHours(0);
console.log(today); // 今日のままですが、時は 0 に変更されます

today.setHours(0, 0, 0, 0);
console.log(today); // 今日のままで, 今は 00:00:00 です

// Date型は値を自動補正してくれる。範囲外の値を指定した場合、それは自動的に調節されます。

// もし差分だけ測定したい場合、Date オブジェクトを使う必要はありません
let start = Date.now;
let end = Date.now;
console.log("時間の差分", end - start);

// JavaScriptエンジンの仕組みを理解することが大切

// 文字列からのDate.parse
// メソッド Date.parse(str) は文字列から日付を読むことができる
// 文字列のフォーマットは YYYY-MM-DDTHH:mm:ss.sssZ でなければなりません。:
let ms = Date.parse("2022-01-26T13:51:50.417-07:00");
console.log(ms);
let parseDate = new Date(Date.parse("2022-01-26T13:51:50.417-07:00"));
console.log(parseDate);

// まとめ
// JavaScript での日付と時刻はDate オブジェクトで表現されます。“日付だけ”、“時刻だけ” を作ることはできません。Date オブジェクトは常に両方を持ちます。
// 月はゼロからカウントされます(なので、1月は ゼロです)。
// getDay() の週の曜日もゼロからカウントされます(ゼロは日曜です)
// 範囲外の構成要素がセットされたとき、Date は自身を自動補正します。日/月/時の加減算の場合には便利です。
// 日付はミリ秒で与えられた差分で引き算することができます。これは、数値に変換されるとき、Date はタイムスタンプになるためです。
// 素早く現在のタイムスタンプを取得するには Date.now() を使いましょう。
// 多くの他のシステムとは異なり、JavaScriptでのタイムスタンプは秒ではなく、ミリ秒です。
