---
title: 使用 js 实现 链表
shortTitle: 使用 js 实现 链表
isOriginal: true
category:
  - javascript
date: 2022-02-04
---

链表是由一组节点组成的集合。

## 单向链表

每个节点都使用一个对象的引用指向它的后驱，指向另一个节点的引用叫做链。在链表的最前面有一个特殊节点，叫做头节点。

### 单向链表插入

向链表中插入一个节点，需要修改它前面节点（前驱）的链，使其指向新加入的节点，新加入的节点的链指向原来前驱指向的节点。

### 单向链表删除

从链表中删除一个节点，将待删除节点的前驱节点的链指向待删除节点的后驱节点，同时将待删除节点的链指向 `null` 。

### 单向链表属性及方法

| 列表 | 属性或方法 | 描述 |
|----|----|----|
| find | 方法 | `find(item)` 从链表头节点向后查找某个节点，查找到节点则返回对应节点，查找不到则返回 `null` |
| findPrev | 方法 | `findPrev(item)` 从链表头节点向后查找某个节点的后驱为 `item`，查找到节点则返回对应节点，查找不到则返回 `null` |
| insert | 方法 | `insert(newElement, item)` 向链表中的 `item` 节点之后插入 `newElement` 节点，成功返回 `true` ，失败返回 `false` |
| remove | 方法 | `remove(item)` 从链表中删除 `item` 节点，成功返回 `true` ，失败返回 `false` |
| display | 方法 | 返回链表中所有节点 `element` 属性组成的数组 |
| displayString | 方法 | 返回链表中所有节点 `element` 属性组成的字符串，以 `,` 分隔 |
| length | 方法 | 返回链表中节点个数 |
| show | 方法 | 返回链表中按顺序第 `pos` 个节点，从 0 开始 |
| advance | 方法 | `advance(number)` 按照链表顺序，继续向后移动 number 个节点，最多移动到链表最后一个节点 |
| back | 方法 | `back(number)` 按照链表顺序，反方向向前移动 number 个节点，最多移动到链表的第一个节点（非链表的头节点） |

### 单向链表代码实现

```js
class oneWayNode {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

/**
 * 单向链表
 */

class oneWayLList {
  constructor() {
    this.head = new oneWayNode('head')
    this.pos = 0
  }

  find(item) {
    let currNode = this.head
    while (currNode && currNode.element !== item) {
      currNode = currNode.next
    }
    return (currNode && currNode.element === item) ? currNode : null
  }

  findPrev(item) {
    let currNode = this.head
    while (currNode.next !== null && currNode.next.element !== item) {
      currNode = currNode.next
    }
    return (currNode && currNode.next && currNode.next.element === item) ? currNode : null
  }

  insert(newElement, item) {
    const newNode = new oneWayNode(newElement)
    const currNode = this.find(item)
    if (currNode) {
      newNode.next = currNode.next
      currNode.next = newNode
      return true
    } else {
      return false
    }
  }

  remove(item) {
    const prevNode = this.findPrev(item)
    const currNode = this.find(item)
    if (prevNode && currNode) {
      prevNode.next = currNode.next
      currNode.next = null
      return true
    } else {
      return false
    }
  }

  display() {
    let currNode = this.head
    let res = []
    while (currNode.next !== null) {
      res.push(currNode.next.element)
      currNode = currNode.next
    }
    return res
  }

  displayString() {
    return this.display().join()
  }

  length() {
    return this.display().length
  }

  show() {
    let currNode = this.head.next
    let num = this.pos
    while (num > 0) {
      currNode = currNode.next
      num--
    }
    return currNode
  }

  advance(number) {
    this.pos += number
    let length = this.length() - 1
    if (this.pos > length) {
      this.pos = length
    }
    return this.show()
  }
  
  back(number) {
    this.pos -= number
    if (this.pos < 0) {
      this.pos = 0
    }
    return this.show()
  }
}
```

## 双向链表

每个节点都使用 `next` 指向它的后驱，使用 `prev` 指向它的前驱。在链表的最前面有一个特殊节点，叫做头节点。

### 双向链表插入

向链表中插入一个节点，需要将新节点的后驱指向当前节点的后驱，新节点的前驱指向当前节点，当前节点的后驱指向新节点。

### 双向链表删除

从链表中删除一个节点，将待删除节点的前驱的后链指向待删除节点的后驱，将待删除节点的后驱的前链指向当前节点的前驱，待删除节点的前链及后链指向 `null` 。

### 双向链表属性及方法

| 列表 | 属性或方法 | 描述 |
|----|----|----|
| find | 方法 | `find(item)` 从链表头节点向后查找某个节点，查找到节点则返回对应节点，查找不到则返回 `null` |
| findLast | 方法 | `findLast()` 从链表头节点向后查找最后一个节点 |
| findRight | 方法 | `findRight(item)` 从链表最后一个节点向前查找某个节点，查找到节点则返回对应节点，查找不到则返回 `null` |
| insert | 方法 | `insert(newElement, item)` 向链表中的 `item` 节点之后插入 `newElement` 节点，成功返回 `true` ，失败返回 `false` |
| remove | 方法 | `remove(item)` 从链表中删除 `item` 节点，成功返回 `true` ，失败返回 `false` |
| display | 方法 | 返回链表中所有节点 `element` 属性组成的数组 |
| displayString | 方法 | 返回链表中所有节点 `element` 属性组成的字符串，以 `,` 分隔 |
| displayRight | 方法 | 从链表最后一个节点向前返回链表中所有节点 `element` 属性组成的数组 |
| displayRightString | 方法 | 从链表最后一个节点向前返回链表中所有节点 `element` 属性组成的字符串，以 `,` 分隔 |
| length | 方法 | 返回链表中节点个数 |
| show | 方法 | 返回链表中按顺序第 `pos` 个节点，从 0 开始 |
| advance | 方法 | `advance(number)` 按照链表顺序，继续向后移动 number 个节点，最多移动到链表最后一个节点 |
| back | 方法 | `back(number)` 按照链表顺序，反方向向前移动 number 个节点，最多移动到链表的第一个节点（非链表的头节点） |

### 双向链表代码实现

```js
class twoWayNode {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}

/**
 * 双向链表
 */

class twoWayLList {
  constructor() {
    this.head = new twoWayNode('head')
    this.pos = 0
  }

  find(item) {
    let currNode = this.head
    while (currNode && currNode.element !== item) {
      currNode = currNode.next
    }
    return (currNode && currNode.element === item) ? currNode : null
  }

  findLast() {
    let currNode = this.head
    while (currNode && currNode.next !== null) {
      currNode = currNode.next
    }
    return currNode
  }

  findRight(item) {
    let currNode = this.findLast()
    while (currNode && currNode.element !== item) {
      currNode = currNode.prev
    }
    return (currNode && currNode.element === item) ? currNode : null
  }

  insert(newElement, item) {
    const newNode = new twoWayNode(newElement)
    const currNode = this.find(item)
    if (currNode) {
      newNode.next = currNode.next
      newNode.prev = currNode
      currNode.next = newNode
      return true
    } else {
      return false
    }
  }

  remove(item) {
    const currNode = this.find(item)
    if (currNode) {
      currNode.prev.next = currNode.next
      currNode.next.prev = currNode.prev
      currNode.next = null
      currNode.prev = null
      return true
    } else {
      return false
    }
  }

  display() {
    let currNode = this.head
    let res = []
    while (currNode.next !== null) {
      res.push(currNode.next.element)
      currNode = currNode.next
    }
    return res
  }

  displayRight() {
    return this.display().reverse()
  }

  displayString() {
    return this.display().join()
  }

  displayRightString() {
    return this.displayRight().join()
  }

  length() {
    return this.display().length
  }

  show() {
    let currNode = this.head.next
    let num = this.pos
    while (num > 0) {
      currNode = currNode.next
      num--
    }
    return currNode
  }

  advance(number) {
    this.pos += number
    let length = this.length() - 1
    if (this.pos > length) {
      this.pos = length
    }
    return this.show()
  }
  
  back(number) {
    this.pos -= number
    if (this.pos < 0) {
      this.pos = 0
    }
    return this.show()
  }
}
```

示例例子可查看 [链表示例](https://github.com/fxss5201/utils/blob/main/test/LinkedList.html) 。
