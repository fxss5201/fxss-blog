---
title: map(parseInt)详解
shortTitle: map(parseInt)详解
isOriginal: true
category:
  - javascript
date: 2020-04-15
---

要明白`[1, 2, 3].map(parseInt)`的执行，首先要清楚`parseInt`可以传几个参数，`parseInt`接受两个参数，`parseInt`函数将其第一个参数转换为字符串，解析它，并返回一个整数或NaN。如果不是NaN，返回的值将是作为指定基数（基数）中的数字的第一个参数的整数。

在基数为`undefined`，或者基数为 0 或者 没有指定 的情况下，JavaScript 作如下处理：

- 如果字符串string以"0x"或者"0X"开头, 则基数是16 (16进制)。
- 如果字符串string以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript5 规定使用10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出radix参数的值。
- 如果字符串string以其它任何值开头，则基数是10 (十进制)。

数组的`map`函数有两个参数，`callback`、`thisArg`，`callback`有3个参数`element`/`index`/`array`，在本例中此时的`callback`就是`parseInt`，`parseInt`接受两个参数（也就是说`callback`的前两个参数），所以`[1, 2, 3].map(parseInt)`实际执行过程如下：

``` javascript
parseInt(1, 0); // 在基数为0的时候，如果字符串string以其它任何值开头，则基数是10，所以返回 1
parseInt(2, 1); // 2不属于基数1中的字符，所以返回 NaN
parseInt(3, 2); // 3不属于基数2中的字符，所以返回 NaN
```

`map()`方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

所以最终返回结果是`[1, NaN, NaN]`。
