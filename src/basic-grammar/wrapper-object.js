// *** ラッパーオブジェクト ***

// "input value"の値をラップしたStringのインスタンスを生成
const str = new String("input value");
// StringのインスタンスメソッドであるtoUpperCaseを呼び出す
str.toUpperCase();
// このようにインスタンス化されたものは、プリミティブ型の値を包んだ（ラップした）オブジェクトと言えます。 そのため、このようなオブジェクトをプリミティブ型の値に対してのラッパーオブジェクトと呼びます。
console.log(typeof str); // => "object"

// JavaScriptでは、プリミティブ型の値に対してプロパティアクセスするとき、自動で対応するラッパーオブジェクトに変換される。
const str2 = "string";
// プリミティブ型の値に対してメソッド呼び出しを行う
str.toUpperCase();
// `str`へアクセスする際に"string"がラッパーオブジェクトへ変換され、
// ラッパーオブジェクトはStringのインスタンスなのでメソッドを呼び出せる
// つまり、上のコードは下のコードと同じ意味である
new String(str2).toUpperCase();

const stringWrapper = new String("文字列");
// プリミティブ型の値を取得する
console.log(stringWrapper.valueOf()); // => "文字列"
