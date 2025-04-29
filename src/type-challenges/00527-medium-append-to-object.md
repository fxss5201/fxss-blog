---
title: 527 - Append to object
order: 527
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

527 - Append to object
-------
by Andrey Krasovsky (@bre30kra69cs) #中等 #object-keys

### 题目

实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

例如:

```ts
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
```

> 在 Github 上查看：https://tsch.js.org/527/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type AppendToObject<T, U extends string, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V
}

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  moon: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/527/answer/zh-CN
> 查看解答：https://tsch.js.org/527/solutions
> 更多题目：https://tsch.js.org/zh-CN
