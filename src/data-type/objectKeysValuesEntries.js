/**
 * destructuring assignment（分割代入）
 */

//  JavaScriptで最も使われる2つのデータ構造は Object と Array です。

//  オブジェクトを使用すると、データ項目をキーごとに格納する単一のエンティティを作成できます。
//  配列は順序付けされたリストにデータ項目を集めることができます。
//  ですが、これらを関数にわたすとき、オブジェクト／配列全体は必要としない場合があります。個々の部分が必要な場合です。

let arr = ["John", "Smith"];

// 分割代入
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

console.log(firstName); // John
console.log(surname); // Smith

[firstName, surname] = "John Taro".split(" ");
console.log(firstName); // John
console.log(surname); // Smith

// *** expmale ***
// “分割” は “破壊的” を意味しません
// これは、項目を変数にコピーすることによって “非構造化(destructurizes)” するため、“分割代入(destructuring assignment)” と呼ばれています。 配列自体は変更されません。
// これは、より短い書き方になります:

// let [firstName, surname] = arr;
firstName = arr[0];
surname = arr[1];

let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(title);
// 上のコードでは、最初の2つの要素がスキップされ、3つ目は title に代入され、残りもスキップされています。

let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
// 内部的には分割代入は右辺の値に対してイテレーションすることで動作するため、これも動作します。これは = の右側の値に対して for..of を呼び出し、値を代入するためのシンタックスシュガーの一種です。

// 左辺には任意の “割り当て可能なもの” を指定することができます。
// 例えば、オブジェクトのプロパティも指定できます:
let user = {};
[user.name, user.surname] = "John Smith".split(" ");

console.log(user.name); // John
console.log(user.surname); // Smith

user = {
  name: "John",
  age: 30,
};

for (let [key, value] of Object.entries(user)) {
  console.log(`${key}:${value}`);
}

user2 = new Map();
user2.set("name", "John");
user2.set("age", "30");

for (let [key, value] of Object.entries(user2)) {
  console.log(`${key}:${value}`);
}

// 分割代入を使用して２つの変数の値を入れ替える、広く知られたトリックがあります:
let guest = "Jane";
let admin = "Pete";

// 値を入れかえましょう: guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

console.log(`${guest} ${admin}`); // Pete Jane (successfully swapped!)

// 続く項目もすべて取得したい場合は、３つのドット "..." を使用して “残り” を取得するパラメータを１つ追加します。:
let [name1, name2, ...rest] = [
  "Julius",
  "Caesar",
  "Consul",
  "of the Roman Republic",
];

// rest は３つ目の項目からの配列です
console.log(rest[0]); // Consul
console.log(rest[1]); // of the Roman Republic
console.log(rest.length); // 2

// 値がなかった場合に “デフォルト” 値を使いたければ、= を使ってデフォルト値を指定することができます:
// デフォルト値
let [name = "Guest", tao = "Anonymous"] = ["Julius"];

console.log(name); // Julius (配列から)
console.log(tao); // Anonymous (デフォルトが使用されました)

let options = {
  titlea: "Menu",
  width: 100,
  height: 200,
};

let { titlea, width, height } = options;
console.log(titlea);
console.log(width);
console.log(height);

// 順番は関係ありません。これも動作します。:
// let {...} 内のプロパティ順を変えた場合
//  { height, width, title } = { title: "Menu", height: 200, width: 100 };

// 値がない可能性のあるプロパティについては、次のように "=" を使ってデフォルト値を設定できます:
options = {
  title: "Menu",
};

let { widths = 100, heights = 200, titles } = options;

console.log(titles); // Menu
console.log(widths); // 100
console.log(heights); // 200

// 多くのプロパティをもつ複雑なオブジェクトがあったとしても、必要なものだけを抽出することができます:
options = {
  titless: "Menu",
  width: 100,
  height: 200,
};

// title だけ変数として抽出
let { titless } = options;

console.log(title); // Menu

options = {
  titlesss: "Menu",
  width: 100,
  height: 200,
};

// title = title と名前付けられたプロパティ
// rest = オブジェクトのプロパティの残り
let { titlesss, ...rests } = options;
// now title="Menu", rest={height: 200, width: 100}
console.log(rests.height); // 200
console.log(rests.width); // 100

// let mixted = {
//   size: {
//     widthw: 100,
//     heightw: 200,
//   },
//   items: ["Cake", "Donut"],
//   extra: true,
// };

// let {
//   size: {
//     // ここにサイズを格納
//     widthw,
//     heightw,
//   },
//   items: [item1, item2], // ここに items を割り当てる
//   titlew = "Menu", // オブジェクトには存在しない (デフォルト値が使われます)
// } = options;

// console.log(titlew); // Menu
// console.log(widthw); // 100
// console.log(heightw); // 200
// console.log(item1); // Cake
// console.log(item2); // Donut

// *** スマートな関数パラメータ ***
// オブジェクトを関数に渡す
let optionsx = {
  title: "My menu",
  items: ["Item1", "Item2"],
};

// ...そしてすぐに変数に展開します
function showMenu({
  title = "Untitled",
  width = 200,
  height = 100,
  items = [],
}) {
  // title, items – options から取得,
  // width, height – デフォルト値を利用
  console.log(`${title} ${width} ${height}`); // My Menu 200 100
  console.log(items); // Item1, Item2
}

showMenu(optionsx);
// 引数を空にしたい場合
showMenu({}); // OK, すべての値はデフォルト値になります
// showMenu(); // これはエラーになります

// これについては、非構造化対象全体のデフォルト値に {} を指定することで対応することができます:
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert(`${title} ${width} ${height}`);
}

showMenu(); // Menu 100 200
