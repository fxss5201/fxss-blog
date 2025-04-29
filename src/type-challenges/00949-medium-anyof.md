---
title: 949 - AnyOf
order: 949
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

949 - AnyOf
-------
by null (@kynefuk) #中等 #array

### 题目

在类型系统中实现类似于 Python 中 `any` 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，否则返回 `false`。如果数组为空，返回 `false`。

例如：

```ts
type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
```

> 在 Github 上查看：https://tsch.js.org/949/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R] ? F extends 0 | '' | false | undefined | null | [] | Record<string, never> ? AnyOf<R> : true : false

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/949/answer/zh-CN
> 查看解答：https://tsch.js.org/949/solutions
> 更多题目：https://tsch.js.org/zh-CN
