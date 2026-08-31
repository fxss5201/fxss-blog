---
title: 14 - 第一个元素
order: 14
isOriginal: true
category:
  - type-challenges
date: 2025-04-28
---

14 - 第一个元素
-------
by Anthony Fu (@antfu) #简单 #array

## 题目

实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
```

> 在 Github 上查看：https://tsch.js.org/14/zh-CN

## 代码

```ts
/* _____________ 你的代码 _____________ */

type First<T extends unknown[]> = T extends [] ? never : T[0]

```

关键解释：

1. `T extends unknown[]` 用于约束 `T` 必须是一个数组类型。
2. `T extends []` 用于判断数组是否为空。
3. `T[0]` 用于获取数组的第一个元素。
4. `never` 用于表示空数组的情况。

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

## 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

```

## 相关链接

> 分享你的解答：https://tsch.js.org/14/answer/zh-CN
> 查看解答：https://tsch.js.org/14/solutions
> 更多题目：https://tsch.js.org/zh-CN
