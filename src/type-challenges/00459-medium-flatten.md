---
title: 459 - Flatten
order: 459
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

459 - Flatten
-------
by zhouyiming (@chbro) #中等 #array

### 题目

在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

例如:

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

> 在 Github 上查看：https://tsch.js.org/459/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Flatten<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...Flatten<F>, ...Flatten<R>]
    : [F, ...Flatten<R>]
  : []

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>

```

### 相关链接

> 分享你的解答：https://tsch.js.org/459/answer/zh-CN
> 查看解答：https://tsch.js.org/459/solutions
> 更多题目：https://tsch.js.org/zh-CN
