---
title: 使用 js 实现 栈
shortTitle: 使用 js 实现 栈
isOriginal: true
category:
  - javascript
date: 2022-02-01
---

栈是一种特殊的列表，栈内的元素只能通过栈顶访问，栈是一种后入先出的数据结构。

## 参数

接收的参数为数组类型。

## 属性及方法

栈的抽象数据类型定义

| 列表 | 属性或方法 | 描述 |
|----|----|----|
| top | 属性 | 记录栈顶元素的位置，同时也为了标记哪里可以加入新元素，当向栈内压入元素时，top 增大，从栈内弹出元素时，top 减小 |
| push | 方法 | 向栈内压入元素 |
| pop | 方法 | 从栈内弹出元素 |
| peek | 方法 | 返回栈顶元素，该元素依然存在栈内 |
| toString | 方法 | 返回栈的字符串形式 |
| clear | 方法 | 清空栈 |
| length | 方法 | 返回栈内元素的个数 |

下面看下代码实现：

```js
// ES5
function stack(data = []) {
  this.dataStore = data
  this.top = data.length
  this.push = push
  this.pop = pop
  this.peek = peek
  this.toString = toString
  this.clear = clear
  this.length = length
}

function push(element) {
  this.dataStore.push(element)
  this.top++
}

function pop() {
  this.top--
  return this.dataStore.pop()
}

function peek() {
  return this.top > 0 ? this.dataStore[this.top - 1] : undefined
}

function toString() {
  return this.dataStore.join()
}

function clear() {
  this.top = 0
  this.dataStore = []
}

function length() {
  return this.top
}

// ES6
class stack6 {
  constructor(data = []) {
    this.top = data.length
    this.dataStore = data
  }

  push(element) {
    this.dataStore.push(element)
    this.top++
  }
  
  pop() {
    this.top--
    return this.dataStore.pop()
  }
  
  peek() {
    return this.top > 0 ? this.dataStore[this.top - 1] : undefined
  }
  
  toString() {
    return this.dataStore.join()
  }
  
  clear() {
    this.top = 0
    this.dataStore = []
  }
  
  length() {
    return this.top
  }
}
```

## 栈 的简单使用

### 数字的进制转换

将数字转化为二至九进制的数字：

1. 第一位为 `num % base`，将次值压入栈
2. 将 `Math.floor(num / base)` 赋值给 `num`
3. 重复步骤1和2，直到 `num === 0` 且没有余数
4. 将栈内的元素依次弹出，拼接位字符串

```js
/**
 * 将数字转化为二至九进制的数字
 * @param {Number} num 是需要转化的数字
 * @param {Number} base 是要转化为几进制
*/
function mulBase(num, base) {
  const stackEg = new stack()
  do {
    stackEg.push(num % base)
    num = Math.floor(num / base)
  } while (num > 0)
  let converted = ''
  while (stackEg.length() > 0) {
    converted += stackEg.pop()
  }
  return converted
}
console.log(mulBase(8, 2))
console.log(parseInt(1000, 2))
```

将二至九进制的数字转化为十进制数字：

1. 将 `num` 转换为字符串，再转换为数组，将其倒序，依次压入栈
2. 依次执行 拿到栈顶元素 * （基数的对应栈top次方）

```js
/**
 * 将二至九进制的数字转化为十进制数字
 * @param {Number} num 是需要转化的数字
 * @param {Number} base 是要转化为几进制
*/
function basemul(num, base) {
  const stackEg = new stack(String(num).split('').reverse())
  let res = 0
  while (stackEg.length() > 0) {
    res += stackEg.pop() * Math.pow(base, stackEg.top)
  }
  return res
}
console.log(basemul(1000, 2))
```

### 回文

回文 简单来说就是 字符串 === 字符串顺序反转 ，使用栈实现：

1. 将字符串每一位依次压入栈
2. 将栈的元素依次弹出，拼接成字符串
3. 判断 拼接的字符串是否等于原字符串

```js
/**
 * 是否为回文
 * @param {String} word 是需要判断的字符串
*/
function isPalindrome(word) {
  const stackEg = new stack(word.split(''))
  let rword = ''
  while (stackEg.length() > 0) {
    rword += stackEg.pop()
  }
  return rword === word
}
function isPalindrome2(word) {
  return word.split('').reverse().join('') === word
}
```
