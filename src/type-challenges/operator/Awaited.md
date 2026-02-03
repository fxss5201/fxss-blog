---
title: ts `Awaited` 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-02-03
---

### `Awaited`

`Awaited<Type>` 用于提取嵌套 `Promise` 类型的最终解析值。

1. 当 `T` 是 `Promise<U>` 时，`Awaited<T>` 会返回 `U`。
2. 如果 `U` 本身也是 `Promise<V>`，则 `Awaited<T>` 会继续递归，返回 `V`。
3. 若 `T` 不是 `Promise` 类型，则直接返回 `T`。

```ts
type A = Awaited<Promise<string>>; // string

type B = Awaited<Promise<Promise<number>>>; // number

type C = Awaited<boolean | Promise<number>>; // number | boolean
```
