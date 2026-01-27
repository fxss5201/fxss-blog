---
title: 4 - 实现 Pick
order: 4
isOriginal: true
category:
  - type-challenges
date: 2025-04-28
---

4 - 实现 Pick
-------
by Anthony Fu (@antfu) #简单 #union #built-in

## 题目

不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

**从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

> 在 Github 上查看：https://tsch.js.org/4/zh-CN

## 代码

```ts
/* _____________ 你的代码 _____________ */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

```

关键解释：

- `T`：泛型参数，代表任意对象类型；
- `K extends keyof T`：约束 `K` 必须是 `T` 的属性名之一；
- `[P in K]: T[P]`：映射类型，遍历 `K` 中的每个属性名 `P`，并将 `T[P]` 作为 `P` 的类型。
  - `P in K`：遍历 `K` 中的每个属性名 `P`；
  - `T[P]`：获取 `T` 中属性 `P` 的类型。

## 相关知识点

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

### `extends`

`extends` 操作符用于约束泛型参数的类型范围。

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

## 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

```

## 相关链接

> 分享你的解答：https://tsch.js.org/4/answer/zh-CN
> 查看解答：https://tsch.js.org/4/solutions
> 更多题目：https://tsch.js.org/zh-CN
