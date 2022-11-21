// *** 関数とスコープ ***

// スコープがネストしていると内側から外側の変数に参照できる
{
  // OUTERブロックスコープ
  const x = "x";
  {
    // INNERブロックスコープからOUTERブロックスコープの変数を参照できる
    console.log(x); // => "x"
  }
}

// この内側から外側のスコープへと順番に変数が定義されているか探す仕組みのことをスコープチェーンと呼びます。

// グローバルスコープには自分で定義したグローバル変数以外に、プログラム実行時に自動的に定義されるビルトインオブジェクトがあります。
// ビルトインオブジェクトには、大きく分けて2種類のものがあります。 1つ目はECMAScript仕様が定義するundefinedのような変数（「undefinedはリテラルではない」を参照）やisNaNのような関数、ArrayやRegExpなどのコンストラクタ関数です。2つ目は実行環境（ブラウザやNode.jsなど）が定義するオブジェクトでdocumentやmoduleなどがあります。

// ビルトインオブジェクトは実行環境が自動的に定義している
// どこのスコープから参照してもReferenceErrorにはならない
console.log(isNaN); // => isNaN
console.log(Array); // => Array

// * varについて *

// var宣言より前に参照してもエラーにならない
console.log(x); // => undefined
var x = "varのx";

// 上のコードは実際には以下のように解釈されるコード
// スコープの先頭に宣言部分が巻き上げられる
var x;
console.log(x); // => undefined
// 変数への代入はそのままの位置に残る
x = "varのx";
console.log(x); // => "varのx"

// * 関数宣言と巻き上げ *

// functionキーワードを使った関数宣言もvarと同様に、もっとも近い関数またはグローバルスコープの先頭に巻き上げられます。
// `hello`関数の宣言より前に呼び出せる
hello(); // => "Hello"

function hello() {
  return "Hello";
}

// ちなみにfunctionを変数に格納した場合は、varの動作同様に巻き上げが起こる。
// `hello`変数は巻き上げられ、暗黙的に`undefined`となる
hello(); // => TypeError: hello is not a function

// `hello`変数へ関数を代入している
var hello = function () {
  return "Hello";
};

// * 即時実行関数 *

// 即時実行関数（IIFE, Immediately-Invoked Function Expression）は、 グローバルスコープの汚染を避けるために生まれたイディオムです。
// 次のように、匿名関数を宣言した直後に呼び出すことで、任意の処理を関数のスコープに閉じて実行できます。 関数スコープを作ることでfoo変数は匿名関数の外側からはアクセスできません。
(function () {
  // 関数のスコープ内でfoo変数を宣言している
  var foo = "foo";
  console.log(foo); // => "foo"
})();
// foo変数のスコープ外
console.log(typeof foo === "undefined"); // => true

// ** クロージャー **

// クロージャーとは「外側のスコープにある変数への参照を保持できる」という関数が持つ性質のことです。
// `increment`関数を定義して返す関数
function createCounter() {
  let count = 0;
  // `increment`関数は`count`変数を参照
  function increment() {
    count = count + 1;
    return count;
  }
  return increment;
}
// `myCounter`は`createCounter`が返した関数を参照
const myCounter = createCounter();
myCounter(); // => 1
myCounter(); // => 2
// 新しく`newCounter`を定義する
const newCounter = createCounter();
newCounter(); // => 1
newCounter(); // => 2
// `myCounter`と`newCounter`は別々の状態持っている
myCounter(); // => 3
newCounter(); // => 3

// 静的スコープ
// JavaScriptのスコープには、どの識別子がどの変数を参照するかが静的に決定されるという性質があります。 つまり、コードを実行する前にどの識別子がどの変数を参照しているかがわかるということです。
const x = 10; // ＊1

function printX() {
  // この識別子`x`は常に ＊1 の変数`x`を参照する
  console.log(x); // => 10
}

function run() {
  const x = 20; // ＊2
  printX(); // 常に10が出力される
}

run();
// この静的スコープの仕組みはfunctionキーワードを使った関数宣言、メソッド、Arrow Functionなどすべての関数で共通する性質です。

// メモリ管理の仕組み
// JavaScriptではガベージコレクションが採用されています。
let x = "before text";
// 変数`x`に新しいデータを代入する
x = "after text";
// このとき"before text"というデータはどこからも参照されなくなる
// その後、ガベージコレクションによってメモリ上から解放される

function printX() {
  const x = "X";
  console.log(x); // => "X"
}

printX();
// この時点で`"X"`を参照するものはなくなる -> 解放される

function createArray() {
  const tempArray = [1, 2, 3];
  return tempArray;
}
const array = createArray();
console.log(array); // => [1, 2, 3]
// 変数`array`が`[1, 2, 3]`という値を参照している -> 解放されない

// クロージャーは「静的スコープ」と「参照され続けている変数のデータが保持される」という2つの性質によって成り立っています。

/**
 * クロージャーの用途
 * 関数に状態を持たせる手段として
 * 外から参照できない変数を定義する手段として
 * グローバル変数を減らす手段として
 * 高階関数の一部分として
 */

const createCounter = () => {
  // 外のスコープから`privateCount`を直接参照できない
  let privateCount = 0;
  return () => {
    privateCount++;
    return `${privateCount}回目`;
  };
};
const counter = createCounter();
console.log(counter()); // => "1回目"
console.log(counter()); // => "2回目"

function greaterThan(n) {
  return function (m) {
    return m > n;
  };
}
// 5より大きな値かを判定する関数を作成する
const greaterThan5 = greaterThan(5);
console.log(greaterThan5(4)); // => false
console.log(greaterThan5(5)); // => false
console.log(greaterThan5(6)); // => true
