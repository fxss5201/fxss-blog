---
title: 2946 - ObjectEntries
order: 2946
isOriginal: true
category:
  - type-challenges
date: 2025-04-30
---

2946 - ObjectEntries
-------
by jiangshan (@jiangshanmeta) #中等 #object

### 题目

Implement the type version of ```Object.entries```

For example

```typescript
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
```

> 在 Github 上查看：https://tsch.js.org/2946/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type ObjectEntries<T extends object, K extends keyof T = keyof T> = K extends K ? [K, T[K] extends undefined ? undefined : Required<T>[K]] : never

// type ObjPartial = Partial<Model>
// type A = Required<ObjPartial>['name']
// type B = ObjPartial['name']

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/2946/answer/zh-CN
> 查看解答：https://tsch.js.org/2946/solutions
> 更多题目：https://tsch.js.org/zh-CN
