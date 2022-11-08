/**
 * JavaScriptという言語はECMAScriptという仕様によって動作が決められています。 ECMAScriptという仕様では、どの実行環境でも共通な動作のみが定義されているため、基本的にどの実行環境でも同じ動作をします。
 * そのため、「ECMAScript」はどの実行環境でも共通の部分、「JavaScript」はECMAScriptと実行環境の固有機能も含んだ範囲というのがイメージしやすいでしょう。
 * ECMAScriptでは機能を追加する際にも後方互換性を重視している。
 */

// 大文字と小文字を区別する
// それぞれ別の変数として認識される
const name = "azu";
const NAME = "azu";

// var
// 値の再代入が可能な変数
// 同じ名前の変数を再定義できてしまい、値を上書きしてしまいます。

// 数字から始まる変数名を定義することはできない

// constは値の再代入ができないが、オブジェクトであればできてしまう。

function test() {
  console.log("test");
}

console.log(test());

// constは値の再代入ができないが、オブジェクトであればできてしまう。

function test() {
  console.log("test");
}

console.log(test());

// *** データ型 ***
// プリミティブ型（基本型）
// 真偽値（Boolean）: trueまたはfalseのデータ型
// 数値（Number）: 42 や 3.14159 などの数値のデータ型
// 巨大な整数（BigInt）: ES2020から追加された9007199254740992nなどの任意精度の整数のデータ型
// 文字列（String）: "JavaScript" などの文字列のデータ型
// undefined: 値が未定義であることを意味するデータ型
// null: 値が存在しないことを意味するデータ型
// シンボル（Symbol）: ES2015から追加された一意で不変な値のデータ型

// オブジェクト（複合型）
// プリミティブ型以外のデータ
// オブジェクト、配列、関数、クラス、正規表現、Dateなど
console.log(typeof true); // => "boolean"
console.log(typeof 42); // => "number"
console.log(typeof 9007199254740992n); // => "bigint"
console.log(typeof "JavaScript"); // => "string"
console.log(typeof Symbol("シンボル")); // => "symbol"
console.log(typeof undefined); // => "undefined"
console.log(typeof null); // => "object"
console.log(typeof ["配列"]); // => "object"
console.log(typeof { key: "value" }); // => "object"
console.log(typeof function () {}); // => "function"
