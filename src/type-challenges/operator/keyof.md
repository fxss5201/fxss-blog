---
title: ts keyof 操作符
isOriginal: true
category:
  - TypeScript
date: 2026-01-28
---

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
