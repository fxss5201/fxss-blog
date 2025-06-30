---
title: 3192 - Reverse
order: 3192
isOriginal: true
category:
  - type-challenges
date: 2025-05-07
---

3192 - Reverse
-------
by jiangshan (@jiangshanmeta) #中等 #tuple

### 题目

实现类型版本的数组反转 ```Array.reverse```

例如：

```typescript
type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

> 在 Github 上查看：https://tsch.js.org/3192/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Reverse<T extends any[]> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : T

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/3192/answer/zh-CN
> 查看解答：https://tsch.js.org/3192/solutions
> 更多题目：https://tsch.js.org/zh-CN
