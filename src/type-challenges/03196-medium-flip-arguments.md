---
title: 3196 - Flip Arguments
order: 3196
isOriginal: true
category:
  - type-challenges
date: 2025-05-07
---

3196 - Flip Arguments
-------
by jiangshan (@jiangshanmeta) #中等 #arguments

### 题目

Implement the type version of lodash's ```_.flip```.

Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

For example:

```typescript
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
// (arg0: boolean, arg1: number, arg2: string) => void
```

> 在 Github 上查看：https://tsch.js.org/3196/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Reverse<T extends any[]> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : T
type FlipArguments<T extends (...args: any[]) => any> = T extends (...args: infer P) => infer R
  ? (...args: Reverse<P>) => R
  : never

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/3196/answer/zh-CN
> 查看解答：https://tsch.js.org/3196/solutions
> 更多题目：https://tsch.js.org/zh-CN
