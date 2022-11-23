// *** 関数とthis ***
// thisの参照先は主に次の条件によって変化します。

// 実行コンテキストにおけるthis
// コンストラクタにおけるthis
// 関数とメソッドにおけるthis
// Arrow Functionにおけるthis

// スクリプトにおけるthis
<script>

console.log(this) // => window
</script>

// モジュールにおけるthis
<script type="module">

console.log(this); // => undefined
</script>

// 単純にグローバルオブジェクトを参照したい場合は、globalThisを使用する
// ブラウザでは`window`オブジェクト、Node.jsでは`global`オブジェクトを参照する
console.log(globalThis);

// Arrow Function以外の関数におけるthis

// Arrow Function以外の関数（メソッドも含む）におけるthisは、実行時に決まる値となります。 言い方を変えるとthisは関数に渡される暗黙的な引数のようなもので、その渡される値は関数を実行するときに決まります。
// 疑似的な`this`の値の仕組み
// 関数は引数として暗黙的に`this`の値を受け取るイメージ
function fn(暗黙的に渡されるthisの値, 仮引数) {
    console.log(this); // => 暗黙的に渡されるthisの値
}
// 暗黙的に`this`の値を引数として渡しているイメージ
fn(暗黙的に渡すthisの値, 引数);

// 関数におけるthisの基本的な参照先（暗黙的に関数に渡すthisの値）はベースオブジェクトとなります。 ベースオブジェクトとは「メソッドを呼ぶ際に、そのメソッドのドット演算子またはブラケット演算子のひとつ左にあるオブジェクト」のことを言います。 ベースオブジェクトがない場合のthisはundefinedとなります。
// `fn`関数はメソッドではないのでベースオブジェクトはない
fn();
// `obj.method`メソッドのベースオブジェクトは`obj`
obj.method();
// `obj1.obj2.method`メソッドのベースオブジェクトは`obj2`
// ドット演算子、ブラケット演算子どちらも結果は同じ
obj1.obj2.method();
obj1["obj2"]["method"]();

// 例
const person = {
    fullName:"Brendan Eich",
    sayName:function(){
        return this.fullName;
    }
};

// `person.fullName`を出力する
console.log(person.sayName()); // => "Brendan Eich"

// thisが問題となるパターン
// 問題: thisを含むメソッドを変数に代入した場合
// `person.sayName`を`say`変数に代入する
const say = person.sayName;
// 代入したメソッドを関数として呼ぶ
// この`say`関数はどのオブジェクトにも所属していない
// `this`はundefinedとなるため例外を投げる
say(); // => TypeError: Cannot read property 'fullName' of undefined
// このように、Arrow Function以外の関数において、thisは定義したときではなく実行したときに決定されます。

// 対処法: call、apply、bindメソッド
// この問題の対処法としては大きく分けて2つあります。

// 1つはメソッドとして定義されている関数はメソッドとして呼ぶということです。 メソッドをわざわざただの関数として呼ばなければそもそもこの問題は発生しません。

// もう1つは、thisの値を指定して関数を呼べるメソッドで関数を実行する方法です。

// 関数やメソッドのthisを明示的に指定して関数を実行する方法もあります。

function say(message){
    return `${message} ${this.name}`
}
const person2 = {
    name:"tomoya"
}

// `this`を`person`にして`say`関数を呼びだす
console.log(say.call(person2, "こんにちは")); // => "こんにちは tomoya！"
// `say`関数をそのまま呼び出すと`this`は`undefined`となるため例外が発生
say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined

// callとは異なり引数を配列として渡す
console.log(say.apply(person, ["こんにちは"])); // => "こんにちは Brendan Eich！"
// `say`関数をそのまま呼び出すと`this`は`undefined`となるため例外が発生
say("こんにちは"); // => TypeError: Cannot read property 'fullName' of undefined

// callメソッドとapplyメソッドの違いは、関数の引数への値の渡し方が異なるだけです。 また、どちらのメソッドもthisの値が不要な場合はnullを渡すのが一般的です。

// `this`を`person`に束縛した`say`関数をラップした関数を作る
const sayPerson = say.bind(person, "こんにちは");
console.log(sayPerson()); // => "こんにちは Brendan Eich！"

// 問題: コールバック関数とthis

// strict modeを明示しているのは、thisがグローバルオブジェクトに暗黙的に変換されるのを防止するため
const Prefixer = {
    prefix: "pre",
    /**
     * `strings`配列の各要素にprefixをつける
     */
    prefixArray(strings) {
        return strings.map(function(str) {
            // コールバック関数における`this`は`undefined`となる(strict mode)
            // そのため`this.prefix`は`undefined.prefix`となり例外が発生する
            return this.prefix + "-" + str;
        });
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
Prefixer.prefixArray(["a", "b", "c"]); // => TypeError: Cannot read property 'prefix' of undefined

// 対処法: thisを一時変数へ代入する
const Prefixer2 = {
    prefix: "pre",
    prefixArray(strings) {
        // `that`は`prefixArray`メソッド呼び出しにおける`this`となる
        // つまり`that`は`Prefixer`オブジェクトを参照する
        const that = this;
        return strings.map(function(str) {
            // `this`ではなく`that`を参照する
            return that.prefix + "-" + str;
        });
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
const prefixedStrings = Prefixer2.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]

const Prefixer3 = {
    prefix: "pre",
    prefixArray(strings) {
        // Arrayの`map`メソッドは第二引数に`this`となる値を渡せる
        return strings.map(function(str) {
            // `this`が第二引数の値と同じになる
            // つまり`prefixArray`メソッドと同じ`this`となる
            return this.prefix + "-" + str;
        }, this);
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
const prefixedStrings2 = Prefixer3.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]

// しかし、これらの解決方法はコールバック関数においてthisが変わることを意識して書く必要があります。 そもそもメソッド呼び出しとその中でのコールバック関数におけるthisが変わってしまうのが問題でした。 ES2015ではthisを変えずにコールバック関数を定義する方法として、Arrow Functionが導入されました。

// 対処法: Arrow Functionでコールバック関数を扱う

// 通常の関数やメソッドは呼び出し時に暗黙的にthisの値を受け取り、関数内のthisはその値を参照します。 一方、Arrow Functionはこの暗黙的なthisの値を受け取りません。 そのためArrow Function内のthisは、スコープチェーンの仕組みと同様に外側の関数（この場合はprefixArrayメソッド）を探索します。 これにより、Arrow Functionで定義したコールバック関数は呼び出し方には関係なく、常に外側の関数のthisをそのまま利用します。
const Prefixer4 ={
    prefix:"pre",
    prefixArray(strings){
        return strings.map((str)=>{
            // Arrow Function自体は`this`を持たない
            // `this`は外側の`prefixArray`関数が持つ`this`を参照する
            // そのため`this.prefix`は"pre"となる
            return this.prefix + "-" + str;
        });
    }
};

// このとき、`prefixArray`のベースオブジェクトは`Prefixer`となる
// つまり、`prefixArray`メソッド内の`this`は`Prefixer`を参照する
const prefixedStrings3 = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings3); // => ["pre-a", "pre-b", "pre-c"]

// Arrow Functionとthis
// Arrow Functionで定義した関数
const fn = () => {
    // この関数の外側には関数は存在しない
    // トップレベルの`this`と同じ値
    return this;
};
console.log(fn() === this); // => true

// トップレベルに書かれたthisの値は実行コンテキストによって異なることを紹介しました。 thisの値は、実行コンテキストが"Script"ならばグローバルオブジェクトとなり、"Module"ならばundefinedとなります。


const obj = {
    method() {
        const arrowFunction = () => {
            return this;
        };
        return arrowFunction();
    }
};
// 通常の`this`は`obj.method`の`this`と同じ
console.log(obj.method()); // => obj
// `obj.method`の`this`を変更すれば、Arrow Functionの`this`も変更される
console.log(obj.method.call("THAT")); // => "THAT"

// ES2015の仕様編集者であるAllen Wirfs-Brock氏もただの関数においてはthisを使うべきではないと述べている。