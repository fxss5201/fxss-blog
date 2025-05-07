---
title: 4182 - 斐波那契序列
order: 4182
isOriginal: true
category:
  - type-challenges
date: 2025-05-07
---

4182 - 斐波那契序列
-------
by windliang (@wind-liang) #中等

### 题目

Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

The sequence starts:
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

For example
```js
type Result1 = Fibonacci<3> // 2
type Result2 = Fibonacci<8> // 21
```

> 在 Github 上查看：https://tsch.js.org/4182/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Fibonacci<
    T extends number,
    N extends number[] = [1],
    Res extends number[] = [1],
    Cur extends number[] = [1],
> = N['length'] extends T
  ? Res['length']
  : Fibonacci<T, [...N, 1], Cur, [...Res, ...Cur]>

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/4182/answer/zh-CN
> 查看解答：https://tsch.js.org/4182/solutions
> 更多题目：https://tsch.js.org/zh-CN
