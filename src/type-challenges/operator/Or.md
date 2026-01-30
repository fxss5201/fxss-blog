---
title: ts `|` 运算符
isOriginal: true
category:
  - TypeScript
date: 2026-01-29
---

### `|`

`|` 运算符用于表示联合类型，即一个值可以是多个类型中的任意一个。

1. 变量的联合类型注解

```ts
// 变量 a 可以是字符串 OR 数字
let a: string | number;

// 合法赋值（符合任意一种类型）
a = "TS";
a = 123;

// 非法赋值（不属于联合类型中的任何一种），TS 直接报错
a = true; // ❌ 类型 'boolean' 不能赋值给类型 'string | number'
```

2. 函数参数的联合类型

```ts
// 函数接收 string 或 number 类型的参数
function printValue(val: string | number) {
  console.log(val);
}

// 合法调用
printValue("hello");
printValue(666);

// 非法调用，TS 报错
printValue(null); // ❌
```

3. 数组的联合类型（注意两种写法的区别）

```ts
// 写法1：(A | B)[] —— 数组的「每个元素」可以是 A 或 B（混合数组）
let arr1: (string | number)[] = [1, "2", 3, "4"]; // 合法

// 写法2：A[] | B[] —— 「整个数组」要么全是 A 类型，要么全是 B 类型（纯数组）
let arr2: string[] | number[] = [1, 2, 3]; // 合法（全数字）
arr2 = ["1", "2", "3"]; // 合法（全字符串）
arr2 = [1, "2"]; // ❌ 报错：混合类型不符合要求
```

当使用联合类型的时候，访问某一个子类型的专属属性 / 方法时，需要进行类型守卫，可用的方法有 `typeof` 、`in` 、`switch` 、`instanceof` 。

1. `typeof`

```ts
function getLength(val: string | number) {
  // 类型窄化：判断 val 是 string 类型
  if (typeof val === "string") {
    // 此分支中，TS 确定 val 是 string，可安全使用 length
    return val.length;
  } else {
    // 此分支中，TS 确定 val 是 number，执行数字相关逻辑
    return val.toString().length;
  }
}

console.log(getLength("TS")); // 2
console.log(getLength(1234)); // 4
```

2. `in`

```ts
function printUserInfo(user: { name: string } | { age: number }) {
  // 类型窄化：判断 user 是否有 name 属性（即是否是 { name: string } 类型）
  if ("name" in user) {
    console.log(`Name: ${user.name}`);
  } else {
    // 此分支中，TS 确定 user 是 { age: number } 类型
    console.log(`Age: ${user.age}`);
  }
}
```

3. `switch`

```ts
interface User {
  type: "user";
  name: string;
  age: number;
}
interface Admin {
  type: "admin";
  name: string;
  permission: string[];
}
// 联合类型：可以是 User 或 Admin
type Person = User | Admin;
function printPerson(p: Person) {
  switch (p.type) {
    case "user":
      console.log(p.age); // 确定是 User
      break;
    case "admin":
      console.log(p.permission); // 确定是 Admin
      break;
  }
}
```

4. `instanceof`

```ts
// 定义两个类
class Dog {
  bark() { console.log("汪汪"); }
}
class Cat {
  meow() { console.log("喵喵"); }
}

// 联合类型：Dog 或 Cat 实例
type Animal = Dog | Cat;

// instanceof 类型守卫（针对类实例）
function animalCall(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

animalCall(new Dog()); // 汪汪
animalCall(new Cat()); // 喵喵
```
