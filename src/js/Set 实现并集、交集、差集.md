---
title: Set 实现并集、交集、差集
category:
  - javascript
date: 2021-05-25
---

> 本文转自：[JavaScript Set及其应用 去重，交集，并集，差集](https://www.cnblogs.com/ltfxy/p/13031675.html)

```js
//测试用例
let a = [1, 2, 3, 4, 5]
let b = [3, 4, 5, 6, 7]

//去重
function distinct(arr) {
    return [...new Set(arr)]
}

//并集，讲两个数组分别结构到set的构造种
function merge(arr1, arr2) {
    return new Set([...arr1, ...arr2])
}

//交集
function unite(arr1, arr2) {
    return new Set(arr1.filter(v => arr2.some(v2 => v2 === v)))
}

//差集,某个数组减去交集
function difference(arr1, arr2) {
    let un = merge(arr1, arr2)
    let itsct = unite(arr1, arr2);
    //整体差集
    return new Set([...un].filter(v => !itsct.has(v)))
    //相对差集
    // return new Set(arr1.filter(v => !itsct.has(v)))
}

console.log('distinction is ', distinct([1, 1, 1, 1, 1]))
console.log('merge is ', merge(a, b))
console.log('unite is ', unite(a, b));
console.log('difference is ',difference(a, b));
```
