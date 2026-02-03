---
title: 20 - Promise.all
order: 20
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

20 - Promise.all
-------
by Anthony Fu (@antfu) #中等 #array #promise

## 题目

给函数`PromiseAll`指定类型，它接受元素为 Promise 或者类似 Promise 的对象的数组，返回值应为`Promise<T>`，其中`T`是这些 Promise 的结果组成的数组。

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// 应推导出 `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)
```

> 在 Github 上查看：https://tsch.js.org/20/zh-CN

## 代码

```ts
/* _____________ 你的代码 _____________ */

declare function PromiseAll<T extends any[]>(values: [...T]): Promise<{ [K in keyof T]: Awaited<T[K]> }>

```

关键解释：
- `T extends any[]`：约束 `T` 必须是数组类型。
- `[...T]`：是数组扩展语法（元组展开），用于保留输入数组的元组结构。
- `Awaited<T[K]>`：获取 `Promise` 或者类似 `Promise` 的对象的结果类型。
- `Promise<...>`：函数返回一个 `Promise`。
- `{ [K in keyof T]: Awaited<T[K]> }`：将结果类型组成数组。
   - `{ [K in keyof T]: ... }`：这是一个映射类型，遍历元组 `T` 的所有索引 `K`（如 0、1、2...），并为每个索引生成对应的类型。
   - `Awaited<T[K]>`：获取 `Promise` 或者类似 `Promise` 的对象的结果类型。
      - 若 `T[K]` 是 `Promise<X>`，则 `Awaited<T[K]>` 为 `X`;
      - 若 `T[K]` 是普通值 `X`，则 `Awaited<T[K]>` 仍为 `X`;
      - `Awaited` 支持嵌套 `Promise`，如 `Awaited<Promise<Promise<X>>>` 也会解析为 `X`。

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

### `in`

`in` 运算符用于遍历联合类型中的每个成员，将其转换为映射类型的属性名。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = 'title' | 'description'

type TodoPreview = {
  [P in TodoKeys]: Todo[P]
}
// TodoPreview 类型为：
// {
//   title: string
//   completed: boolean
// }
```

### `keyof`

`keyof` 运算符用于获取一个类型（接口、类型别名、对象类型等）的所有公共属性名，并返回这些属性名组成的联合类型。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = keyof Todo // "title" | "description" | "completed"
```

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

## 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])
const promiseAllTest5 = PromiseAll<(number | Promise<string>)[]>([1, 2, Promise.resolve('3')])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
  Expect<Equal<typeof promiseAllTest5, Promise<(number | string)[]>>>,
]

```

## 相关链接

> 分享你的解答：https://tsch.js.org/20/answer/zh-CN
> 查看解答：https://tsch.js.org/20/solutions
> 更多题目：https://tsch.js.org/zh-CN
