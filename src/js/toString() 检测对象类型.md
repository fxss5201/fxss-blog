---
title: toString() 检测对象类型
isOriginal: true
category:
  - javascript
date: 2021-06-20
---

可以通过`toString()` 来获取每个对象的类型。为了每个对象都能通过 `Object.prototype.toString()` 来检测，需要以 `Function.prototype.call()` 或者 `Function.prototype.apply()` 的形式来调用，传递要检查的对象作为第一个参数，称为`thisArg`。

```javascript
var toString = Object.prototype.toString;
toString.call(undefined); // "[object Undefined]"
toString.call(null); // "[object Null]"

toString.call(new String); // "[object String]"
toString.call("abc"); // "[object String]"

toString.call(new Number); // "[object Number]"
toString.call(123); // "[object Number]"

toString.call(new Array); // "[object Array]"
toString.call([1,2,3]); // "[object Array]"

toString.call(new Boolean); // "[object Boolean]"
toString.call(true); // "[object Boolean]"

toString.call(new Object); // "[object Object]"
toString.call({a: 1, b: 2});  // "[object Object]"

toString.call(new Function);  // "[object Function]"
toString.call(function(x){ return x * x; });   // "[object Function]"

toString.call(Math); // "[object Math]"
toString.call(new Date); // "[object Date]"
```

下面提供一个获取所有类型的方法：

```javascript
function getType(obj){
    return Object.prototype.toString.call(obj).slice(8, -1);
}

getType(undefined); // "Undefined"
getType(null); // "Null"
getType("abc"); // "String"
getType(123); // "Number"
getType([1,2,3]); // "Array"
getType(true); // "Boolean"
getType({a: 1, b: 2}); // "Object"
getType(function(x){ return x * x; }); // "Function"
getType(Math); // "Math"
getType(new Date); // "Date"
```
