---
title: 3057 - Push
order: 3057
isOriginal: true
category:
  - type-challenges
date: 2025-04-28
---

3057 - Push
-------
by jiangshan (@jiangshanmeta) #简单 #array

### 题目

在类型系统里实现通用的 ```Array.push``` 。

例如：

```typescript
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

> 在 Github 上查看：https://tsch.js.org/3057/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type Push<T extends unknown[], U> = [...T, U]

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/3057/answer/zh-CN
> 查看解答：https://tsch.js.org/3057/solutions
> 更多题目：https://tsch.js.org/zh-CN
