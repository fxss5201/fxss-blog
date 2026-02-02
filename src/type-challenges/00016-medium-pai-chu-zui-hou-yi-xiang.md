---
title: 16 - 排除最后一项
order: 16
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

16 - 排除最后一项
-------
by Anthony Fu (@antfu) #中等 #array

## 题目

> 在此挑战中建议使用TypeScript 4.0

实现一个泛型`Pop<T>`，它接受一个数组`T`，并返回一个由数组`T`的前 N-1 项（N 为数组`T`的长度）以相同的顺序组成的数组。

例如

```ts
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
```

**额外**：同样，您也可以实现`Shift`，`Push`和`Unshift`吗？

> 在 Github 上查看：https://tsch.js.org/16/zh-CN

## 代码

```ts
/* _____________ 你的代码 _____________ */

type Pop<T extends any[]> = T extends [] ? [] : T extends [...infer A, infer _] ? A : never

```

关键解释： 

- `T extends any[]`：约束 `T` 必须是数组类型。
- `T extends [...infer A, infer _]`：模式匹配，捕获数组最后一个元素之外的所有前置元素。
- `A`：前置元素数组。
- `_`：数组最后一个元素。

## 相关知识点

### `extends`

| 使用维度 | 核心作用 | 示例场景 |
| -------- | -------- | -------- |
| 类型维度 | 做类型约束或条件判断（类型编程核心） | 限定泛型范围、判断类型是否兼容、提取类型片段 |
| 语法维度 | 做继承（复用已有结构） | 接口继承、类继承 |

#### `extends` 做类型约束或条件判断

1. 泛型约束：限定泛型的取值范围

```ts
// 约束 T 必须是「拥有 length 属性」的类型（比如 string/数组）
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

// 合法调用（符合约束）
getLength("hello"); // ✅ string 有 length，返回 5
getLength([1, 2, 3]); // ✅ 数组有 length，返回 3

// 非法调用（超出约束）
getLength(123); // ❌ 报错：number 没有 length 属性
```

2. 条件类型：类型版 **三元运算符**

```ts
// 基础示例：判断类型是否为字符串
type IsString<T> = T extends string ? true : false;

type A = IsString<"test">; // true（符合）
type B = IsString<123>; // false（不符合）
```

分布式条件类型（联合类型专用）: 当 `T` 是联合类型时，`extends` 会自动拆分联合类型的每个成员，逐个判断后再合并结果。

```ts
type Union = string | number | boolean;

// 拆分逻辑：string→string，number→never，boolean→never → 合并为 string
type OnlyString<T> = T extends string ? T : never;
type Result = OnlyString<Union>; // Result = string
```

注意：只有泛型参数是 裸类型（没有被 []/{} 包裹）时，才会触发分布式判断：

```ts
// 包裹后不触发分布式，整体判断 [string|number] 是否兼容 [string]
type NoDist<T> = [T] extends [string] ? T : never;
type Result2 = NoDist<Union>; // never（整体不兼容）
```

3. 配合 `infer`：提取类型片段（黄金组合）

```ts
// 提取 Promise 的返回值类型
type UnwrapPromise<T> = T extends Promise<infer V> ? V : T;

type C = UnwrapPromise<Promise<string>>; // string（提取成功）
type D = UnwrapPromise<number>; // number（不满足条件，返回原类型）
```

#### `extends` 做继承（复用已有结构）

1. 接口继承：复用 + 扩展属性

```ts
// 基础接口
interface User {
  id: number;
  name: string;
}

// 继承 User，并扩展新属性
interface Admin extends User {
  role: "admin" | "super_admin"; // 新增权限属性
}

// 必须包含继承的 + 扩展的所有属性
const admin: Admin = {
  id: 1,
  name: "张三",
  role: "admin"
};

// 多接口继承
interface HasAge { age: number; }
interface Student extends User, HasAge {
  className: string; // 同时继承 User + HasAge
}
```

2. 类继承：复用父类的属性 / 方法

```ts
class Parent {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi() {
    console.log(`Hi, ${this.name}`);
  }
}

// 继承 Parent 类
class Child extends Parent {
  age: number;
  constructor(name: string, age: number) {
    super(name); // 必须调用父类构造函数（初始化父类属性）
    this.age = age;
  }
  // 重写父类方法
  sayHi() {
    super.sayHi(); // 调用父类原方法
    console.log(`I'm ${this.age} years old`);
  }
}

const child = new Child("李四", 10);
child.sayHi(); // 输出：Hi, 李四 → I'm 10 years old
```

补充：类实现接口用 `implements`（不是 `extends`）

```ts
// 定义接口（契约：规定必须有 id、name 属性，以及 greet 方法）
interface Person {
  id: number;
  name: string;
  greet(): void; // 仅定义方法签名，无实现
}

// 类实现接口（必须严格遵守契约）
class Employee implements Person {
  // 必须实现接口的所有属性
  id: number;
  name: string;

  // 构造函数初始化属性
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // 必须实现接口的 greet 方法（具体实现由类自己定义）
  greet() {
    console.log(`Hi, I'm ${this.name}, ID: ${this.id}`);
  }
}

// 实例化使用
const emp = new Employee(1, "张三");
emp.greet(); // 输出：Hi, I'm 张三, ID: 1


// 接口1：基础信息
interface Identifiable {
  id: number;
  getId(): number;
}

// 接口2：可打印
interface Printable {
  printInfo(): void;
}

// 类同时实现两个接口（必须实现所有接口的成员）
class Product implements Identifiable, Printable {
  id: number;
  name: string; // 类可扩展接口外的属性

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // 实现 Identifiable 的方法
  getId(): number {
    return this.id;
  }

  // 实现 Printable 的方法
  printInfo() {
    console.log(`Product: ${this.name}, ID: ${this.getId()}`);
  }
}

const product = new Product(100, "手机");
console.log(product.getId()); // 100
product.printInfo(); // Product: 手机, ID: 100
```

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

## 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]

```

## 相关链接

> 分享你的解答：https://tsch.js.org/16/answer/zh-CN
> 查看解答：https://tsch.js.org/16/solutions
> 更多题目：https://tsch.js.org/zh-CN
