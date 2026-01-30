---
title: 12 - 可串联构造器
order: 12
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

12 - 可串联构造器
-------
by Anthony Fu (@antfu) #中等 #application

## 题目

在 JavaScript 中我们经常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给它赋上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 `get` 获取最终结果。

例如

```ts
declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
```

你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。

> 在 Github 上查看：https://tsch.js.org/12/zh-CN

## 代码

```ts
/* _____________ 你的代码 _____________ */

/**
 * 定义可串联构造器的类型
 * @template T 当前构造器对象的状态，默认为空对象
 */
type Chainable<T = {}> = {
  /**
   * 用于扩展或修改当前对象的方法
   * @template K 要添加或修改的键，必须是字符串类型
   * @template V 要添加或修改的值的类型
   * @param key 要添加或修改的键，根据情况可能为 never 或 K
   * @param value 要添加或修改的值
   * @returns 一个新的 Chainable 实例，包含更新后的对象状态
   */
  option: <K extends string, V>(key: K extends keyof T ? V extends T[K] ? never : K : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
  /**
   * 获取当前构造器对象的最终状态
   * @returns 当前对象的状态
   */
  get(): T
}

```

关键解释：

- `Chainable<T>`：泛型参数，代表当前构造器对象的状态，默认为空对象；
- `option(key, value)`：方法，用于扩展或修改当前对象的状态；
  - `K extends string`：约束 `K` 必须是字符串类型；
  - `V`：要添加或修改的值的类型；
  - `key: K extends keyof T ? V extends T[K] ? never : K : K`：约束 `key` 必须是 `T` 中不存在的属性名，或者 `value` 类型与 `T[K]` 不同的属性名；
  - `value: V`：要添加或修改的值；
  - `Chainable<Omit<T, K> & Record<K, V>>`：返回一个新的 `Chainable` 实例，包含更新后的对象状态；
- `get()`：方法，用于获取当前构造器对象的最终状态；
  - `T`：当前构造器对象的状态。

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

### `Omit`

`Omit<T, K>` 用于从类型 `T` 中排除 `K` 中的属性，返回一个新类型。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Omit<Todo, 'description'>
// TodoPreview 类型为：
// {
//   title: string
//   completed: boolean
// }
```

### `&`

`&` 交叉类型运算符用于将多个类型合并为一个新类型，它会将所有属性合并到新类型中。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Omit<Todo, 'description'> & {
  time: Date
}
// TodoPreview 类型为：
// {
//   title: string
//   completed: boolean
//   time: Date
// }
```

基础类型的交叉，只有类型完全一致时才会保留原类型，类型不一致时会得到 `never` 。

```ts
type A = number & string // never
type B = number & boolean // never
type C = number & symbol // never
type D = string & boolean // never
type E = string & symbol // never
type F = boolean & symbol // never
```

同名属性的类型冲突时，会得到 `never` 。

```ts
interface A {
  x: string; // 同名属性，类型 string
}
interface B {
  x: number; // 同名属性，类型 number
}

type C = A & B;
// C 的 x 类型为 string & number → never
const c: C = {
  x: 123, // 报错：类型 number 不能赋值给 never
  x: "abc" // 同样报错
};
```

### `Record`

`Record<K, T>` 是用于定义**键值对结构**对象类型，能快速指定对象的键类型和值的统一类型。

第一个参数 `K`（键类型）：必须是 `string` | `number` | `symbol` 及其子类型（比如字符串字面量、数字字面量、联合类型），否则会报错。
第二个参数 `T`（值类型）：可以是任意类型（基础类型、对象类型、函数类型等）。

1. 字符串键 + 基础类型值

```ts
// 用 Record 定义：键是 string，值是 number
type ScoreMap = Record<string, number>;
// 等价于手动写索引签名：{ [key: string]: number }
type ScoreMap2 = { [key: string]: number };

// 正确使用：所有键的值必须是数字
const studentScores: ScoreMap = {
  2: 90, // 数字字面量键会自动转为字符串，合法
  "李四": 85,
  wangwu: 95
};
```

2. 字面量联合键 + 基础类型值：用字符串 / 数字字面量联合类型作为键，定义**固定键、统一值类型**的映射表（如状态码、枚举映射、地区编码），TS 会严格校验键的合法性（只能是联合类型中的值）

```ts
// 固定键：联合类型（字符串字面量）
type UserRole = "admin" | "editor" | "visitor";
// Record 定义：键只能是 UserRole 中的值，值是 string（角色描述）
type RoleDesc = Record<UserRole, string>;

// 正确使用：必须包含所有固定键，值为字符串
const roleDescription: RoleDesc = {
  admin: "超级管理员，拥有所有权限",
  editor: "内容编辑，可修改文章",
  visitor: "游客，仅可查看内容"
};

// 错误示例1：缺少键（editor）→ TS 报错
const err1: RoleDesc = { admin: "xxx", visitor: "xxx" };
// 错误示例2：多余键（test）→ TS 报错
const err2: RoleDesc = { admin: "xxx", editor: "xxx", visitor: "xxx", test: "xxx" };
// 错误示例3：值类型错误（数字）→ TS 报错
const err3: RoleDesc = { admin: 123, editor: "xxx", visitor: "xxx" };
```

`Record` + `Partial` → 固定键，值类型可选（部分赋值）

```ts
type UserRole = "admin" | "editor" | "visitor";
// 需求：固定角色键，允许部分赋值（不是所有角色都需要写描述）
type PartialRoleDesc = Partial<Record<UserRole, string>>;

// 正确使用：可包含任意数量的键（0个、1个、多个、全部）
const emptyDesc: PartialRoleDesc = {}; // 正常
const partialDesc: PartialRoleDesc = { admin: "超级管理员" }; // 正常
const fullDesc: PartialRoleDesc = { admin: "xxx", editor: "xxx", visitor: "xxx" }; // 正常
```

## 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

```

## 相关链接

> 分享你的解答：https://tsch.js.org/12/answer/zh-CN
> 查看解答：https://tsch.js.org/12/solutions
> 更多题目：https://tsch.js.org/zh-CN
