---
title: 使用 js 实现 队列
shortTitle: 使用 js 实现 队列
isOriginal: true
category:
  - javascript
date: 2022-02-02
---

队列是一种特殊的列表，队列只能在队尾插入元素，在队首删除元素。队列用于存储按顺序排列的数据，先进先出。

## 参数

接收的参数为数组类型。

## 属性及方法

栈的抽象数据类型定义

| 列表 | 属性或方法 | 描述 |
|----|----|----|
| enqueue | 方法 | 向队尾加入一个元素 |
| dequeue | 方法 | 删除队首的元素 |
| front | 方法 | 读取队首元素 |
| back | 方法 | 读取队尾元素 |
| toString | 方法 | 返回队列的字符串形式 |
| clear | 方法 | 清空队列 |
| length | 方法 | 返回队列内元素的个数 |
| empty | 方法 | 队列是否为空 |

下面看下代码实现：

```js
/**
 * 简单队列
 */
// ES5
function Queue(data = []) {
  this.dataStore = data
  this.enqueue = enqueue
  this.dequeue = dequeue
  this.front = front
  this.back = back
  this.toString = toString
  this.clear = clear
  this.length = length
  this.empty = empty
}

function enqueue(element) {
  this.dataStore.push(element)
}

function dequeue() {
  return this.dataStore.shift()
}

function front() {
  return this.dataStore[0]
}

function back() {
  return this.dataStore[this.length() - 1]
}

function toString() {
  return this.dataStore.join()
}

function clear() {
  this.dataStore = []
}

function length() {
  return this.dataStore.length
}

function empty() {
  return !this.dataStore.length
}

// ES6
class Queue6 {
  constructor(data = []) {
    this.dataStore = data
  }

  enqueue(element) {
    this.dataStore.push(element)
  }

  dequeue() {
    return this.dataStore.shift()
  }

  front() {
    return this.dataStore[0]
  }

  back() {
    return this.dataStore[this.length() - 1]
  }

  toString() {
    return this.dataStore.join()
  }

  clear() {
    this.dataStore = []
  }

  length() {
    return this.dataStore.length
  }

  empty() {
    return !this.dataStore.length
  }
}
```

队列演示示例可查看 [例子](https://github.com/fxss5201/utils/blob/main/test/queue.html) 。

## 优先队列

在某些情况下，队列需要按照优先级进行排序、出队列，这个时候需要在入队列的时候按照一定的优先级规律进行排序，实现如下：

```js
/**
 * 带优先级的队列，代码中使用 code 表示，数值越大，优先级越高，默认优先级为 0
 * 优先级越高，提前出队列，优先级相同，则按照入队列的顺序出队列
 * 例如 医院 挂号，病重的会优先
 */
// ES6
class Element {
  constructor(name, code = 0) {
    this.name = name
    this.code = code
  }
}

class QueueComplex {
  constructor() {
    this.dataStore = []
  }

  enqueue(element) {
    const dataStore = this.dataStore
    let entry = dataStore.length
    for (let i = dataStore.length - 1; i >= 0; i--) {
      if (i - 1 >= 0) {
        if (element.code > dataStore[i].code && element.code <= dataStore[i - 1].code) {
          entry = i
        }
      } else {
        if (element.code > dataStore[i].code) {
          entry = i
        }
      }
    }
    this.dataStore.splice(entry, 0, element)
  }

  dequeue() {
    return this.dataStore.shift()
  }

  front() {
    return this.dataStore[0]
  }

  back() {
    return this.dataStore[this.length() - 1]
  }

  toString() {
    const dataStore = this.dataStore
    let res = ''
    for (let i = 0, len = dataStore.length; i < len; i++) {
      res += `{ name: ${dataStore[i].name}, code: ${dataStore[i].code} }`
    }
    return res
  }

  clear() {
    this.dataStore = []
  }

  length() {
    return this.dataStore.length
  }

  empty() {
    return !this.dataStore.length
  }
}
```

优先队列演示示例可查看 [例子](https://github.com/fxss5201/utils/blob/main/test/queue.html) 。
