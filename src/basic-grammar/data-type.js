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
