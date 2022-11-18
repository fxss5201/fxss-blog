---
title: slice.js
isOriginal: true
category:
  - javascript
tag:
  - lodash
date: 2021-06-25
---

文档地址：[`_.slice(array, [start=0], [end=array.length])`](https://www.lodashjs.com/docs/lodash.slice)

源码实现：

```javascript
function slice(array, start, end) {
  // array == null 包含 array = undefined 和 array = null 的两种情况
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  // 当 start = undefined 或 null 时，为 0
  // 为 undefined 代表未传
  // 至于 null ，可以查看
  // var a = [1, 2, 3]
  // a.slice(null) // [1, 2, 3]
  // slice(a, null) // [1, 2, 3]
  start = start == null ? 0 : start
  // end === undefined 仅当 end 不传的时候为 length
  // 至于为什么此处用 === ，可查看
  // var a = [1, 2, 3]
  // a.slice(1, null) // []
  // slice(a, 1, null) // []
  end = end === undefined ? length : end

  if (start < 0) {
    // var a = [1, 2, 3]
    // a.slice(-5) // [1, 2, 3]
    start = -start > length ? 0 : (length + start)
  }
  // var a = [1, 2, 3]
  // a.slice(0, 10) // [1, 2, 3]
  end = end > length ? length : end
  // var a = [1, 2, 3]
  // a.slice(0, -1) // [1, 2]
  if (end < 0) {
    end += length
  }
  // var a = [1, 2, 3]
  // a.slice(2, 1) // []
  // >>> 运算: http://c.biancheng.net/view/5471.html
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

export default slice
```
