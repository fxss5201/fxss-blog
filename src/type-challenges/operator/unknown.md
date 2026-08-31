---
title: ts `unknown` 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-01-31
---

### `unknown`

作用是替代 `any` 处理 **类型未知** 的场景，同时保证类型检查的安全性。

1. 所有类型（基本类型、对象、函数、数组等）都可以赋值给 `unknown` 类型的变量；
2. 但 `unknown` 类型的变量不能随意赋值给其他类型（仅能赋值给 `unknown` 和 `any`）；
3. 也不能直接操作 `unknown` 类型的变量（比如调用方法、访问属性、做算术运算），必须先通过类型收窄确定其具体类型，这是它比 `any` 安全的关键。

1. 与 `any` 的区别

`any` 是**任意类型**，会关闭 TypeScript 的类型检查，而 `unknown` 是**未知类型**，保留类型检查，仅允许在确定类型后操作。两者的规则对比如下：

|规则|`unknown`|`any`|
|----|----|----|
|所有类型可赋值给它|✅ 支持|✅ 支持|
|它可赋值给其他类型|❌ 仅能赋值给 `unknown`/`any`|✅ 可赋值给任意类型（无限制）|
|直接操作变量（调用方法 / 访问属性）|❌ 不允许（必须类型收窄）|✅ 允许（关闭类型检查）|

```ts
// 1. 所有类型都能赋值给 unknown/any
let u: unknown = 123;
u = "hello";
u = [1,2,3];

let a: any = 123;
a = "hello";
a = [1,2,3];

// 2. unknown 仅能赋值给 unknown/any（赋值给其他类型报错）
let num: number = u; // ❌ 报错：Type 'unknown' is not assignable to type 'number'
let u2: unknown = u; // ✅ 正常
let a2: any = u;     // ✅ 正常

// any 可赋值给任意类型（无报错，即使类型不匹配）
let num2: number = a; // ✅ 无报错（但运行时可能出问题，类型不安全）

// 3. 直接操作 unknown 报错，操作 any 无限制
u.toFixed(); // ❌ 报错：Object is of type 'unknown'
a.toFixed(); // ✅ 无报错（即使 a 可能是字符串，TS 不检查）
```

2. 类型收窄

2.1 `typeof`检查（适用于基本类型：`number`/`string`/`boolean`/`undefined`/`null`/`symbol`/`bigint`）

```ts
function handleUnknown(val: unknown) {
  // 先通过 typeof 收窄为数字类型
  if (typeof val === "number") {
    console.log(val.toFixed(2)); // ✅ 正常：val 已确定是 number
  }
  // 收窄为字符串类型
  else if (typeof val === "string") {
    console.log(val.toUpperCase()); // ✅ 正常：val 已确定是 string
  }
  // 收窄为布尔类型
  else if (typeof val === "boolean") {
    console.log(val ? "真" : "假"); // ✅ 正常：val 已确定是 boolean
  }
}

handleUnknown(123.456); // 输出 123.46
handleUnknown("hello"); // 输出 HELLO
handleUnknown(true);    // 输出 真
```

2.2 `instanceof`检查（适用于引用类型：数组 / 类实例 / RegExp/Date 等）

```ts
function handleUnknown2(val: unknown) {
  // 收窄为数组类型
  if (val instanceof Array) {
    console.log(val.push(4)); // ✅ 正常：val 已确定是 Array
  }
  // 收窄为 Date 类型
  else if (val instanceof Date) {
    console.log(val.toLocaleString()); // ✅ 正常：val 已确定是 Date
  }
}

handleUnknown2([1,2,3]); // 输出 4（数组长度）
handleUnknown2(new Date()); // 输出当前时间字符串
```

2.3 类型断言

```ts
let u: unknown = "这是一个字符串";

// 断言为 string 类型后操作
let str = u as string;
console.log(str.length); // ✅ 正常：输出 7

// 错误断言（运行时报错）
let num = u as number;
console.log(num.toFixed()); // ❌ 运行时报错：num.toFixed is not a function
```
