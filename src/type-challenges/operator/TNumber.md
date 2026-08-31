---
title: ts `T[number]` 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-01-30
---

### `T[number]`

`T[number]` 索引访问类型 用于 从数组类型 / 元组类型中提取所有元素的类型，最终得到一个联合类型。

1. 普通数组类型

```ts
// 定义普通数组类型
type StringArr = string[];
type NumberArr = number[];
type BoolArr = boolean[];

// T[number] 提取元素类型
type Str = StringArr[number]; // 结果：string
type Num = NumberArr[number]; // 结果：number
type Bool = BoolArr[number]; // 结果：boolean

// 等价于直接注解类型
let s: Str = "hello"; // 等同于 let s: string
let n: Num = 123;    // 等同于 let n: number
let b: Bool = true;  // 等同于 let b: boolean
```

2. 元组类型

```ts
// 定义一个多类型的元组类型
type Tuple = [123, "TS", true, null];

// T[number] 提取所有元素的联合类型
type TupleUnion = Tuple[number]; // 结果：123 | "TS" | true | null

// 变量注解：可以是联合类型中的任意一种
let val: TupleUnion;
val = 123;    // 合法
val = "TS";   // 合法
val = true;   // 合法
val = null;   // 合法
val = false;  // ❌ 报错：不在联合类型中
```

3. 字面量元组

```ts
// 字面量元组：元素是数字/字符串字面量
type StatusTuple = [200, 404, 500];
type EnvTuple = ["dev", "test", "prod"];

// 转字面量联合类型（开发中常用的枚举式类型）
type Status = StatusTuple[number]; // 结果：200 | 404 | 500
type Env = EnvTuple[number];       // 结果："dev" | "test" | "prod"

// 严格限制变量值，避免手写错误
let code: Status = 200; // 合法
code = 404;             // 合法
code = 403;             // ❌ 报错：403 不在 200|404|500 中

let env: Env = "dev";   // 合法
env = "prod";           // 合法
env = "production";     // ❌ 报错：不在联合类型中
```

4. `as const` + 数组 + `T[number]`

同时拥有数组的可遍历性 + 联合类型的严格类型约束。

```ts
// 步骤1：用 as const 断言数组为「只读字面量元组」
// 作用：让 TS 保留每个元素的字面量类型，且把数组转为只读元组（不可修改）
const EnvArr = ["dev", "test", "prod"] as const;
const StatusArr = [200, 404, 500] as const;

// 步骤2：用 typeof 获取数组的类型（只读字面量元组类型）
// 补充：typeof 是 TS 关键字，用于「从变量中提取其类型」
type EnvTuple = typeof EnvArr; // 类型：readonly ["dev", "test", "prod"]
type StatusTuple = typeof StatusArr; // 类型：readonly [200, 404, 500]

// 步骤3：用 T[number] 转成字面量联合类型
type Env = EnvTuple[number]; // 结果："dev" | "test" | "prod"
type Status = StatusTuple[number]; // 结果：200 | 404 | 500

// 简化写法（开发中常用，省略中间元组类型）
type EnvSimplify = typeof EnvArr[number];
type StatusSimplify = typeof StatusArr[number];
```

5. 泛型中使用 `T[number]`

```ts
// 泛型 T 约束为「只读数组」（兼容 as const 断言的数组）
function getUnionType<T extends readonly any[]>(arr: T): T[number] {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 传入 as const 断言的数组，返回值自动推导为字面量联合类型
const res1 = getUnionType(["dev", "test", "prod"] as const); // res1 类型："dev" | "test" | "prod"
const res2 = getUnionType([1, 2, 3] as const); // res2 类型：1 | 2 | 3

// 传入普通数组，返回值推导为基础类型
const res3 = getUnionType([1, 2, 3]); // res3 类型：number
```

6. 支持嵌套数组 / 元组

```ts
const NestedArr = [[1, "a"], [2, "b"]] as const;
type NestedUnion = typeof NestedArr[number]; // 结果：readonly [1, "a"] | readonly [2, "b"]
type DeepUnion = typeof NestedArr[number][number]; // 结果：1 | "a" | 2 | "b"
```
