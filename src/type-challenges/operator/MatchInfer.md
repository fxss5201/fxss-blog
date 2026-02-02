---
title: ts `...infer`
isOriginal: true
category:
  - TypeScript
date: 2026-02-02
---

### `...infer`

```ts
type Pop<T extends any[]> = T extends [] ? [] : T extends [...infer A, infer _] ? A : never

type Res1 = Pop<[1,2,3]> // 结果：[1,2]
type Res2 = Pop<[string]> // 推导：A = []，_ = string → 返回 []
type Res3 = Pop<[]> // 结果：[]
```

这里的 `...infer A` 不是值层面的剩余操作符，而是 TS 数组 / 元组类型的**模式匹配语法**，它放在第一个位置是为了匹配并捕获**数组最后一个元素之外的所有前置元素**。

```ts
// Shift 类型：移除第一个元素，返回剩余部分
type Shift<T extends any[]> = T extends [] ? [] : T extends [infer _, ...infer A] ? A : never

type Res4 = Shift<[1,2,3]> // 结果：[2,3]
type Res5 = Shift<[string]> // 结果：[]
```

`...infer A` 放到最后，`infer _` 放到第一个，模式就变成了 `[infer _, ...infer A]`，此时匹配的是 **固定第一个元素 + 任意后置剩余元素**。

```ts
// 移除数组最后两个元素，返回前置部分
type Pop2<T extends any[]> = T extends [...infer A, infer _, infer __] ? A : T

type Res6 = Pop2<[1,2,3,4]> // 结果：[1,2]
type Res7 = Pop2<[1,2]> // 结果：[]
type Res8 = Pop2<[1]> // 不匹配模式，返回原类型 [1]
```
