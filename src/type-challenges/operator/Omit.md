---
title: ts Omit 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-01-29
---

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
