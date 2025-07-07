---
title: 9286 - FirstUniqueCharIndex
order: 9286
isOriginal: true
category:
  - type-challenges
date: 2025-07-07
---

9286 - FirstUniqueCharIndex
-------
by jiangshan (@jiangshanmeta) #中等 #string

### 题目

Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

> 在 Github 上查看：https://tsch.js.org/9286/zh-CN

### 代码

```ts
/* _____________ 你的代码 _____________ */

type FirstUniqueCharIndex<
  T extends string,
  _Acc extends string[] = [],
> = T extends ''
  ? -1
  : T extends `${infer Head}${infer Rest}`
    ? Head extends _Acc[number]
      ? FirstUniqueCharIndex<Rest, [..._Acc, Head]>
      : Rest extends `${string}${Head}${string}`
        ? FirstUniqueCharIndex<Rest, [..._Acc, Head]>
        : _Acc['length']
    : never

```

### 测试用例

```ts
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

```

### 相关链接

> 分享你的解答：https://tsch.js.org/9286/answer/zh-CN
> 查看解答：https://tsch.js.org/9286/solutions
> 更多题目：https://tsch.js.org/zh-CN
