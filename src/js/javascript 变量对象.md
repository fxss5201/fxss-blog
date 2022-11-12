---
title: javascript 变量对象
isOriginal: true
category:
  - javascript
date: 2021-06-10
---

现有下面一段代码，考虑输出什么：

```js
console.log(a)

function a () {
  console.log(1)
}
var a = 1

var a = function(){
  console.log(2)
}

console.log(a)
```

第一处 `console.log(a)` 打印的是：

```js
ƒ a () {
  console.log(1)
}
```

第二处 `console.log(a)` 打印的是：

```js
ƒ (){
  console.log(2)
}
```

原因请查看 [JavaScript深入之执行上下文栈和变量对象](https://github.com/yygmind/blog/issues/13)
