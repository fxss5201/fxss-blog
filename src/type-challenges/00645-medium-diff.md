---
title: 645 - Diff
order: 645
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

645 - Diff
-------
by ZYSzys (@ZYSzys) #中等 #object

### 题目

获取两个接口类型中的差值属性。

```ts
type Foo = {
  a: string;
  b: number;
}
type Bar = {
  a: string;
  c: boolean
}

type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }

```

> 在 Github 上查看：https://tsch.js.org/645/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Diff<O, O1> = {
  [K in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never
}

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/645/answer/zh-CN
> 查看解答：https://tsch.js.org/645/solutions
> 更多题目：https://tsch.js.org/zh-CN
