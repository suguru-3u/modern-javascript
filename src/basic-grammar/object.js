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
let obj678 = {
  a: {
    b: "objのaプロパティのbプロパティ",
  },
};
// obj.a.b は存在するので、その評価結果を返す
console.log(obj678?.a?.b); // => "objのaプロパティのbプロパティ"
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
const obj456 = { a: "a" };
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
