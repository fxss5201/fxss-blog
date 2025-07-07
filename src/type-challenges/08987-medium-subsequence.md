---
title: 8987 - Subsequence
order: 8987
isOriginal: true
category:
  - type-challenges
date: 2025-07-07
---

8987 - Subsequence
-------
by jiangshan (@jiangshanmeta) #中等 #union

### 题目

Given an array of unique elements, return all possible subsequences.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

For example:

```typescript
type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
```

> 在 Github 上查看：https://tsch.js.org/8987/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Subsequence<T extends any[]> = T extends [infer First, ...infer Rest]
  ? Subsequence<Rest> | [First, ...Subsequence<Rest>]
  : []

type A = Subsequence<[1, 2]>

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]>>,
  Expect<Equal<Subsequence<[1, 2, 3, 4, 5]>, [] |
  [1] | [2] | [3] | [4] | [5] |
  [1, 2] | [1, 3] | [1, 4] | [1, 5] | [2, 3] | [2, 4] | [2, 5] | [3, 4] | [3, 5] | [4, 5] |
  [1, 2, 3] | [1, 2, 4] | [1, 2, 5] | [1, 3, 4] | [1, 3, 5] | [1, 4, 5] | [2, 3, 4] | [2, 3, 5] | [2, 4, 5] | [3, 4, 5] |
  [1, 2, 3, 4] | [1, 2, 3, 5] | [1, 2, 4, 5] | [1, 3, 4, 5] | [2, 3, 4, 5] |
  [1, 2, 3, 4, 5] >>,
  Expect<Equal<Subsequence<['a', 'b', 'c']>, [] |
  ['a'] | ['b'] | ['c'] |
  ['a', 'b'] | ['a', 'c'] | ['b', 'c'] |
  ['a', 'b', 'c'] >>,
  Expect<Equal<Subsequence<['x', 'y']>, [] |
  ['x'] | ['y'] |
  ['x', 'y'] >>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/8987/answer/zh-CN
> 查看解答：https://tsch.js.org/8987/solutions
> 更多题目：https://tsch.js.org/zh-CN
