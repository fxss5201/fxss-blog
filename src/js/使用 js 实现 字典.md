---
title: 使用 js 实现 字典
shortTitle: 使用 js 实现 字典
isOriginal: true
category:
  - javascript
date: 2022-02-05
---

字典是一种以 键值对 形式存数数据的数据结构，`javaScript` 中的 `Object` 类就是以字典的形式设置的，所以使用 `Object` 类本身的特性实现字典 `Dictionary` 类。

## 属性及方法

| 列表 | 属性或方法 | 描述 |
|----|----|----|
| add | 方法 | `add(key, value)` 向字典中添加 键值对 |
| find | 方法 | `find(key)` 从字典中查找 `key` 键对应的值，找不到则返回 `undefined` |
| remove | 方法 | `remove(key)` 从字典中删除 `key` 键 |
| getKeys | 方法 | `getKeys()` 获取字典中的所有 `key` |
| getKeysSort | 方法 | `getKeysSort()` 获取字典中的所有 `key`，并使用 `sort` 排序 |
| count | 方法 | `count()` 返回字典中 键值对 的个数 |
| showAll | 方法 | `showAll()` 将字典中的所有 键值对 转换为字符串，以 `,` 分隔 |
| showAllSort | 方法 | `showAllSort()` 将字典中的所有键按照 `sort` 排序，之后将所有 键值对 转换为字符串，以 `,` 分隔 |
| clear | 方法 | `clear()` 清空字典 |

## 字典代码实现

```js
class Dictionary {
  constructor() {
    this.dataStore = {}
  }

  add(key, value) {
    this.dataStore[key] = value
  }

  find(key) {
    return this.dataStore[key]
  }

  remove(key) {
    delete this.dataStore[key]
  }

  getKeys() {
    return Object.keys(this.dataStore)
  }

  getKeysSort() {
    return this.getKeys().sort()
  }

  count() {
    return this.getKeys().length
  }

  showAll() {
    let res = ''
    this.getKeys().forEach(key => {
      res += `,{key:'${key}',value:'${this.dataStore[key]}'}`
    })
    return res.slice(1)
  }

  showAllSort() {
    let res = ''
    this.getKeys().sort().forEach(key => {
      res += `,{key:'${key}',value:'${this.dataStore[key]}'}`
    })
    return res.slice(1)
  }

  clear() {
    this.getKeys().forEach(key => {
      delete this.dataStore[key]
    })
    this.dataStore = {}
  }
}
```

## 字典的使用

常见实现比如说电话薄，电话薄利的名字相当于键，电话号码相当于值，组合在一起就是键值对。一般查找电话号码是依据名字查找。电话薄的排序也是依据名字进行排序，下面展示电话薄的简单示例：

```js
const phoneDictionary = new Dictionary()
const phoneDictionary1 = new Dictionary()
phoneDictionary.add('yi', 13010102020)
phoneDictionary.add('er', 13030304040)
phoneDictionary1.add('yi', 13010102020)
phoneDictionary1.add('er', 13030304040)
phoneDictionary.add('zhangsan', 13000001111)
phoneDictionary.add('lisi', 13022223333)
phoneDictionary.add('wangwu', 13044445555)
phoneDictionary.add('luliu', 13066667777)
phoneDictionary.add('zhaoqi', 13088889999)
console.log(phoneDictionary)
console.log(`phoneDictionary.find('zhangsan')`, phoneDictionary.find('zhangsan'))
console.log(`phoneDictionary.find('zhangsan1')`, phoneDictionary.find('zhangsan1'))
phoneDictionary.remove('yi')
console.log(phoneDictionary)
console.log(`phoneDictionary.getKeys()`, phoneDictionary.getKeys())
console.log(`phoneDictionary.getKeysSort()`, phoneDictionary.getKeysSort())
console.log(`phoneDictionary.count()`, phoneDictionary.count())
console.log(`phoneDictionary.showAll()`, phoneDictionary.showAll())
console.log(`phoneDictionary.showAllSort()`, phoneDictionary.showAllSort())
console.log(phoneDictionary1)
```

## 感谢

本次分享到这里就结束了，**感谢您的阅读**！如对您有帮助，帮忙点个赞，您的点赞是我继续创作的动力。
