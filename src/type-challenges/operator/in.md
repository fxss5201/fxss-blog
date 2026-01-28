---
title: ts in 操作符
isOriginal: true
category:
  - TypeScript
date: 2026-01-28
---

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
