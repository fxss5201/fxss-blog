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

`as` 操作符用于在映射类型中自定义属性名。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoKeys = 'title' | 'description' | 'completed'

type TodoPreview = {
  [P in TodoKeys as P extends 'description' ? never : P]: Todo[P]
}
// TodoPreview 类型为：
// {
//   title: string
//   completed: boolean
// }
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
