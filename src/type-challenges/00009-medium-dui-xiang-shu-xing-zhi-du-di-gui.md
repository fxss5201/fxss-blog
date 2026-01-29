---
title: 9 - 对象属性只读（递归）
order: 9
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

9 - 对象属性只读（递归）
-------
by Anthony Fu (@antfu) #中等 #readonly #object-keys #deep

## 题目

实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

> 在 Github 上查看：https://tsch.js.org/9/zh-CN

## 代码

```ts
/* _____________ 你的代码 _____________ */

type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>
}

```

关键解释：

- `readonly [P in keyof T]: ...` 用于将对象的每个属性设为只读。
- `keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>` 用于递归处理子对象。
- `keyof T[P] extends never` 用于判断 `T[P]` 是否为基础类型（不包含子对象）。
- `T[P]` 用于获取属性的类型。
- `DeepReadonly<T[P]>` 用于递归处理子对象。

## 相关知识点

### `readonly`

- 核心作用：标记后，目标（属性 / 数组 / 元组）只能在初始化阶段赋值（比如接口实例化、类构造函数、变量声明时），后续任何修改操作都会被 TS 编译器拦截报错；
- 运行时特性：`readonly` 仅做编译时检查，不会生成任何额外 JS 代码，也无法真正阻止运行时的修改（比如通过类型断言绕开的话，运行时仍能改）；
- 与 `const` 的区别：`const` 是变量层面的不可重新赋值（但变量指向的对象 / 数组内部属性仍可改），`readonly` 是属性 / 类型层面的不可修改（变量本身可重新赋值，除非变量也用 `const`）。

常用使用场景：

1. 作用于接口 / 类型别名的属性（最基础）

```ts
// 定义带只读属性的接口
interface User {
  readonly id: number; // 只读属性：只能初始化赋值，后续不可改
  name: string; // 普通属性：可修改
}

// 初始化时赋值（合法）
const user: User = { id: 1, name: "张三" };

// 尝试修改只读属性（报错）
user.id = 2; // ❌ 报错：无法分配到 "id"，因为它是只读属性
// 修改普通属性（合法）
user.name = "李四"; // ✅ 合法
```

2. 作用于类的属性: 类中使用 `readonly` 标记属性，只能在**声明时**或**构造函数中**赋值，后续无法修改

```ts
class Person {
  readonly id: number; // 只读属性
  name: string;

  // 构造函数中给 readonly 属性赋值（唯一合法的后续赋值方式）
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  updateInfo() {
    this.id = 100; // ❌ 报错：id 是只读属性
    this.name = "王五"; // ✅ 合法
  }
}

const person = new Person(1, "赵六");
person.id = 2; // ❌ 报错：只读属性不可修改
```

3. 作用于数组 / 元组（只读数组）: `readonly` 可标记数组为 “只读数组”，禁止修改数组元素、调用 `push/pop` 等修改方法

```ts
// 方式1：使用 readonly 修饰数组类型
const arr1: readonly number[] = [1, 2, 3];
arr1.push(4); // ❌ 报错：readonly 数组不存在 push 方法
arr1[0] = 10; // ❌ 报错：无法修改只读数组的元素

// 方式2：使用 ReadonlyArray<T> 类型（等价于 readonly T[]）
const arr2: ReadonlyArray<string> = ["a", "b"];
arr2.pop(); // ❌ 报错

// 作用于元组（只读元组）
type Point = readonly [number, number];
const point: Point = [10, 20];
point[0] = 30; // ❌ 报错：只读元组元素不可修改
```

4. 结合 `keyof` + `in` 批量创建只读类型（映射类型）

```ts
interface Product {
  name: string;
  price: number;
  stock: number;
}

// 批量创建只读版本的 Product（TS 内置的 Readonly<T> 就是这么实现的）
type ReadonlyProduct = {
  readonly [K in keyof Product]: Product[K];
};

const product: ReadonlyProduct = { name: "手机", price: 2999, stock: 100 };
product.price = 3999; // ❌ 报错：price 是只读属性

// TS 内置了 Readonly<T>，可直接使用（无需手动写映射类型）
const product2: Readonly<Product> = { name: "电脑", price: 5999, stock: 50 };
product2.stock = 60; // ❌ 报错
```

5. 只读索引签名：如果类型使用索引签名，也可以标记为 `readonly`，禁止通过索引修改属性

```ts
// 只读索引签名：只能读取，不能修改
type ReadonlyDict = {
  readonly [key: string]: number;
};

const dict: ReadonlyDict = { a: 1, b: 2 };
dict["a"] = 3; // ❌ 报错：索引签名是只读的
console.log(dict["b"]); // ✅ 合法：仅读取
```


### `keyof`

`keyof` 操作符用于获取对象类型的所有属性名（包括索引签名），并将其转换为联合类型。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = keyof Todo // "title" | "description" | "completed"
```

### `in`

`in` 操作符用于遍历联合类型中的每个成员。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = 'title' | 'description' | 'completed'

type TodoPreview = {
  [P in TodoKeys]: Todo[P]
}
// TodoPreview 类型为：
// {
//   title: string
//   description: string
//   completed: boolean
// }
```

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

## 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }

```

## 相关链接

> 分享你的解答：https://tsch.js.org/9/answer/zh-CN
> 查看解答：https://tsch.js.org/9/solutions
> 更多题目：https://tsch.js.org/zh-CN
