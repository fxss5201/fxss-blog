---
title: ts `&` 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-01-29
---

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
