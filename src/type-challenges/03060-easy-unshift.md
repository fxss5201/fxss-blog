---
title: 3060 - Unshift
order: 3060
isOriginal: true
category:
  - type-challenges
date: 2025-04-28
---

3060 - Unshift
-------
by jiangshan (@jiangshanmeta) #简单 #array

### 题目

实现类型版本的 ```Array.unshift```。

例如：

```typescript
type Result = Unshift<[1, 2], 0> // [0, 1, 2]
```

> 在 Github 上查看：https://tsch.js.org/3060/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Unshift<T extends unknown[], U> = [U, ...T]

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/3060/answer/zh-CN
> 查看解答：https://tsch.js.org/3060/solutions
> 更多题目：https://tsch.js.org/zh-CN
