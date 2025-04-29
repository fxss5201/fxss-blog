---
title: 599 - Merge
order: 599
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

599 - Merge
-------
by ZYSzys (@ZYSzys) #中等 #object

### 题目

将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

例如

```ts
type foo = {
  name: string;
  age: string;
}

type coo = {
  age: number;
  sex: string
}

type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
```

> 在 Github 上查看：https://tsch.js.org/599/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never
}

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/599/answer/zh-CN
> 查看解答：https://tsch.js.org/599/solutions
> 更多题目：https://tsch.js.org/zh-CN
