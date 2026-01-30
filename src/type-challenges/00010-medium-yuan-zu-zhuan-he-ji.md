---
title: 10 - 元组转合集
order: 10
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

10 - 元组转合集
-------
by Anthony Fu (@antfu) #中等 #infer #tuple #union

## 题目

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

例如

```ts
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

> 在 Github 上查看：https://tsch.js.org/10/zh-CN

## 代码

```ts
/* _____________ 你的代码 _____________ */

type TupleToUnion<T> = T extends [infer F, ...infer R] ? F | TupleToUnion<R> : never

```

关键解释：

- `T extends [infer F, ...infer R]` 用于判断元组是否为空。
- `F | TupleToUnion<R>` 用于递归处理元组的剩余部分。
- `never` 用于处理空元组的情况。

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

### `|`

`|` 运算符用于表示联合类型，即一个值可以是多个类型中的任意一个。

1. 变量的联合类型注解

```ts
// 变量 a 可以是字符串 OR 数字
let a: string | number;

// 合法赋值（符合任意一种类型）
a = "TS";
a = 123;

// 非法赋值（不属于联合类型中的任何一种），TS 直接报错
a = true; // ❌ 类型 'boolean' 不能赋值给类型 'string | number'
```

2. 函数参数的联合类型

```ts
// 函数接收 string 或 number 类型的参数
function printValue(val: string | number) {
  console.log(val);
}

// 合法调用
printValue("hello");
printValue(666);

// 非法调用，TS 报错
printValue(null); // ❌
```

3. 数组的联合类型（注意两种写法的区别）

```ts
// 写法1：(A | B)[] —— 数组的「每个元素」可以是 A 或 B（混合数组）
let arr1: (string | number)[] = [1, "2", 3, "4"]; // 合法

// 写法2：A[] | B[] —— 「整个数组」要么全是 A 类型，要么全是 B 类型（纯数组）
let arr2: string[] | number[] = [1, 2, 3]; // 合法（全数字）
arr2 = ["1", "2", "3"]; // 合法（全字符串）
arr2 = [1, "2"]; // ❌ 报错：混合类型不符合要求
```

当使用联合类型的时候，访问某一个子类型的专属属性 / 方法时，需要进行类型守卫，可用的方法有 `typeof` 、`in` 、`switch` 、`instanceof` 。

1. `typeof`

```ts
function getLength(val: string | number) {
  // 类型窄化：判断 val 是 string 类型
  if (typeof val === "string") {
    // 此分支中，TS 确定 val 是 string，可安全使用 length
    return val.length;
  } else {
    // 此分支中，TS 确定 val 是 number，执行数字相关逻辑
    return val.toString().length;
  }
}

console.log(getLength("TS")); // 2
console.log(getLength(1234)); // 4
```

2. `in`

```ts
function printUserInfo(user: { name: string } | { age: number }) {
  // 类型窄化：判断 user 是否有 name 属性（即是否是 { name: string } 类型）
  if ("name" in user) {
    console.log(`Name: ${user.name}`);
  } else {
    // 此分支中，TS 确定 user 是 { age: number } 类型
    console.log(`Age: ${user.age}`);
  }
}
```

3. `switch`

```ts
interface User {
  type: "user";
  name: string;
  age: number;
}
interface Admin {
  type: "admin";
  name: string;
  permission: string[];
}
// 联合类型：可以是 User 或 Admin
type Person = User | Admin;
function printPerson(p: Person) {
  switch (p.type) {
    case "user":
      console.log(p.age); // 确定是 User
      break;
    case "admin":
      console.log(p.permission); // 确定是 Admin
      break;
  }
}
```

4. `instanceof`

```ts
// 定义两个类
class Dog {
  bark() { console.log("汪汪"); }
}
class Cat {
  meow() { console.log("喵喵"); }
}

// 联合类型：Dog 或 Cat 实例
type Animal = Dog | Cat;

// instanceof 类型守卫（针对类实例）
function animalCall(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

animalCall(new Dog()); // 汪汪
animalCall(new Cat()); // 喵喵
```


## 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]

```

## 相关链接

> 分享你的解答：https://tsch.js.org/10/answer/zh-CN
> 查看解答：https://tsch.js.org/10/solutions
> 更多题目：https://tsch.js.org/zh-CN
