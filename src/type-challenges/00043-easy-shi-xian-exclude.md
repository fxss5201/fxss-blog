---
title: 43 - 实现 Exclude
order: 43
isOriginal: true
category:
  - type-challenges
date: 2025-04-28
---

43 - 实现 Exclude
-------
by Zheeeng (@zheeeng) #简单 #built-in #union

### 题目

实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

> 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

例如：

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

> 在 Github 上查看：https://tsch.js.org/43/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type MyExclude<T, U> = T extends U ? never : T

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/43/answer/zh-CN
> 查看解答：https://tsch.js.org/43/solutions
> 更多题目：https://tsch.js.org/zh-CN
