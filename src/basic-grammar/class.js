// *** class ***
class MyClass {
  x;

  //   このように、外から直接読み書きしてほしくないプロパティを_（アンダーバー）から始まる名前にするのはただの習慣である
  _y;

  // クラスフィールド
  z = 0;

  // getter
  get x() {
    return this.x;
  }

  // setter
  set x(x) {
    this.x = x;
  }

  constructor(x, y) {
    // コンストラクタ関数における`this`はインスタンスを示すオブジェクト
    // インスタンスの`x`と`y`プロパティにそれぞれ値を設定する
    // クラスフィールドでの初期化処理が行われ、そのあとconstructorでのプロパティの定義という処理順となります
    this.x = x;
    this.x = y;
    this.z++;
  }

  method() {
    // ここでの`this`はベースオブジェクトを参照
    // 各インスタンスで共有されるプロトタイプメソッドとして定義される
  }
}
const myClass = new MyClass(3, 4);
// クラスのインスタンスかどうかは`instanceof`演算子で判定できる
console.log(myClass instanceof MyClass); // => true
console.log(myClass.x); // => 3
console.log(myClass.method); // ベースオブジェクト
