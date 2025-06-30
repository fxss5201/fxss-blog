---
title: 4499 - Chunk
order: 4499
isOriginal: true
category:
  - type-challenges
date: 2025-06-27
---

4499 - Chunk
-------
by キリサメ qianxi (@qianxi0410) #中等 #tuple

### 题目

Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
`Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

```ts
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
```

> 在 Github 上查看：https://tsch.js.org/4499/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Chunk<T extends any[], N extends number = 1, U extends any[] = []> = T extends [
  infer F,
  ...infer Rest,
]
  ? U['length'] extends N
    ? [U, ...Chunk<T, N>]
    : Chunk<Rest, N, [...U, F]>
  : U extends []
    ? []
    : [U]

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/4499/answer/zh-CN
> 查看解答：https://tsch.js.org/4499/solutions
> 更多题目：https://tsch.js.org/zh-CN
