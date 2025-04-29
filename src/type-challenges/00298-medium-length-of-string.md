---
title: 298 - Length of String
order: 298
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

298 - Length of String
-------
by Pig Fang (@g-plane) #中等 #template-literal

### 题目

计算字符串的长度，类似于 `String#length` 。

> 在 Github 上查看：https://tsch.js.org/298/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type ToArray<S extends string> = S extends `${infer F}${infer R}` ? [F, ...ToArray<R>] : []
type LengthOfString<S extends string> = ToArray<S>['length']

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/298/answer/zh-CN
> 查看解答：https://tsch.js.org/298/solutions
> 更多题目：https://tsch.js.org/zh-CN
