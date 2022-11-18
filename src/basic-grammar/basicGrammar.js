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
// プリミティブ型（基本型）一度作成したらその値自体を変更できないというイミュータブルの特性もつ
// 真偽値（Boolean）: trueまたはfalseのデータ型
// 数値（Number）: 42 や 3.14159 などの数値のデータ型
// 巨大な整数（BigInt）: ES2020から追加された9007199254740992nなどの任意精度の整数のデータ型
// 文字列（String）: "JavaScript" などの文字列のデータ型
// undefined: 値が未定義であることを意味するデータ型
// null: 値が存在しないことを意味するデータ型
// シンボル（Symbol）: ES2015から追加された一意で不変な値のデータ型

// オブジェクト（複合型）一度作成した後もその値自体を変更できるためミュータブル（mutable）の特性を持つ
// プリミティブ型以外のデータ
// オブジェクト、配列、関数、クラス、正規表現、Dateなど

// typeof演算子では、オブジェクトの詳細な種類を判定できない
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

// 整数リテラルには次の4種類が存在する

// 10進数: 数字の組み合わせ
// ただし、複数の数字を組み合わせた際に、先頭を0から開始すると8進数として扱われる場合があります
// 例）0、2、10
console.log(2);
// 2進数: 0b（または0B）の後ろに、0または1の数字の組み合わせ
// 例）0b0、0b10、0b1010
// 0bからはじまる2進数リテラルは、ビットを表現するのによく利用されています。
console.log(0b1);
// 8進数: 0o（または0O）の後ろに、0から7までの数字の組み合わせ
// 0o は数字のゼロと小文字アルファベットのo
// 例）0o644、0o777
// 0oからはじまる8進数リテラルは、ファイルのパーミッションを表現するのによく利用されています。
// ファイルごとに定義された、読み出し・書込みなどのアクセスに対する許可情報。
console.log(0o77);
// 16進数: 0x（または0X）の後ろに、0から9までの数字とaからfまたはAからFのアルファベットの組み合わせ
// アルファベットの大文字・小文字の違いは値には影響しません
// 例）0x30A2、0xEEFF
// 0xからはじまる16進数リテラルは、文字のコードポイントやRGB値の表現などに利用されています。
console.log(0x30a2);

// Numeric Separators
// ES2021から、数値リテラル内の区切り文字として_を追加できるNumeric Separatorsがサポートされています。
console.log(1_000_000_000);

// テンプレートリテラル
// テンプレートリテラルは、`（バッククォート）で囲んだ範囲を文字列とするリテラルです。
const str = "入れたくないかもだし";
const template = `
  複数行の
  文字列を
  ${str}
  入れたい
`;
console.log(template);

// 正規表現リテラル
const numberRegExp = /\d+/;
console.log(numberRegExp.test("123"));

// *** 演算子 ***
// べき乗を計算できる
console.log(2 ** 4); // =>16
console.log(Math.pow(2, 4)); // =>16

// 単項演算子の+はオペランドを数値に変換する（一方、数値に変換できない文字列などはNaNという特殊な値へと変換される）
// * 単項プラス演算子は文字列から数値への変換に使うべきではなく、Numberコンストラクタ関数やparseInt関数などの明示的な変換方法を使用した方がいい
console.log(typeof +"1"); // => number

// 厳密等価演算子
// オペランドがどちらもオブジェクトであるときは、 オブジェクトの参照が同じである場合に、trueを返します。
// {} は新しいオブジェクトを作成している
const objA = {};
const objB = {};
// 生成されたオブジェクトは異なる参照となる
console.log(objA === objB); // => false

// 等価演算子（==）
// 等価演算子（==）はオペランド同士が異なる型の値であった場合に、 同じ型となるように暗黙的な型変換をしてから比較します。
// 文字列を数値に変換してから比較
console.log(1 == "1"); // => true
// "01"を数値にすると`1`となる
console.log(1 == "01"); // => true

// 例外的に、等価演算子（==）が使われるケースとして、nullとundefinedの比較があります。
const value = undefined; /* または null */
// === では2つの値と比較しないといけない
if (value === null || value === undefined) {
  console.log("valueがnullまたはundefinedである場合の処理");
}
// == では null と比較するだけでよい
if (value == null) {
  console.log("valueがnullまたはundefinedである場合の処理");
}

// ビット演算子
// ビット演算子では、オペランドである数値を符号付き32ビット整数（0と1からなる32個のビットの集合）として扱います。
console.log(00000000000000000000000000000001);

// ビット論理積（&）
// ビット論理積演算子（&）はビットごとのAND演算した結果を返します。 AND演算では、オペランドの各ビットがどちらも1の場合は1となり、それ以外の場合は0となります。
console.log(15 & 9); // => 9
// 同じ位の各ビット同士をAND演算する（上位の`0`は省略）
// 1111
// 1001
// ----
// 1001
console.log(0b1111 & 0b1001); // => 0b1001

// ビット論理和（|）
// OR演算では、オペランドの各ビットがどちらか片方でも1の場合は1となり、両方とも0の場合は0となります。
console.log(15 | 9); // => 15
// 同じ位の各ビット同士をOR演算する（上位の`0`は省略）
// 1111
// 1001
// ----
// 1111
console.log(0b1111 | 0b1001); // => 0b1111

// ビット排他的論理和（^）
// XOR演算では、オペランドのビットが異なるなら1、両方とも同じなら0となります。
console.log(15 ^ 9); // => 6
// 同じ位の各ビット同士をXOR演算する（上位の`0`は省略）
// 1111
// 1001
// ----
// 0110
console.log(0b1111 ^ 0b1001); // => 0b0110

// ビット否定（~）
// オペランドの各ビットを反転した値を返します。 これは1の補数として知られている値と同じものです。
console.log(~15); // => -16

// 文字列検索ではincludesメソッドを使用する
const str2 = "森木森";
if (str2.includes("木")) {
  console.log("値を見つけました");
}

// 左シフト演算子（<<）
// 左シフト演算子は、数値であるnumをbitの数だけ左へシフトします。 左にあふれたビットは破棄され、0のビットを右から詰めます。
// num << bit;
console.log(9 << 2); // => 36
console.log(0b1111 << 2); // => 0b11_1100

// ゼロ埋め右シフト演算子（>>>）
// ゼロ埋め右シフト演算子は、数値であるnumをbitの数だけ右へシフトするのは右シフト演算子（>>）と同じです。 異なる点としては右にあふれたビットは破棄され、0のビットを左から詰めます。
console.log(-9 >>> 2); // => 1073741821
//    1111_1111_1111_1111_1111_1111_1111_0111 >>> 2
// => 0011_1111_1111_1111_1111_1111_1111_1101

// 分割代入（Destructuring assignment）
const array = [1, 2];
const [a, b] = array;
console.log(a, b);

// 同様にオブジェクトも分割代入に対応しています。 オブジェクトの場合は、右辺のオブジェクトのプロパティ値を、左辺に対応するプロパティ名へ代入します。
const obj = {
  key: "value",
};
// プロパティ名`key`の値を、変数`key`として定義する
const { key } = obj;
console.log(key); // => "value"

// JavaScriptのfalseの判定条件
// false
// undefined
// null
// 0
// 0n
// NaN
// ""（空文字列）

// &&を用いた条件式
console.log("文字列" && "右辺の値"); // => "右辺の値"
console.log(42 && "右辺の値"); // => "右辺の値"
// 左辺がfalsyであるため、評価結果として左辺を返す
console.log("" && "右辺の値"); // => ""
console.log(0 && "右辺の値"); // => 0

const kan = "" && 42;
console.log(kan); // => ""

const kan2 = 22 && 0;
console.log(kan2); // => 0

console.log(true || "右辺の値"); // => true

console.log(false || "右辺の値"); // => 右辺の値

// Nullish coalescing演算子(??) nullishとは、評価結果がnullまたはundefinedとなる値のことです。
// 左辺がnullishであるため、右辺の値の評価結果を返す
console.log(null ?? "右辺の値"); // => "右辺の値"
// 左辺がnullishではないため、左辺の値の評価結果を返す
console.log(true ?? "右辺の値"); // => true
// ||も使用できるが数値の0を使用するとfalseの判定をされてしまうので、??が導入された。

//無理して一つの式で書くよりも条件式を分解した方が読みやすくなることがある
if (
  (typeof a === "string" && typeof b === "string") ||
  (typeof x === "number" && typeof y === "number")
) {
  // `a`と`b`が文字列型 または
  // `x`と`y`が数値型
}

const isAbString = typeof a === "string" && typeof b === "string";
const isXyNumber = typeof x === "number" && typeof y === "number";
if (isAbString || isXyNumber) {
  // `a`と`b`が文字列型 または
  // `x`と`y`が数値型
}

// *** 暗黙歴な型変換　***
const x = 1,
  y = "2",
  z = 3;
console.log(x + y + z); // => "123"
console.log(y + x + z); // => "213"
console.log(x + z + y); // => "42"

// シンボル → 文字列
// ES2015で追加されたプリミティブ型であるシンボルは暗黙的に型変換できません。 文字列結合演算子をシンボルに対して利用すると例外を投げるようになっています。
// この問題もStringコンストラクタ関数を使うことで、シンボルを明示的に文字列化することで解決できます。

"文字列と" + String(Symbol("シンボルの説明")); // => "文字列とSymbol(シンボルの説明)"

// 文字列 → 数値
// 文字列から数値に変換する典型的なケースとしては、ユーザー入力として数字を受け取ることがあげられます。 ユーザー入力は文字列でしか受け取ることができないため、それを数値に変換してから利用する必要があります。
// 文字列から数値へ明示的に変換するにはNumberコンストラクタ関数が利用できます。
// また、文字列から数字を取り出して変換する関数としてNumber.parseInt、Number.parseFloatも利用できます。

// ユーザー入力を文字列として受け取る
const input = window.prompt("数字を入力してください", "42");
// 文字列を数値に変換する
const num = Number(input);
console.log(typeof num); // => "number"
console.log(num); // 入力された文字列を数値に変換したもの

// しかし、ユーザーが数字を入力するとは限りません。 Numberコンストラクタ関数、Number.parseInt、Number.parseFloatは、 数字以外の文字列を渡すとNaN（Not a Number）を返します。

const userInput = "任意の文字列";
const num2 = Number.parseInt(userInput, 10);
if (Number.isNaN(num)) {
  console.log("パースした結果NaNになった", num);
}

// NaN
// NaNという値を作る方法は簡単で、Number型と互換性のない性質のデータをNumber型へ変換した結果はNaNとなります。

// JSDOC
// JavaScriptではコメントで引数の型を記述する書式としてJSDocが有名です。

// 空文字列かどうかを判定する
// 空文字列かどうかを判定
function isEmptyString(str) {
  // String型でlengthが0の値の場合はtrueを返す
  return typeof str === "string" && str.length === 0;
}
console.log(isEmptyString("")); // => true
// falsyな値でも正しく判定できる
console.log(isEmptyString(0)); // => false
console.log(isEmptyString()); // => false

// Booleanを使った型変換は、楽をするための型変換であり、正確に真偽値を得るための方法ではありません。 そのため、型変換をする前にまず別の方法で解決できないかを考えることも大切です。
// n**Null 合体代入 (??=)**

// Null 合体代入 (`x ??= y`
// ) 演算子は、`x`
//  が [nullish](https://developer.mozilla.org/ja/docs/Glossary/Nullish)
//  (`null`
//  または `undefined`
// ) である場合にのみ代入を行います。

// *** オブジェクト ***

// プロパティ名と値に指定する変数名が同じ場合は{ name }のように省略して書くことができる
const name2 = "名前";
const obj2 = {
  name2,
};
console.log(obj2); // => { name: "名前" }

// * プロパティへのアクセス
// オブジェクトのプロパティにアクセスする方法として、ドット記法（.）を使う方法とブラケット記法（[]）が存在する。
const obj3 = {
  key: "value",
};
// ドット記法で参照
console.log(obj3.key); // => "value"
// ブラケット記法で参照
// [と]の間に任意の式を書けます。 そのため、識別子の命名規則とは関係なく、任意の文字列をプロパティ名として指定できます。
// また、ブラケット記法ではプロパティ名に変数も利用できます。
console.log(obj3["key"]); // => "value"

// [ES2015] オブジェクトと分割代入
const languages = {
  ja: "日本語",
  en: "英語",
};

const { ja, en } = languages;
console.log(ja);
console.log(en);

// [コラム] constで定義したオブジェクトは変更可能
const obj5 = { key: "value" };
obj.key = "Hi!"; // constで定義したオブジェクト(`obj`)が変更できる
console.log(obj5.key); // => "Hi!"

// JavaScriptのconstは値を固定するのではなく、変数への再代入を防ぐためのものです。
// 作成したオブジェクトのプロパティの変更を防止するにはObject.freezeメソッドを利用する必要があります。 Object.freezeはオブジェクトを凍結します。

const object = Object.freeze({ key: "value" });
object.key = "value"; // => TypeError: "key" is read-only

// * プロパティの存在を確認する
// プロパティの確認方法として以下の4つの方法が存在する
// undefinedとの比較
// in演算子
// Object.hasOwn静的メソッド[ES2022]
// Object.prototype.hasOwnPropertyメソッド

const obj6 = {
  key: "value",
};

// しかし、この方法はプロパティの値がundefinedであった場合に、プロパティそのものが存在するかを区別できないという問題があります。
if (obj6.key !== undefined) {
  console.log("値が存在します");
}

// bjにkeyプロパティが存在するかを判定しています。 in演算子は、プロパティの値は関係なく、プロパティが存在した場合にtrueを返します。
if ("key" in obj6) {
  console.log("存在する");
}

if (Object.hasOwn(obj6, "key")) {
  console.log("存在する");
}

// [ES2020] Optional chaining演算子（?.）
let obj = {
  a: {
    b: "objのaプロパティのbプロパティ",
  },
};
// obj.a.b は存在するので、その評価結果を返す
console.log(obj?.a?.b); // => "objのaプロパティのbプロパティ"
// 存在しないプロパティのネストも`undefined`を返す
// ドット記法の場合は例外が発生してしまう
console.log(obj?.notFound?.notFound); // => undefined
// undefinedやnullはnullishなので、`undefined`を返す
console.log(undefined?.notFound?.notFound); // => undefined
console.log(null?.notFound?.notFound); // => undefined

// * オブジェクトの静的メソッド
// オブジェクトの列挙
// そのオブジェクトのプロパティを列挙する方法として、次の3つの静的メソッドがあります。
// Object.keysメソッド: オブジェクトのプロパティ名の配列にして返す
// Object.valuesメソッド[ES2017]: オブジェクトの値の配列にして返す
// Object.entriesメソッド[ES2017]: オブジェクトのプロパティ名と値の配列の配列を返す
const number = {
  one: 1,
  two: 2,
  three: 3,
};

// `Object.keys`はキーを列挙した配列を返す
console.log(Object.key(number)); // => ["one", "two", "three"]
// `Object.values`は値を列挙した配列を返す
console.log(Object.values(number)); // => [1, 2, 3]
// `Object.entries`は[キー, 値]の配列を返す
console.log(Object.entries(number)); // => [["one", 1], ["two", 2], ["three", 3]]

// こんな使い方もできる
const keys = Object.keys(number);
keys.forEach((key) => {
  console.log(key);
});
// 次の値が順番に出力される
// "one"
// "two"
// "three"

// * オブジェクトのマージと複製
const objectA = { a: "a" };
const objectB = { b: "b" };
const merged = Object.assign({}, objectA, objectB);
console.log(merged); // => { a: "a", b: "b" }

// * [ES2018] オブジェクトのspread構文でのマージ
// ES2018では、オブジェクトのマージを行うオブジェクトの...（spread構文）が追加された。
const objectAc = { a: "a" };
const objectBc = { b: "b" };
const mergedc = {
  ...objectAc,
  ...objectBc,
};
console.log(merged); // => { a: "a", b: "b" }

// オブジェクトの複製
// JavaScriptには、オブジェクトを複製する関数は用意されていません。 しかし、新しく空のオブジェクトを作成し、そこへ既存のオブジェクトのプロパティをコピーすれば、それはオブジェクトの複製をしていると言えます。 次のように、Object.assignメソッドを使うことでオブジェクトを複製できます。
// 引数の`obj`を浅く複製したオブジェクトを返す
const shallowClonev = (obj) => {
  return Object.assign({}, obj);
};
const obj = { a: "a" };
const cloneObjv = shallowClonev(obj);
console.log(cloneObjv); // => { a: "a" }
// オブジェクトを複製しているので、異なるオブジェクトとなる
console.log(obj === cloneObjv); // => false

// 注意点として、Object.assignメソッドはsourcesオブジェクトのプロパティを浅くコピー（shallow copy）する点です。 shallow copyとは、sourcesオブジェクトの直下にあるプロパティだけをコピーするということです。 そのプロパティの値がオブジェクトである場合に、ネストした先のオブジェクトまでも複製するわけではありません。
// 逆にプロパティの値までも再帰的に複製してコピーすることを、深いコピー（deep copy）と呼びます。 deep copyは、再帰的にshallow copyすることで実現できます。 次のコードでは、deepCloneをshallowCloneを使うことで実現しています。
// 引数の`obj`を浅く複製したオブジェクトを返す
const shallowClone = (obj) => {
  return Object.assign({}, obj);
};
// 引数の`obj`を深く複製したオブジェクトを返す
function deepClone(obj) {
  const newObj = shallowClone(obj);
  // プロパティがオブジェクト型であるなら、再帰的に複製する
  Object.keys(newObj)
    .filter((k) => typeof newObj[k] === "object")
    .forEach((k) => (newObj[k] = deepClone(newObj[k])));
  return newObj;
}
const obj = {
  level: 1,
  nest: {
    level: 2,
  },
};
const cloneObj = deepClone(obj);
// `nest`オブジェクトも再帰的に複製されている
console.log(cloneObj.nest === obj.nest); // => false

/// *** プロトタイプオブジェクト ***
const onjR = {
  key: "value",
};

// `obj`インスタンスは`Object.prototype`に定義されたものを継承する
// `obj.toString`は継承した`Object.prototype.toString`を参照している
console.log(onjR.toString === Object.prototype.toString); // => true
// インスタンスからプロトタイプメソッドを呼び出せる
console.log(oonjRbj.toString()); // => "[object Object]"

/**
 * 関数と宣言
 */

// [ES2015] デフォルト引数
// 次のコードでは、渡した値をそのまま返すecho関数を定義しています。 先ほどのecho関数とは異なり、仮引数xに対してデフォルト値を指定しています。 そのため、引数を渡さずにecho関数を呼び出すと、xには"デフォルト値"が代入されます。
function echo(x = "デフォルト値") {
  return x;
}
console.log(echo(1));
console.log(echo());

// [ES2015] Rest parameters
function fn(...args) {
  console.log(args);
}

fn("a", "b", "c");

// Spread構文は、配列の前に...をつけた構文のことで、関数には配列の値を展開したものが引数として渡されます。 次のコードでは、arrayの配列を展開してfn関数の引数として渡しています。
const arrayaaa = [1, 2, 4];
fn(...arrayaaa);

// [ES2015] 関数の引数と分割代入
// 関数の引数でも分かる代入を行うことができる
function printUserId({ id }) {
  console.log(id);
}

const user = {
  id: 42,
};

printUserId(user);

// 配列も行うことができる
function print([first, second]) {
  console.log(first); // => 1
  console.log(second); // => 2
}
const array2 = [1, 2];
print(array2);

// 再帰関数
const factorial = function innerFact(n) {
  if (n === 0) {
    return 1;
  }
  return n * innerFact(n - 1);
};

console.log(factorial(3));

// コールバック関数
const arrays = [10, 20, 40];
arrays.forEach((value) => console.log(value));

/**
 * 基数ソート
 */

function radixSort10(a, k) {
  // k 桁の 10 進数
  let b = [],
    d = 0,
    i = 0,
    j,
    n,
    r = 1;
  // 初期化
  for (; i < 10; i++) {
    b[i] = [];
  }
  for (; d < k; ++d) {
    // 位置の位の確認
    for (i = 0; i < a.length; i++) {
      b[(a[i] / r) % 10 | 0].push(a[i]);
    }
    for (i = 0, j = 0; j < b.length; j++) {
      if (b[j] === undefined) {
        continue;
      }
      for (n = 0; n < b[j].length; n++) {
        a[i++] = b[j][n];
      }
    }
    console.log("データの確認", b);
    for (i = 0; i < b.length; i++) {
      b[i] = [];
    }
    r *= 10;
  }
  return a;
}

const arraySort = [302, 111, 196, 463, 55, 3, 456, 77, 777, 444, 23, 33];
console.log(radixSort10(arraySort, 3));

/**
 * ループと反復処理
 */

// 配列のforEachメソッド
const arrayForEach = [1, 2, 3, 4, 5];
arrayForEach.forEach((value) => console.log(value));

// for..in 文
// for...in文はオブジェクトのプロパティに対して、反復処理を行います。
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
// 注記: ループのたびに毎回新しいブロックに変数keyが定義されるため、再定義エラーが発生しない
for (const key in obj) {
  const value = obj[key];
  console.log(`key:${key}, value:${value}`);
}
// "key:a, value:1"
// "key:b, value:2"
// "key:c, value:3"

/**
 * オブジェクトに対する反復処理のためにfor...in文は有用に見えますが、多くの問題を持っています。
 * JavaScriptでは、オブジェクトは何らかのオブジェクトを継承しています。
 *  for...in文は、対象となるオブジェクトのプロパティを列挙する場合に、
 * 親オブジェクトまで列挙可能なものがあるかを探索して列挙します。
 * そのため、オブジェクト自身が持っていないプロパティも列挙されてしまい、意図しない結果になる場合があります。
 * 安全にオブジェクトのプロパティを列挙するには、Object.keysメソッド、Object.valuesメソッド、Object.entriesメソッドなどが利用できます。
 * 先ほどの例である、オブジェクトのキーと値を列挙するコードはfor...in文を使わずに書けます。
 *  Object.keysメソッドは引数のオブジェクト自身が持つ列挙可能なプロパティ名の配列を返します。
 * そのためfor...in文とは違い、親オブジェクトのプロパティは列挙されません。
 */

const obja = {
  a: 1,
  b: 2,
  c: 3,
};
Object.keys(obja).forEach((key) => {
  const value = obja[key];
  console.log(`key:${key}, value:${value}`);
});
// "key:a, value:1"
// "key:b, value:2"
// "key:c, value:3"

// [ES2015] for...of文
/**
 * JavaScriptでは、Symbol.iteratorという特別な名前のメソッドを実装したオブジェクトをiterableと呼びます。
 *  iterableオブジェクトは、for...of文で反復処理できます。
 */
const arraya = [1, 2, 3];
for (const value of arraya) {
  console.log(value);
}
// 1
// 2
// 3

// JavaScriptではStringオブジェクトもiterableです。 そのため、文字列を1文字ずつ列挙できます。
const str100 = "𠮷野家";
for (const value of str100) {
  console.log(value);
}
// "𠮷"
// "野"
// "家"

// *** 配列 ***
// 存在しないインデックスにアクセスするとundefindを返す
const array10 = [1, 2, 3];
console.log(array10[4]); // => undefined

// これは、配列がオブジェクトであることを考えると、次のように存在しないプロパティへアクセスしているのと原理は同じです。
const obj10 = {
  0: "one",
  1: "two",
  2: "three",
  length: 3,
};
// obj["100"]は定義されていないため、undefinedが返る
console.log(obj10[100]); // => undefined

const aparseArray = [1, , 3]; // 疎な配列
const fullArray = [1, 2, 3]; // 密な配列

// [ES2022] Array.prototype.at
//  配列の要素にアクセスするには配列[インデックス]という構文を使うことを紹介しました。 その際に、配列の末尾の要素へアクセスするには、array[array.length - 1]というlengthプロパティを使う必要があります。 arrayを2回書く必要があるなど、末尾の要素へのアクセスは少し手間が必要になっていました。
// この問題を解決するためES2022では、相対的なインデックスの値を指定して配列の要素へアクセスできるArray.prototype.atメソッドが追加されました。

const atArray = [1, 2, 3];
console.log(atArray.at(-1)); // =>3
// -1は、次のように書いた場合と同じ結果
console.log(array[array.length - 1]); // => "c"

// オブジェクトが配列かどうかを判定する
// あるオブジェクトが配列かどうかを判定するにはArray.isArrayメソッドを利用します。
const obj11 = {};
const array11 = [];
console.log(Array.isArray(obj11)); // => false
console.log(Array.isArray(array11)); // => true
// また、typeof演算子では配列かどうかを判定することはできません。 配列もオブジェクトの一種であるため、typeof演算子の結果が"object"となるためです。

// [コラム] [ES2015] TypedArray
// JavaScriptの配列は可変長のみですが、TypedArrayという固定長でかつ型つきの配列を扱う別のオブジェクトが存在します。 TypedArrayはバイナリデータのバッファを示すために使われるデータ型で、WebGLやバイナリを扱う場面で利用されます。 文字列や数値などのプリミティブ型の値を直接は利用できないため、通常の配列とは用途や使い勝手が異なります。

// [コラム] undefinedの要素と未定義の要素の違い

// 同じようにunbdefind扱いされてしまう
// 要素として`undefined`を持つ密な配列
const denseArray = [1, undefined, 3];
// 要素そのものがない疎な配列
const sparseArray = [1, , 3];
console.log(denseArray[1]); // => undefined
console.log(sparseArray[1]); // => undefined

// この違いを見つける方法として利用できるのが、Object.hasOwn静的メソッドです。
// 要素自体は存在し、その値が`undefined`
console.log(Object.hasOwn(denseArray, 1)); // => true
// 要素自体が存在しない
console.log(Object.hasOwn(sparseArray, 1)); // => false

// * 配列から要素を検索
// 配列から指定した要素を検索する目的には、 主に次の3つがあります。

// その要素のインデックスが欲しい場合
// その要素自体が欲しい場合
// その要素が含まれているかという真偽値が欲しい場合

// インデックスを取得
const array12 = ["Java", "JavaScript", "Ruby"];
const indexof = array12.indexOf("JavaScript");
console.log(indexof); // =>1

// indexOfメソッドは配列からプリミティブな要素を発見できますが、オブジェクトは持っているプロパティが同じでも別オブジェクトだと異なるものとして扱われます。

// 異なるオブジェクトだが値は同じものを見つけたい場合には、ArrayのfindIndexメソッドが利用できます。
// findIndexメソッドの引数には配列の各要素をテストする関数をコールバック関数として渡します。
const colors = [{ color: "red" }, { color: "green" }, { color: "blue" }];

const indexOfBule = colors.findIndex((obj) => {
  return obj.color === "bule";
});
console.log(indexOfBule); // => 2

// 条件に一致する要素を取得
// 以下の書き方であれば、よりより明確に要素自体が欲しいということを表現している

// `color`プロパティが"blue"のオブジェクトを取得
const buleColor = colors.find((obj) => {
  return obj.color === "bule";
});
console.log(blueColor); // => { "color": "blue" }
// 該当する要素がない場合は`undefined`を返す
const whiteColor = colors.find((obj) => {
  return obj.color === "white";
});
console.log(whiteColor); // => undefined

// 指定範囲の要素を取得
// 配列から指定範囲の要素を取り出す方法としてArrayのsliceメソッドが利用できます。

const array13 = ["A", "B", "C", "D", "E"];

console.log(array13.slice(1, 4)); //  => ["B", "C", "D"]
// / 第二引数を省略した場合は、第一引数から末尾の要素までを取り出す
console.log(array.slice(1)); // => ["B", "C", "D", "E"]

// 追加と削除
const array14 = [1, 2, 3];
array14.push(4); // 最後尾の4を追加
array14.pop(); // 最後尾の4を削除

array14.unshift(4); // 最前列に4を追加
array14.shift(); // 最前列の4を削除

const newArray = array14.concat(array13); // array13とarray14を繋げて新しい配列を作成

// [ES2015] 配列の展開
// ...（Spread構文）を使うことで、配列リテラル中に既存の配列を展開できます。
// 次のコードでは、配列リテラルの末尾に配列を展開しています。 これは、Arrayのconcatメソッドで配列同士を結合するのと同じ結果になります。

const newArray2 = [1, 2, 3, ...newArray];

// Spread構文は、concatメソッドとは異なり、配列リテラル中の任意の位置に配列を展開できます。
const newArray3 = [1, ...newArray, 2, 3];

// * [ES2019] 配列をフラット化
// Arrayのflatメソッド[ES2019]を使うことで、多次元配列をフラットな配列に変換できます。
// 新しい配列を返却する

const array15 = [[[1], 2], 3, 4, 5];
// 引数なしは 1 を指定した場合と同じ
console.log(array15.flat()); // [[1, 2], 3, 4, 5];
console.log(array15.flat(1)); // [[1, 2], 3, 4, 5];
console.log(array15.flat(2)); // [1, 2, 3, 4, 5];

// すべてをフラット化するには Infinity を渡す
console.log(array15.flat(Infinity)); // [1, 2, 3, 4, 5];

// * 配列から要素を削除 *
// 配列の先頭や末尾の要素を削除する場合はArrayのshiftメソッドやpopメソッドで行えます。
// しかし任意の場所の要素を削除するには、Arrayのspliceメソッドを利用できます。

// spliceメソッドを利用すると、削除した要素を自動で詰めることができます。 spliceメソッドは指定したインデックスから、指定した数だけ要素を取り除き、必要ならば要素を同時に追加できます。
const array16 = [1, 2, 3, 4, 5];
array16.splice(1, 1); // 2を削除
array.splice(0, array.length); // 全て削除

// 配列のすべての要素を削除することはArrayのspliceで行えますが、 配列のlengthプロパティへの代入を利用した方法もあります。

const array17 = [1, 2, 3];
array17.length = 0; // 配列を空にする
console.log(array17); // => []
// 新しい配列で変数を上書き
// 元々、array変数が参照していたarray17はどこからも参照されなくなり、ガベージコレクションによりメモリから解放されます。
array17 = [];

// * 破壊的なメソッドと非破壊的なメソッド *
// 破壊的なメソッドとは、配列オブジェクトそのものを変更し、変更した配列または変更箇所を返すメソッドです。 非破壊的メソッドとは、配列オブジェクトのコピーを作成してから変更し、そのコピーした配列を返すメソッドです。

// 破壊的なメソッド（例）
const array18 = [1, 2, 3, 4, 5];
array18.push(6);
console.log(array18); // `push`の返り値は配列ではなく、追加後の配列のlength
// `myArray`が参照する配列そのものが変更されている

// 非破壊的メソッド（例）
const array19 = [1, 2, 3];
const newArray4 = array19.concat("D"); // `concat`の返り値は結合済みの新しい配列
// `array19`は変更されていない
console.log(myArray); // => [1, 2, 3]
// `array19`と`newArray4`は異なる配列オブジェクト
console.log(myArray === newArray); // => false

// 破壊的なメソッドの例
// メソッド名	返り値
Array.prototype.pop; // 配列の末尾の値
Array.prototype.push; // 変更後の配列のlength
Array.prototype.splice; // 取り除かれた要素を含む配列
Array.prototype.reverse; // 反転した配列
Array.prototype.shift; // 配列の先頭の値
Array.prototype.sort; // ソートした配列
Array.prototype.unshift; // 変更後の配列のlength
Array.prototype.copyWithin[ES2015]; // 変更後の配列
Array.prototype.fill[ES2015]; // 変更後の配列

// 非破壊的なメソッドの例
// JavaScriptにはcopyメソッドそのものは存在しませんが、配列をコピーする方法としてArrayのsliceメソッドとconcatメソッドが利用されています。
// sliceメソッドとconcatメソッドは引数なしで呼び出すと、その配列のコピーを返します。
const myArray = ["A", "B", "C"];
// `slice`は`myArray`のコピーを返す - `myArray.concat()`でも同じ
const copiedArray = myArray.slice();
myArray.push("D");
console.log(myArray); // => ["A", "B", "C", "D"]
// `array`のコピーである`copiedArray`には影響がない
console.log(copiedArray); // => ["A", "B", "C"]
// コピーであるため参照は異なる
console.log(copiedArray === myArray); // => false

// * 配列を反復処理するメソッド *
// 反復処理の中でもよく利用されるのがArrayのforEach、map、filter、reduceメソッドです。 どのメソッドも共通して引数にコールバック関数を受け取るため高階関数と呼ばれます。

// Array.prototype.forEach
const array20 = [1, 2, 3];
array20.forEach((value, index, array) => {
  console.log(value, index, array);
});
// コンソールの出力
// 1, 0, [1, 2, 3]
// 2, 1, [1, 2, 3]
// 3, 2, [1, 2, 3]

// Array.prototype.map
// 各要素に10を乗算した新しい配列を作成する
const newArray20 = array20.map((value, index, array) => {
  return value * 10;
});

// Array.prototype.filter
// コールバック関数がtrueを返した要素だけを集めた新しい配列を返す非破壊的なメソッドです。 配列から不要な要素を取り除いた配列を作成したい場合に利用します。
const newAaary21 = array20.filter((value, index, array) => {
  return value % 2 === 1;
});

// Array.prototype.reduce
// Arrayのreduceメソッドは累積値（アキュムレータ）と配列の要素を順番にコールバック関数へ渡し、1つの累積値を返します。 配列から配列以外を含む任意の値を作成したい場合に利用します。
const totalValue = array20.reduce((accumulator, currentValue, index, array) => {
  return accumulator + currentValue;
}, 0);
// 次のコードでは、reduceメソッドは初期値を0として配列の各要素を加算した1つの数値を返します。 つまり配列から配列要素の合計値というNumber型の値を返しています。
// reduceメソッドには利点と可読性のトレードオフがありますが、利用する場合はreduceメソッドを扱う処理を関数で囲むなど処理の意図がわかるように工夫をする必要があります。
const array21 = [1, 2, 3];
function sum(array21) {
  return array21.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
}
console.log(sum(array)); // => 6

// * [コラム] Array-likeオブジェクト *
// 配列のように扱えるが配列ではないオブジェクトのことを、Array-likeオブジェクトと呼びます。 Array-likeオブジェクトとは配列のようにインデックスにアクセスでき、配列のようにlengthプロパティも持っています。しかし、配列のインスタンスではないため、Arrayのプロトタイプメソッドを持っていないオブジェクトのことです。
// Array-likeオブジェクトの例（arguments）
function myFunc() {
  console.log(arguments[0]); // => "a"
  console.log(arguments[1]); // => "b"
  console.log(arguments[2]); // => "c"
  // 配列ではないため、配列のメソッドは持っていない
  console.log(typeof arguments.forEach); // => "undefined"
}
myFunc("a", "b", "c");

// Array-likeオブジェクトか配列なのかを判別するにはArray.isArrayメソッドを利用できます。
function myFunc() {
  console.log(Array.isArray([1, 2, 3])); // => true
  console.log(Array.isArray(arguments)); // => false
}
myFunc("a", "b", "c");

// Array.fromメソッド[ES2015]を使うことでArray-likeオブジェクトを配列に変換して扱うことができます。
function myFunc() {
  // Array-likeオブジェクトを配列へ変換
  const argumentsArray = Array.from(arguments);
  console.log(Array.isArray(argumentsArray)); // => true
  // 配列のメソッドを利用できる
  argumentsArray.forEach((arg) => {
    console.log(arg);
  });
}
myFunc("a", "b", "c");

// * メソッドチェーンと高階関数 *
// メソッドチェーンとは、メソッドを呼び出した返り値に対してさらにメソッド呼び出しをするパターンのことを言います。
const array30 = [1].concat(2).concat(3);
console.log(array30); // => [1, 2, 3]

// ECMAScriptのバージョン名と発行年
const ECMAScriptVersions = [
  { name: "ECMAScript 1", year: 1997 },
  { name: "ECMAScript 2", year: 1998 },
  { name: "ECMAScript 3", year: 1999 },
  { name: "ECMAScript 5", year: 2009 },
  { name: "ECMAScript 5.1", year: 2011 },
  { name: "ECMAScript 2015", year: 2015 },
  { name: "ECMAScript 2016", year: 2016 },
  { name: "ECMAScript 2017", year: 2017 },
];
const versionNames = ECMAScriptVersions.filter((ECMAScript) => {
  ECMAScript.year <= 2000;
}).map((ECMAScript) => {
  ECMAScript.name;
});
console.log(versionNames); // => ["ECMAScript 1", "ECMAScript 2", "ECMAScript 3"]

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