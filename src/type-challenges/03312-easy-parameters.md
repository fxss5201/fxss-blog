---
title: 3312 - Parameters
order: 3312
isOriginal: true
category:
  - type-challenges
date: 2025-04-28
---

3312 - Parameters
-------
by midorizemi (@midorizemi) #简单 #infer #tuple #built-in

### 题目

实现内置的 `Parameters<T>` 类型，而不是直接使用它，可参考[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

例如：

```ts
const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```

> 在 Github 上查看：https://tsch.js.org/3312/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type MyParameters<T> = T extends (...args: infer P) => unknown ? P : never

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/3312/answer/zh-CN
> 查看解答：https://tsch.js.org/3312/solutions
> 更多题目：https://tsch.js.org/zh-CN
