---
title: 108 - 去除两端空白字符
order: 108
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

108 - 去除两端空白字符
-------
by Anthony Fu (@antfu) #中等 #template-literal

### 题目

实现`Trim<T>`，它接受一个明确的字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

例如

```ts
type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

> 在 Github 上查看：https://tsch.js.org/108/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Trim<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` | `${infer R}${' ' | '\n' | '\t'}` ? Trim<R> : S

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/108/answer/zh-CN
> 查看解答：https://tsch.js.org/108/solutions
> 更多题目：https://tsch.js.org/zh-CN
