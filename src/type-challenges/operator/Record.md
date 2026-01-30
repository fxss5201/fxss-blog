---
title: ts `Record` 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-01-30
---

### `Record`

`Record<K, T>` 是用于定义**键值对结构**对象类型，能快速指定对象的键类型和值的统一类型。

第一个参数 `K`（键类型）：必须是 `string` | `number` | `symbol` 及其子类型（比如字符串字面量、数字字面量、联合类型），否则会报错。
第二个参数 `T`（值类型）：可以是任意类型（基础类型、对象类型、函数类型等）。

1. 字符串键 + 基础类型值

```ts
// 用 Record 定义：键是 string，值是 number
type ScoreMap = Record<string, number>;
// 等价于手动写索引签名：{ [key: string]: number }
type ScoreMap2 = { [key: string]: number };

// 正确使用：所有键的值必须是数字
const studentScores: ScoreMap = {
  2: 90, // 数字字面量键会自动转为字符串，合法
  "李四": 85,
  wangwu: 95
};
```

2. 字面量联合键 + 基础类型值：用字符串 / 数字字面量联合类型作为键，定义**固定键、统一值类型**的映射表（如状态码、枚举映射、地区编码），TS 会严格校验键的合法性（只能是联合类型中的值）

```ts
// 固定键：联合类型（字符串字面量）
type UserRole = "admin" | "editor" | "visitor";
// Record 定义：键只能是 UserRole 中的值，值是 string（角色描述）
type RoleDesc = Record<UserRole, string>;

// 正确使用：必须包含所有固定键，值为字符串
const roleDescription: RoleDesc = {
  admin: "超级管理员，拥有所有权限",
  editor: "内容编辑，可修改文章",
  visitor: "游客，仅可查看内容"
};

// 错误示例1：缺少键（editor）→ TS 报错
const err1: RoleDesc = { admin: "xxx", visitor: "xxx" };
// 错误示例2：多余键（test）→ TS 报错
const err2: RoleDesc = { admin: "xxx", editor: "xxx", visitor: "xxx", test: "xxx" };
// 错误示例3：值类型错误（数字）→ TS 报错
const err3: RoleDesc = { admin: 123, editor: "xxx", visitor: "xxx" };
```

`Record` + `Partial` → 固定键，值类型可选（部分赋值）

```ts
type UserRole = "admin" | "editor" | "visitor";
// 需求：固定角色键，允许部分赋值（不是所有角色都需要写描述）
type PartialRoleDesc = Partial<Record<UserRole, string>>;

// 正确使用：可包含任意数量的键（0个、1个、多个、全部）
const emptyDesc: PartialRoleDesc = {}; // 正常
const partialDesc: PartialRoleDesc = { admin: "超级管理员" }; // 正常
const fullDesc: PartialRoleDesc = { admin: "xxx", editor: "xxx", visitor: "xxx" }; // 正常
```
