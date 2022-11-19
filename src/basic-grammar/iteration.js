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
