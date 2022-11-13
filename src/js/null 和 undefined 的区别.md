---
title: null 和 undefined 的区别
category:
  - javascript
date: 2020-06-22
---

本文转自：[null, undefined 和布尔值](https://wangdoc.com/javascript/types/null-undefined-boolean.html)

`null`是一个表示“空”的对象，转为数值时为0；`undefined`是一个表示"此处无定义"的原始值，转为数值时为NaN。

```js
Number(null) // 0
typeof null // "object"

Number(undefined) // NaN
typeof undefined // "undefined"
```
