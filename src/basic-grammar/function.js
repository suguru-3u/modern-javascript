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
