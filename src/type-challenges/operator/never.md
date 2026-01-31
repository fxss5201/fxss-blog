---
title: ts `never` 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-01-31
---

### `never`

`never` 表示**永不存在的类型**：

1. 没有任何类型能赋值给 `never`（除了 `never` 自身）；
2. `never` 可以赋值给任意类型（因为它是所有类型的子类型）；
3. 不会有任何实际值属于 `never` 类型。

```ts
let n: never;
let num: number = 123;
let u: unknown = "hello";
let v: void = undefined;

// 1. 任何类型都不能赋值给 never（除了自身）
n = num;   // ❌ 报错：number 不能赋值给 never
n = u;     // ❌ 报错：unknown 不能赋值给 never
n = v;     // ❌ 报错：void 不能赋值给 never
n = undefined; // ❌ 报错：undefined 也不行
n = n;     // ✅ 仅自身可赋值

// 2. never 可以赋值给任意类型
num = n;   // ✅ 正常
u = n;     // ✅ 正常
v = n;     // ✅ 正常
```

1. 泛型的边界约束: 通过泛型约束让不满足条件的泛型类型变为 `never`，从而达到**限制类型范围**的目的。

```ts
// 定义泛型：仅允许 T 为 string 类型，否则 T 为 never
type OnlyString<T> = T extends string ? T : never;

// 满足条件：T 为 string，结果正常
type Str1 = OnlyString<"hello">; // Str1 = "hello"
type Str2 = OnlyString<string>;  // Str2 = string

// 不满足条件：T 为非 string，结果为 never
type Num = OnlyString<number>;   // Num = never
type Bool = OnlyString<boolean>; // Bool = never
type Unk = OnlyString<unknown>;  // Unk = never

// 实际使用：强制函数参数只能是 string 类型
function printStr<T>(val: OnlyString<T>) {
  console.log(val);
}

printStr("hello"); // ✅ 正常
printStr(123);     // ❌ 报错：number 不能赋值给 never
```
