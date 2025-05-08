---
title: 4425 - Greater Than
order: 4425
isOriginal: true
category:
  - type-challenges
date: 2025-05-08
---

4425 - Greater Than
-------
by ch3cknull (@ch3cknull) #中等 #array

### 题目

In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

Negative numbers do not need to be considered.

For example

```ts
GreaterThan<2, 1> //should be true
GreaterThan<1, 1> //should be false
GreaterThan<10, 100> //should be false
GreaterThan<111, 11> //should be true
```

Good Luck!

> 在 Github 上查看：https://tsch.js.org/4425/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type ParseInt<S extends string> = S extends `${infer N extends number}` ? N : 0

type GreaterThanBySmallNumber<
  T extends number,
  U extends number,
  Arr extends any[] = [],
> = T extends Arr['length']
  ? false
  : U extends Arr['length']
    ? true
    : GreaterThanBySmallNumber<T, U, [...Arr, any]>

type StringToArray<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...StringToArray<Rest>]
  : []

type UnShift<T extends string[]> = T extends [string, ...infer Rest] ? Rest : []

type GreaterThanByArray<T extends string[], U extends string[]> = T[0] extends U[0]
  ? T['length'] extends 1
    ? false
    : GreaterThanByArray<UnShift<T>, UnShift<U>>
  : GreaterThanBySmallNumber<ParseInt<T[0]>, ParseInt<U[0]>>

type GreaterThan<
  T extends number,
  U extends number,
  TArr extends string[] = StringToArray<`${T}`>,
  UArr extends string[] = StringToArray<`${U}`>,
> = TArr['length'] extends UArr['length']
  ? GreaterThanByArray<TArr, UArr>
  : GreaterThanBySmallNumber<TArr['length'], UArr['length']>

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/4425/answer/zh-CN
> 查看解答：https://tsch.js.org/4425/solutions
> 更多题目：https://tsch.js.org/zh-CN
