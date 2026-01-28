---
title: 3 - 实现 Omit
order: 3
isOriginal: true
category:
  - type-challenges
date: 2025-04-29
---

3 - 实现 Omit
-------
by Anthony Fu (@antfu) #中等 #union #built-in

## 题目

不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```

> 在 Github 上查看：https://tsch.js.org/3/zh-CN

## 代码

```ts
/* _____________ 你的代码 _____________ */

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

```

关键解释：

- `T`：泛型参数，代表任意对象类型；
- `K extends keyof T`：约束 `K` 必须是 `T` 的属性名之一；
- `[P in keyof T as P extends K ? never : P]`：映射类型，遍历 `T` 的所有属性名 `P`，如果 `P` 不在 `K` 中，则保留 `P`，否则移除 `P`。
- `T[P]`：索引访问类型，代表 `T` 类型中 `P` 属性对应的类型。

## 相关知识点

### `keyof`

`keyof` 操作符用于获取一个类型（接口、类型别名、对象类型等）的所有公共属性名，并返回这些属性名组成的联合类型。

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

`in` 操作符用于遍历联合类型中的每个成员，将其转换为映射类型的属性名。

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

### `as`

`as` 是 TS 里的类型断言，手动告诉编译器某个值的具体类型。

**`as` 不会做任何运行时的类型转换，所以要确保你的断言是正确的，否则可能导致运行时错误。**

常用场景：

1. 基础用法：细化宽泛类型

```ts
// 场景1：unknown 类型细化（最常用）
let value: unknown = "Hello TypeScript";
// 编译器不知道 value 是字符串，直接调用 split 会报错
// value.split(" "); // ❌ 报错：对象的类型为 "unknown"

// 用 as 断言为 string，就能正常调用字符串方法
const strValue = value as string;
console.log(strValue.split(" ")); // ✅ ["Hello", "TypeScript"]

// 场景2：联合类型细化
type NumberOrString = number | string;
let numOrStr: NumberOrString = "123";

// 断言为 string，避免联合类型的类型限制
const str = numOrStr as string;
console.log(str.length); // ✅ 合法（string 有 length 属性）

// 场景3：any 类型细化（修复 any 导致的类型丢失）
let anyValue: any = { name: "张三", age: 20 };
const user = anyValue as { name: string; age: number };
console.log(user.name); // ✅ 类型安全，编辑器有自动提示
```

2. 非空断言（`as non-null`）：排除 `null/undefined`

TS 也提供了简写 `!`，本质是 `as non-null` 的语法糖。

```ts
// 场景：获取 DOM 元素（编译器默认推断返回 HTMLElement | null）
const el = document.getElementById("app");
// 直接访问 el.innerHTML 会报错，因为 el 可能是 null
// el.innerHTML = "Hello"; // ❌ 报错：对象可能为 "null"

// 用法1：用 as 断言为具体的 DOM 类型（排除 null + 指定具体类型）
const divEl = el as HTMLDivElement;
divEl.innerHTML = "Hello"; // ✅ 合法

// 用法2：简写 !（等价于 as non-null），仅排除 null/undefined
const el2 = document.getElementById("app")!;
el2.innerHTML = "World"; // ✅ 合法

// 用法3：显式断言为 non-null 类型
type NonNullEl = HTMLElement;
const el3 = el as NonNullEl; // 等价于 el as NonNullable<typeof el>
```

3. 类型重构 / 接口断言

```ts
// 定义接口
interface User {
  name: string;
  age: number;
}

// 后端返回的原始数据（类型为 any）
const rawData = { name: "李四", age: 25, extra: "无关字段" };

// 断言为 User 类型（忽略多余字段，只校验必要字段）
const user: User = rawData as User;
console.log(user.name, user.age); // ✅ 类型安全
```

4. 映射类型的键重映射: 修改 / 过滤映射类型遍历过程中的属性名

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = 'title' | 'description' | 'completed'

// 场景：过滤掉 description 属性
type TodoPreview = {
  [P in TodoKeys as P extends 'description' ? never : P]: Todo[P]
}
// TodoPreview 类型为：
// {
//   title: string
//   completed: boolean
// }
```

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = 'title' | 'description' | 'completed'

// 把 title 重命名为 todoTitle，过滤 description
type TodoPreviewRename = {
  [P in TodoKeys as P extends 'title' ? 'todoTitle' : (P extends 'description' ? never : P)]: Todo[P];
};
// 等价于：{ todoTitle: string; completed: boolean }
```

5. **双重断言**（慎用）

```ts
let num: number = 123;

// 直接断言为 boolean 会报错（类型不兼容）
// num as boolean; // ❌ 报错

// 双重断言：先转 any，再转 boolean（慎用！仅确认逻辑正确时用）
const bool = num as any as boolean;
console.log(bool); // 运行时还是 123，只是编译时类型为 boolean
```

## 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}

```

## 相关链接

> 分享你的解答：https://tsch.js.org/3/answer/zh-CN
> 查看解答：https://tsch.js.org/3/solutions
> 更多题目：https://tsch.js.org/zh-CN
