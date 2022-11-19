
// *** 文字列 ***

// * エスケープシーケンス *
// 文字列リテラル中にはそのままでは入力できない特殊な文字もあります。
// エスケープシーケンス	意味
// \'	シングルクォート
// \"	ダブルクォート
// \` 	バッククォート
// \\	バックスラッシュ(\そのものを表示する)
// \n	改行
// \t	タブ
// \uXXXX	Code Unit(\uと4桁のHexDigit)
// // \u{X} ... \u{XXXXXX}	Code Point（\u{}のカッコ中にHexDigit）

// * [ES2022] String.prototype.at *
// ES2022からString.prototype.atメソッドが追加されています。 Stringのatメソッドは、Arrayのatメソッドと同じく、相対的なインデックスを渡してその位置の文字へアクセスできます。
const str10 = "文字列";
console.log(str10.at(0)); // => "文"
console.log(str10.at(1)); // => "字"
console.log(str10.at(2)); // => "列"
console.log(str10.at(-1)); // => "列"

// JavaScript（ECMAScript）は文字コードとしてUnicodeを採用し、文字をエンコードする方式としてUTF-16を採用しています。 UTF-16とは、それぞれの文字を16ビットのビット列に変換するエンコード方式です。
const str11 = "アオイ";
// それぞれの文字をCode Unitのhex値（16進数）に変換する
// toStringの引数に16を渡すと16進数に変換される
console.log(str11.charCodeAt(0).toString(16)); // => "30a2"
console.log(str11.charCodeAt(1).toString(16)); // => "30aa"
console.log(str11.charCodeAt(2).toString(16)); // => "30a4"

// 逆に、Code Unitをhex値（16進数）から文字へと変換するにはString.fromCharCodeメソッドを使います。
const str12 = String.fromCharCode(0x30a2, 0x30aa, 0x30a4);
console.log(str12); // => "アオイ"

// * 文字列の分解と結合 *

//分解（正規表現も指定できる）
const strings = "1.2.3".split(".");
console.log(strings); // => ["1","2","3"]

// 結合
const strings2 = "1.2.3".split(".").join(",");
console.log(strings2); // => "1,2,3"

// メモ
// sliceメソッドとsubstringメソッドは非破壊的メソッド

// * 文字列の検索 *
// 文字列による検索
const str20 = "abchsgd";
console.log(str20.indexOf("ab")); // => 0
console.log(str20.indexOf("ch")); // => 2

// 真偽値の取得
// String.prototype.includes(検索文字列)[ES2015]: 検索文字列を含むかの真偽値を返す
console.log(str20.includes("ab")); // => true

// 正規表現オブジェクト
// 文字列による検索では、固定の文字列にマッチするものしか検索できません。 一方で正規表現による検索では、あるパターン（規則性）にマッチするという柔軟な検索ができます。

// 正規表現リテラルで正規表現オブジェクトを作成
const patternA = /パターン/フラグ;
// `RegExp`コンストラクタで正規表現オブジェクトを作成
const patternB = new RegExp("パターン文字列","フラグ");

// 3つの連続するスペースなどにマッチする正規表現
const pattern3 = /\s{3}/;

const speaceCount = 3;
// `/\s{3}/`の正規表現を文字列から作成する
// "\"がエスケープ文字であるため、"\"自身を文字列として書くには、"\\"のように2つ書く
const pattern = new RegExp(`\\s{${speaceCount}}`);

// このように、RegExpコンストラクタは文字列から正規表現オブジェクトを作成できますが、特殊文字のエスケープが必要となります。 そのため、正規表現リテラルで表現できる場合は、リテラルを利用したほうが簡潔でパフォーマンスもよいです。 正規表現のパターンに変数

// * 正規表現による検索 *
// StringのindexOfメソッドの正規表現版ともいえるStringのsearchメソッドがあります。
const str30 = "ABCD123EFG";
const searchPattern = /\d{3}/
console.log(str30.search(searchPattern)) // => 4

//  matchメソッドは、正規表現の/パターン/が"文字列"にマッチすると、マッチした文字列に関する情報を返すメソッドです。
"文字列".match(/パターン/);

// matchメソッドは正規表現のgフラグなしのパターンで検索した場合、最初にマッチしたものが見つかった時点で検索が終了します。 このときのmatchメソッドの返り値は、indexプロパティとinputプロパティをもった特殊な配列となります。 indexプロパティにはマッチした文字列の先頭のインデックスが、inputプロパティには検索対象となった文字列全体が含まれています。
const str40 = "ABC あいう DE えお";
const alphabetsPattern = /[a-zA-Z]+/;
// gフラグなしでは、最初の結果のみを含んだ特殊な配列を返す
const results = str40.match(alphabetsPattern);
console.log(results.length); // => 1
// マッチした文字列はインデックスでアクセスできる
console.log(results[0]); // => "ABC"
// マッチした文字列の先頭のインデックス
console.log(results.index); // => 0
// 検索対象となった文字列全体
console.log(results.input); // => "ABC あいう DE えお"

// matchメソッドは正規表現のgフラグありのパターンで検索した場合、マッチしたすべての文字列を含んだ配列を返します。
const str41 = "ABC あいう DE えお";
const alphabetsPattern2 = /[a-zA-Z]+/g;
// gフラグありでは、すべての検索結果を含む配列を返す
const resultsWithG = str41.match(alphabetsPattern2);
console.log(resultsWithG.length); // => 2
console.log(resultsWithG[0]); // => "ABC"
console.log(resultsWithG[1]); // => "DE"
// indexとinputはgフラグありの場合は追加されない
console.log(resultsWithG.index); // => undefined
console.log(resultsWithG.input); // => undefined

// このときのmatchメソッドの返り値である配列にはindexとinputプロパティはありません。 なぜなら、複数の箇所にマッチする場合においては、1つのindexプロパティでは意味が一意に決まらないためです。

// Stringのmatchメソッドの挙動をまとめると次のようになります。
// マッチしない場合は、nullを返す
// マッチした場合は、マッチした文字列を含んだ特殊な配列を返す
// 正規表現のgフラグがある場合は、マッチしたすべての結果を含んだただの配列を返す

// ES2020では、正規表現のgフラグを使った繰り返しマッチする場合においても、それぞれマッチした文字列ごとの情報を得るためのStringのmatchAllが追加されています。 matchAllメソッドは、マッチした結果をIteratorで返します。
const str42 = "ABC あいう DE えお";
const alphabetsPattern3 = /[a-zA-Z]+/g;
// matchAllはIteratorを返す
const matchesIterator = str42.matchAll(alphabetsPattern3);
for (const match of matchesIterator) {
    // マッチした要素ごとの情報を含んでいる
    console.log(`match: "${match[0]}", index: ${match.index}, input: "${match.input}"`);
}
// 次の順番でコンソールに出力される
// match: "ABC", index: 0, input: "ABC あいう DE えお"
// match: "DE", index: 8, input: "ABC あいう DE えお"

// * 文字列の置換/削除 *
// 検索対象となる文字列
const str50 = "にわにはにわにわとりがいる";
// 文字列を指定した場合は、最初に一致したものだけが置換される
console.log(str50.replace("にわ", "niwa")); // => "niwaにはにわにわとりがいる"
// `g`フラグなし正規表現の場合は、最初に一致したものだけが置換される
console.log(str50.replace(/にわ/, "niwa")); // => "niwaにはにわにわとりがいる"
// `g`フラグあり正規表現の場合は、繰り返し置換を行う
console.log(str50.replace(/にわ/g, "niwa")); // => "niwaにはniwaniwaとりがいる"

// replaceメソッドとreplaceAllメソッドでは、キャプチャした文字列を利用して複雑な置換処理もできます。
function toDateJa(dateString) {
  // パターンにマッチしたときのみ、コールバック関数で置換処理が行われる
  return dateString.replace(/(\d{4})-(\d{2})-(\d{2})/g, (all, year, month, day) => {
      // `all`には、マッチした文字列全体が入っているが今回は利用しない
      // `all`が次の返す値で置換されるイメージ
      return `${year}年${month}月${day}日`;
  });
}
// マッチしない文字列の場合は、そのままの文字列が返る
console.log(toDateJa("本日ハ晴天ナリ")); // => "本日ハ晴天ナリ"
// マッチした場合は置換した結果を返す
console.log(toDateJa("今日は2017-03-01です")); // => "今日は2017年03月01日です"