---
title: call 、apply 和 bind 的模拟实现
shortTitle: call/apply/bind
isOriginal: true
category:
  - javascript
tag:
  - call
  - apply
  - bind
date: 2021-10-23
---

## `call`

```js
Function.prototype.myCall = function(context = window, ...args) {
  if (this === Function.prototype) {
    return undefined  // 用于防止 Function.prototype.myCall() 直接调用
  }
  context = context || window // 用于防止传入 null
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
```

验证：

```js
let person = {
  name: 'fxss',
  age: 26,
  introduce: function(...args) {
    return `My name is ${this.name}, I'm ${this.age}${args.length ? `, I like ${args.join('/')}` : ''}.`
  }
}
let persom1 = {
  name: 'fxss1',
  age: 27,
}

var name = 'fxss2'
var age = '28'
let name1 = 'fxss3'
let age1 = '29'
console.log(window.name)
console.log(window.name1)

function introduce (...args) {
  return `My name is ${this.name}, I'm ${this.age}${args.length ? `, I like ${args.join('/')}` : ''}.`
}

console.log('person.introduce()', person.introduce())
console.log('introduce()', introduce())
console.log("person.introduce.call(persom1, 'reading', 'eat')", person.introduce.call(persom1, 'reading', 'eat'))
console.log("person.introduce.myCall(persom1, 'reading', 'eat')", person.introduce.myCall(persom1, 'reading', 'eat'))
console.log("introduce.call(null, 'reading', 'eat')", introduce.call(null, 'reading', 'eat'))
console.log("introduce.myCall(null, 'reading', 'eat')", introduce.myCall(null, 'reading', 'eat'))
console.log("introduce.call(undefined, 'reading', 'eat')", introduce.call(undefined, 'reading', 'eat'))
console.log("introduce.myCall(undefined, 'reading', 'eat')", introduce.myCall(undefined, 'reading', 'eat'))

```

## `apply`

```js
Function.prototype.myApply = function(context = window, args) {
  if (this === Function.prototype) {
    return undefined  // 用于防止 Function.prototype.myApply() 直接调用
  }
  context = context || window // 用于防止传入 null
  const fn = Symbol()
  context[fn] = this
  let result;
  if (Array.isArray(args)) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  delete context[fn]
  return result
}
```

验证：

```js
let person = {
  name: 'fxss',
  age: 26,
  introduce: function(...args) {
    return `My name is ${this.name}, I'm ${this.age}${args.length ? `, I like ${args.join('/')}` : ''}.`
  }
}
let persom1 = {
  name: 'fxss1',
  age: 27,
}

var name = 'fxss2'
var age = '28'
let name1 = 'fxss3'
let age1 = '29'
console.log(window.name)
console.log(window.name1)

function introduce (...args) {
  return `My name is ${this.name}, I'm ${this.age}${args.length ? `, I like ${args.join('/')}` : ''}.`
}

console.log('person.introduce()', person.introduce())
console.log('introduce()', introduce())
console.log("person.introduce.apply(persom1, ['reading', 'eat'])", person.introduce.apply(persom1, ['reading', 'eat']))
console.log("person.introduce.myApply(persom1, ['reading', 'eat'])", person.introduce.myApply(persom1, ['reading', 'eat']))
console.log("introduce.apply(null, ['reading', 'eat'])", introduce.apply(null, ['reading', 'eat']))
console.log("introduce.myApply(null, ['reading', 'eat'])", introduce.myApply(null, ['reading', 'eat']))
console.log("introduce.apply(undefined, ['reading', 'eat'])", introduce.apply(undefined, ['reading', 'eat']))
console.log("introduce.myApply(undefined, ['reading', 'eat'])", introduce.myApply(undefined, ['reading', 'eat']))
```

## `bind`

```js
Function.prototype.myBind = function(context, ...args) {
  if (this === Function.prototype) {
    throw new TypeError('Error')
  }
  const _this = this
  return function F(...args2) {
    if (this instanceof F) {
      return new _this(...args, ...args2)
    }
    return _this.bind(context, args.concat(args2))
  }
}
```

> 文中部分代码段引用自 <https://github.com/ConardLi/awesome-coding-js/blob/master/JavaScript/%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0call%E3%80%81apply%E3%80%81bind.md>
