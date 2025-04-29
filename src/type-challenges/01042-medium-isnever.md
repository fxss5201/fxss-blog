---
title: 1042 - IsNever
order: 1042
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

1042 - IsNever
-------
by hiroya iizuka (@hiroyaiizuka) #中等 #union #utils

### 题目

Implement a type IsNever, which takes input type `T`.
If the type of resolves to `never`, return `true`, otherwise `false`.

For example:

```ts
type A = IsNever<never> // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

> 在 Github 上查看：https://tsch.js.org/1042/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type IsNever<T> = [T] extends [never] ? true : false

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/1042/answer/zh-CN
> 查看解答：https://tsch.js.org/1042/solutions
> 更多题目：https://tsch.js.org/zh-CN
