// *** 文字列とUnicode ***

// JavaScriptは文字コードとしてUnicodeを採用し、エンコード方式としてUTF-16を採用しています。
// このUTF-16を採用しているのは、あくまでJavaScriptの内部で文字列を扱う際の文字コード（内部コード）です。 そのため、コードを書いたファイル自体の文字コード（外部コード）は、UTF-8のようにUTF-16以外の文字コードであっても問題ありません。
//  しかし、JavaScriptのStringオブジェクトにはこの文字コード（Unicode）に特化したAPIもあります。 また、絵文字を含む特定の文字を扱う際や「文字数」を数えるという場合には、内部コードであるUTF-16を意識しないといけない場面があります。

// * Code Point *
// Code PointとCode Unitの違い
/**
 * Code Point(符号位置)は、その文字のID、文章にすると..「この文字のIDはXXXです」
 * Code Unit(符号単位)は、文字列の構成要素の最小単位
 * 文章にすると..「JavaScriptの内部的に、この文字列はCode Unit2つで構成されている」
 * JavaScriptが内部的に採用しているUTF-16では1Code Unitでは65536種類しか表現できない。
 * 65537種類目以降を表現する場合、サロゲートペアという仕組みを用いて文字列を表現する。
 */

// 文字列"あ"のCode Pointを取得
console.log("あ".codePointAt(0)); // => 12354
// Code Pointが`12354`の文字を取得する
console.log(String.fromCodePoint(12354)); // => あ

// 文字列をCode Unit(16進数)の配列にして返す
function convertCodeunits(str) {
  const codeUnits = [];
  for (let i = 0; i < str.length; i++) {
    codeUnits.push(str.charCodeAt(i).toString(16));
  }
  return codeUnits;
}

// 文字列をCode Point(16進数)の配列にして返す
function convertCodePoints(str) {
  return Array.from(str).map((char) => {
    return char.codePointAt(0).toString(16);
  });
}

const str = "アオイ";
const codeUnits = convertCodeUnits(str);
console.log(codeUnits); // => ["30a2", "30aa", "30a4"]
const codePoints = convertCodePoints(str);
console.log(codePoints); // => ["30a2", "30aa", "30a4"]

const str2 = "リンゴ🍎";
const codeUnits2 = convertCodeUnits(str);
console.log(codeUnits2); // => ["30ea", "30f3", "30b4", "d83c", "df4e"]
const codePoints2 = convertCodePoints(str);
console.log(codePoints2); // => ["30ea", "30f3", "30b4", "1f34e"]
// UTF-16では2つCode Unitの組み合わせ（合計4バイト）で1つの文字（1つのCode Point）を表現することがある。

// * サロゲートペア *
/*
 * サロゲートペアでは、2つのCode Unitの組み合わせ（合計4バイト）で1つの文字（1つのCode Point）を表現します。UTF-16では、次の範囲をサロゲートペアに利用する領域としています。
 * \uD800～\uDBFF：上位サロゲートの範囲
 * \uDC00～\uDFFF：下位サロゲートの範囲
 * 文字列中に上位サロゲートと下位サロゲートのCode Unitが並んだ場合に、2つのCode Unitを組み合わせて1文字（Code Point）として扱います。
 */

// 上位サロゲート + 下位サロゲートの組み合わせ
console.log("\uD867\uDE3D"); // => "𩸽"
// Code Pointでの表現
console.log("\u{29e3d}"); // => "𩸽"

// このようにサロゲートペアでは、2つのCode Unitで1つのCode Pointを表現します。
// 基本的には、文字列はCode Unitが順番に並んでいるものとして扱われるため、多くのStringのメソッドはCode Unitごとに作用します。 また、インデックスアクセスもCode Unitごととなります。そのため、サロゲートペアで表現している文字列では、上位サロゲート（0番目）と下位サロゲート（1番目）へのインデックスアクセスになります。
// 内部的にはCode Unitが並んでいるものとして扱われている
console.log("\uD867\uDE3D"); // => "𩸽"
// インデックスアクセスもCode Unitごととなる
console.log("𩸽"[0]); // => "\uD867"
console.log("𩸽"[1]); // => "\uDE3D"

// 絵文字や「𩸽（ほっけ）」などのサロゲートペアで表現される文字が文字列中に含まれると、Code Unitごとに扱う文字列処理は複雑になります。
// たとえば、Stringのlengthプロパティは文字列におけるCode Unitの要素数を数えるため、"🍎".lengthの結果は2となります。
console.log("🍎".length); // => 2

// このような場合には、文字列をCode Pointごとに処理することを考える必要があります。

// * Code Pointを扱う *
// ES2015では、正規表現にu（Unicode）フラグが追加されました。 このuフラグをつけた正規表現は、文字列をCode Pointが順番に並んだものとして扱います。

const [all, fish] = "𩸽のひらき".match(/(.)のひらき/);
console.log(all); // => "\ude3dのひらき"
console.log(fish); // => "\ude3d"

// つまり、uフラグをつけていない正規表現は、文字列をCode Unitが順番に並んだものとして扱っています。

// このような意図しない結果を避けるには、正規表現にuフラグをつけます。 uフラグがついた正規表現は、文字列をCode Pointごとに扱います。 そのため、任意の1文字にマッチする.が𩸽という文字（Code Point）にマッチします。
const [all2, fish2] = "𩸽のひらき".match(/(.)のひらき/u);
console.log(all2); // => "𩸽のひらき"
console.log(fish2); // => "𩸽"

// Stringのlengthプロパティは、文字列を構成するCode Unitの個数を表すプロパティです。 そのためサロゲートペアを含む文字列では、lengthの結果が見た目より大きな値となる場合があります。
// Code Unitの個数を返す
console.log("🍎".length); // => 2
console.log("\uD83C\uDF4E"); // => "🍎"
console.log("\uD83C\uDF4E".length); // => 2

// JavaScriptには、文字列におけるCode Pointの個数を数えるメソッドは用意されていません。 これを行うには、文字列をCode Pointごとに区切った配列へ変換して、配列の長さを数えるのが簡潔です。
// Array.fromメソッド[ES2015]は、引数にiterableなオブジェクトを受け取り、それを元にした新しい配列を返します。 iterableオブジェクトとはSymbol.iteratorという特別な名前のメソッドを実装したオブジェクトの総称で、for...of文などで反復処理が可能なオブジェクトです（
// Code Pointごとの配列にする
// Array.fromメソッドはIteratorを配列にする
const codePoints3 = Array.from("リンゴ🍎");
console.log(codePoints3); // => ["リ", "ン", "ゴ", "🍎"]
// Code Pointの個数を数える
console.log(codePoints3.length); // => 4

// しかし、Code Pointの数を数えた場合でも、直感的な結果にならない場合もあります。 なぜなら、Code Pointには制御文字などの視覚的に見えないものも定義されているためです。 そのため、文字として数えたくないものは無視するなど、視覚的な文字列の長さを数えるにはさらなる工夫が必要になります。

// 指定した`codePoint`の個数を数える
// 先ほど紹介したArray.fromメソッドを使えば、文字列をCode Pointで区切った文字の配列へと変換できます。 配列にすれば、あとは「ループと反復処理」の章で学んだ方法を使って、Code Pointごとに反復処理ができます。
function countOfCodePoints(str, codePoint) {
  return Array.from(str).filter((item) => {
    return item === codePoint;
  }).length;
}
console.log(countOfCodePoints("🍎🍇🍎🥕🍒", "🍎")); // => 2
