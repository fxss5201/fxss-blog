---
title: 3243 - FlattenDepth
order: 3243
isOriginal: true
category:
  - type-challenges
date: 2025-05-07
---

3243 - FlattenDepth
-------
by jiangshan (@jiangshanmeta) #中等 #array

### 题目

Recursively flatten array up to depth times.

For example:

```typescript
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
```

If the depth is provided, it's guaranteed to be positive integer.

> 在 Github 上查看：https://tsch.js.org/3243/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type FlattenDepth<T extends any[], U extends number = 1, C extends any[] = []> =
  // Check if the current depth reaches the specified maximum depth
  C['length'] extends U
    ? T
    : T extends [infer F, ...infer R]
      // Check if the first element is an array
      ? F extends any[]
        // Recursively flatten the first element and increment the depth
        ? [...FlattenDepth<F, U, [...C, 1]>, ...FlattenDepth<R, U, C>]
        : [F, ...FlattenDepth<R, U, C>]
      : T

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/3243/answer/zh-CN
> 查看解答：https://tsch.js.org/3243/solutions
> 更多题目：https://tsch.js.org/zh-CN
