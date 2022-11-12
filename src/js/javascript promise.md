---
title: javascript promise
isOriginal: true
category:
  - javascript
tag:
  - promise
date: 2021-06-10
---

现有如下代码段，执行输出什么：

```js
Promise.resolve().then(setTimeout(() => {
  console.log(1)
}, 0))

Promise.resolve().then(_ => {
  setTimeout(() => {
    console.log(2)
  }, 0)
})

setTimeout(() => {
  console.log(3)
}, 0)
```

输出： 1 3 2

1. 首先明确， `.then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生值透传（ `value => value` ）
2. `.then` 参数是 `setTimeout` （注意：并不是一个函数），是立即执行的，所以 `console.log(1)` 在下一个宏任务最先执行
3. `console.log(2)` 是在当前宏任务之后的微任务才添加的，所以比 `console.log(3)` 晚。

参考： [JS 异步笔试题，请写出下面代码的运行结果（哔哩哔哩）](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/471#issuecomment-820526940)
