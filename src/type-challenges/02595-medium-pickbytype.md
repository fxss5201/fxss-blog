---
title: 2595 - PickByType
order: 2595
isOriginal: true
category:
  - type-challenges
date: 2025-04-30
---

2595 - PickByType
-------
by jiangshan (@jiangshanmeta) #中等 #object

### 题目

From `T`, pick a set of properties whose type are assignable to `U`.

For Example

```typescript
type OnlyBoolean = PickByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { isReadonly: boolean; isEnable: boolean; }
```

> 在 Github 上查看：https://tsch.js.org/2595/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean, isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/2595/answer/zh-CN
> 查看解答：https://tsch.js.org/2595/solutions
> 更多题目：https://tsch.js.org/zh-CN
