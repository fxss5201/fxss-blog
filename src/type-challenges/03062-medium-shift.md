---
title: 3062 - Shift
order: 3062
isOriginal: true
category:
  - type-challenges
date: 2025-05-07
---

3062 - Shift
-------
by jiangshan (@jiangshanmeta) #中等 #array

### 题目

Implement the type version of ```Array.shift```

For example

```typescript
type Result = Shift<[3, 2, 1]> // [2, 1]
```

> 在 Github 上查看：https://tsch.js.org/3062/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Shift<T extends any[]> = T extends [] ? [] : T extends [infer _F, ...infer R] ? R : never

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/3062/answer/zh-CN
> 查看解答：https://tsch.js.org/3062/solutions
> 更多题目：https://tsch.js.org/zh-CN
