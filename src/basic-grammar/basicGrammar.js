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
