---
title: 5140 - Trunc
order: 5140
isOriginal: true
category:
  - type-challenges
date: 2025-06-27
---

5140 - Trunc
-------
by jiangshan (@jiangshanmeta) #中等 #template-literal

### 题目

Implement the type version of ```Math.trunc```, which takes string or number and returns the integer part of a number by removing any fractional digits.

For example:

```typescript
type A = Trunc<12.34> // 12
```

> 在 Github 上查看：https://tsch.js.org/5140/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Trunc<T extends number | string> = `${T}` extends `${infer F}.${string}`
  ? F extends ''
    ? '0'
    : F extends '-'
      ? '-0'
      : F
  : `${T}`

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/5140/answer/zh-CN
> 查看解答：https://tsch.js.org/5140/solutions
> 更多题目：https://tsch.js.org/zh-CN
