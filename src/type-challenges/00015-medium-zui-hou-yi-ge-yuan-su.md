---
title: 15 - 最后一个元素
order: 15
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

15 - 最后一个元素
-------
by Anthony Fu (@antfu) #中等 #array

### 题目

> 在此挑战中建议使用TypeScript 4.0

实现一个`Last<T>`泛型，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // 应推导出 'c'
type tail2 = Last<arr2> // 应推导出 1
```

> 在 Github 上查看：https://tsch.js.org/15/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Last<T extends any[]> = T extends [...infer _, infer R] ? R : never

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/15/answer/zh-CN
> 查看解答：https://tsch.js.org/15/solutions
> 更多题目：https://tsch.js.org/zh-CN
