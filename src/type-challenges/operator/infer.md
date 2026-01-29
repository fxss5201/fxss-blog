---
title: ts infer 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-01-28
---

### `infer`

`infer` 是 TypeScript 在条件类型中提供的关键字，用于声明一个 **待推导的类型变量**（类似给类型起一个临时名字），只能在 `extends` 子句中使用。它的核心作用是：从已有类型中提取 / 推导我们需要的部分，而无需手动硬编码类型。

`infer` 必须配合条件类型使用，语法结构如下：

```ts
// 基础结构：推导 T 的类型为 U，若能推导则返回 U，否则返回 never
type InferType<T> = T extends infer U ? U : never;

type Example = InferType<string>; // Example 类型为 string
type Example2 = InferType<number[]>; // Example2 类型为 number[]
```

高频使用场景:

#### 1. 提取函数的返回值类型

```ts
// 定义类型工具：提取函数的返回值类型
type GetReturnType<Fn> = Fn extends (...args: any[]) => infer R ? R : never;

// 测试用函数
const add = (a: number, b: number): number => a + b;
const getUser = () => ({ name: "张三", age: 20 });

// 使用类型工具
type AddReturn = GetReturnType<typeof add>; // AddReturn 类型为 number
type UserReturn = GetReturnType<typeof getUser>; // UserReturn 类型为 { name: string; age: number }
```

#### 2. 提取数组的元素类型

```ts
// 定义类型工具：提取数组元素类型
type GetArrayItem<T> = T extends (infer Item)[] ? Item : never;

// 测试
type NumberArray = GetArrayItem<number[]>; // NumberArray 类型为 number
type StringArray = GetArrayItem<string[]>; // StringArray 类型为 string
type MixedArray = GetArrayItem<[string, number]>; // MixedArray 类型为 string | number
```

#### 3. 提取 Promise 的泛型参数类型

```ts
// 定义类型工具：提取 Promise 的泛型类型
type GetPromiseValue<T> = T extends Promise<infer Value> ? Value : never;

// 测试
type PromiseString = GetPromiseValue<Promise<string>>; // PromiseString 类型为 string
type PromiseUser = GetPromiseValue<Promise<{ id: number }>>; // PromiseUser 类型为 { id: number }
```

#### 4. 提取函数的参数类型

```ts
// 定义类型工具：提取函数参数类型
type GetFunctionParams<Fn> = Fn extends (...args: infer Params) => any ? Params : never;

// 测试
const fn = (name: string, age: number): void => {};
type FnParams = GetFunctionParams<typeof fn>; // FnParams 类型为 [string, number]

// 进一步：提取第一个参数的类型
type FirstParam = GetFunctionParams<typeof fn>[0]; // FirstParam 类型为 string
```
