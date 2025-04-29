---
title: 119 - ReplaceAll
order: 119
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

119 - ReplaceAll
-------
by Anthony Fu (@antfu) #中等 #template-literal

### 题目

实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

例如

```ts
type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'
```

> 在 Github 上查看：https://tsch.js.org/119/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${ReplaceAll<R, From, To>}`
    : S

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/119/answer/zh-CN
> 查看解答：https://tsch.js.org/119/solutions
> 更多题目：https://tsch.js.org/zh-CN
