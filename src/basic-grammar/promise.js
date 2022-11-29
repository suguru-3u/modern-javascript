/**
 * 非同期処理
 */

// 非同期の例外処理
try {
  setTimeout(() => {
    throw new Error("非同期的なエラー");
  }, 10);
} catch (error) {
  // 非同期エラーはキャッチできないため、この行は実行されません
}
console.log("この行は実行されます");

// tryブロックはそのブロック内で発生した例外をキャッチする構文です。 しかし、setTimeout関数で登録されたコールバック関数が実際に実行されて例外を投げるのは、すべての同期処理が終わった後となります。 つまり、tryブロックで例外が発生しうるとマークした範囲外で例外が発生します。
// そのため、setTimeout関数のコールバック関数における例外は、次のようにコールバック関数内で同期的なエラーとしてキャッチする必要があります。

// 非同期処理の外
setTimeout(() => {
  // 非同期処理の中
  try {
    throw new Error("エラー");
  } catch (error) {
    console.log("エラーが発生");
  }
}, 10);
console.log("この行は実行されます");

// ** [ES2015] Promise **
// PromiseはES2015で導入された非同期処理の状態や結果を表現するビルトインオブジェクトです。 非同期処理はPromiseのインスタンスを返し、そのPromiseインスタンスには状態変化をした際に呼び出されるコールバック関数を登録できます。

// 次のコードは、Promiseを扱う非同期処理を行う例です。 このコードは、大きく分けて2つの部分からなっています。

// 非同期処理をする部分（asyncPromiseTask関数）: Promiseのインスタンスを返す
// 非同期処理の結果を扱う部分: Promiseのインスタンスを受け取り、成功時の処理と失敗時の処理をコールバック関数で登録する
function asyncPromiseTask() {
  return new Promise((resolve, reject) => {
    // さまざまな非同期処理を行う
    // 非同期処理に成功した場合は、resolveを呼ぶ
    // 非同期処理に失敗した場合は、rejectを呼ぶ
  });
}
// asyncPromiseTask関数の非同期処理が成功した時、失敗した時に呼ばれる処理をコールバック関数として登録する
asyncPromiseTask()
  .then(() => {
    // 非同期処理が成功したときの処理
  })
  .catch(() => {
    // 非同期処理が失敗したときの処理
  });

// Promiseに慣れるまで少しややこしいように見えますが、Promiseは非同期処理の状態や結果をラップしたようなオブジェクトです。

// * Promiseインスタンスの作成 *
// Promiseはnew演算子でPromiseのインスタンスを作成して利用します。 このときのコンストラクタにはresolveとrejectの2つの引数を取るexecutorと呼ばれる関数を渡します。 executor関数の中で非同期処理を行い、非同期処理が成功した場合はresolve関数を呼び、失敗した場合はreject関数を呼び出します。
const executor = (resolve, reject) => {
  // 非同期の処理が成功したときはresolveを呼ぶ
  // 非同期の処理が失敗したときはrejectを呼ぶ
};

const promise2 = new Promise(executor);

// `Promise`インスタンスを作成
const promise = new Promise((resolve, reject) => {
  // 非同期の処理が成功したときはresolve()を呼ぶ
  // 非同期の処理が失敗したときにはreject()を呼ぶ
});
const onFulfilled = () => {
  console.log("resolveされたときに呼ばれる");
};
const onRejected = () => {
  console.log("rejectされたときに呼ばれる");
};
// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
promise.then(onFulfilled, onRejected);

// * 具体例 *
/**
 * 1000ミリ秒未満のランダムなタイミングでレスポンスを疑似的にデータ取得する関数
 * 指定した`path`にデータがある場合、成功として**Resolved**状態のPromiseオブジェクトを返す
 * 指定した`path`にデータがない場合、失敗として**Rejected**状態のPromiseオブジェクトを返す
 */

function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startWith("/success")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("Not Found"));
      }
    }, 1000 * Math.random());
  });
}
// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
// /success/data のリソースは存在するので成功しonFulfilledが呼ばれる
dummyFetch("/success/data").then(
  function onFulfilled(response) {
    console.log(response); // => { body: "Response body of /success/data" }
  },
  function onRejected(error) {
    // リソースが存在しない場合実行される
  }
);

// 成功時の処理だけを登録する場合はthenメソッドの利用を推奨。
// 失敗時の処理だけを登録する場合はcatchメソッドの利用を推奨。

// Promiseではコンストラクタの処理で例外が発生した場合に自動的に例外がキャッチされます。 例外が発生したPromiseインスタンスはreject関数を呼び出したのと同じように失敗したものとして扱われます。 そのため、Promise内で例外が発生するとthenメソッドの第二引数やcatchメソッドで登録したエラー時のコールバック関数が呼び出されます。

// * Promise.resolve *
const fullfilledPromise = Promise.resolve();
// Promise.resolveメソッドはnew Promiseの糖衣構文（シンタックスシュガー）です。 糖衣構文とは、同じ意味の処理を元の構文よりシンプルに書ける別の書き方のことです。 Promise.resolveメソッドは次のコードの糖衣構文です。
// const fulfilledPromise = Promise.resolve(); と同じ意味
const fulfilledPromise = new Promise((resolve) => {
  resolve();
});

// `resolve(42)`された`Promise`インスタンスを作成する
fulfilledPromise.then((value) => {
  console.log(value); // => 42
});

// このコードを実行すると、まずPromiseのコンストラクタ関数が実行され、続いて同期的な処理が実行されます。最後にthenメソッドで登録していたコールバック関数が非同期的に呼ばれることがわかります。
const promise3 = new Promise((resolve) => {
  console.log("1. resolveします");
  resolve();
});
promise3.then(() => {
  console.log("3. コールバック関数が実行されました");
});
console.log("2. 同期的な処理が実行されました");

// Promise.rejectでも上記resoleveと同じことを行うことができる
