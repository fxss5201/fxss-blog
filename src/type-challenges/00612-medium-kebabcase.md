---
title: 612 - KebabCase
order: 612
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

612 - KebabCase
-------
by Johnson Chu (@johnsoncodehk) #中等 #template-literal

### 题目

Replace the `camelCase` or `PascalCase` string with `kebab-case`.

`FooBarBaz` -> `foo-bar-baz`

For example

```ts
type FooBarBaz = KebabCase<"FooBarBaz">
const foobarbaz: FooBarBaz = "foo-bar-baz"

type DoNothing = KebabCase<"do-nothing">
const doNothing: DoNothing = "do-nothing"
```

> 在 Github 上查看：https://tsch.js.org/612/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type KebabCase<S> = S extends `${infer L}${infer R}` ? R extends Uncapitalize<R> ? `${Lowercase<L>}${KebabCase<R>}` : `${Lowercase<L>}-${KebabCase<R>}` : S

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/612/answer/zh-CN
> 查看解答：https://tsch.js.org/612/solutions
> 更多题目：https://tsch.js.org/zh-CN
