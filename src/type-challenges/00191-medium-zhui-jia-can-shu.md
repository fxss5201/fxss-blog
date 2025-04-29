---
title: 191 - 追加参数
order: 191
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

191 - 追加参数
-------
by Maciej Sikora (@maciejsikora) #中等 #arguments

### 题目

> 由 @antfu 翻译

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean>
// 期望是 (a: number, b: string, x: boolean) => number
```

> 本挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 在 Dev.io 上的[文章](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c)

> 在 Github 上查看：https://tsch.js.org/191/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type AppendArgument<Fn extends (...args: any[]) => unknown, A> = (...args: [...Parameters<Fn>, A]) => ReturnType<Fn>

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/191/answer/zh-CN
> 查看解答：https://tsch.js.org/191/solutions
> 更多题目：https://tsch.js.org/zh-CN
