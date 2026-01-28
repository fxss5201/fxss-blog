### `readonly`

- 核心作用：标记后，目标（属性 / 数组 / 元组）只能在初始化阶段赋值（比如接口实例化、类构造函数、变量声明时），后续任何修改操作都会被 TS 编译器拦截报错；
- 运行时特性：`readonly` 仅做编译时检查，不会生成任何额外 JS 代码，也无法真正阻止运行时的修改（比如通过类型断言绕开的话，运行时仍能改）；
- 与 `const` 的区别：`const` 是变量层面的不可重新赋值（但变量指向的对象 / 数组内部属性仍可改），`readonly` 是属性 / 类型层面的不可修改（变量本身可重新赋值，除非变量也用 `const`）。

常用使用场景：

1. 作用于接口 / 类型别名的属性（最基础）

```ts
// 定义带只读属性的接口
interface User {
  readonly id: number; // 只读属性：只能初始化赋值，后续不可改
  name: string; // 普通属性：可修改
}

// 初始化时赋值（合法）
const user: User = { id: 1, name: "张三" };

// 尝试修改只读属性（报错）
user.id = 2; // ❌ 报错：无法分配到 "id"，因为它是只读属性
// 修改普通属性（合法）
user.name = "李四"; // ✅ 合法
```

2. 作用于类的属性: 类中使用 `readonly` 标记属性，只能在**声明时**或**构造函数中**赋值，后续无法修改

```ts
class Person {
  readonly id: number; // 只读属性
  name: string;

  // 构造函数中给 readonly 属性赋值（唯一合法的后续赋值方式）
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  updateInfo() {
    this.id = 100; // ❌ 报错：id 是只读属性
    this.name = "王五"; // ✅ 合法
  }
}

const person = new Person(1, "赵六");
person.id = 2; // ❌ 报错：只读属性不可修改
```

3. 作用于数组 / 元组（只读数组）: `readonly` 可标记数组为 “只读数组”，禁止修改数组元素、调用 `push/pop` 等修改方法

```ts
// 方式1：使用 readonly 修饰数组类型
const arr1: readonly number[] = [1, 2, 3];
arr1.push(4); // ❌ 报错：readonly 数组不存在 push 方法
arr1[0] = 10; // ❌ 报错：无法修改只读数组的元素

// 方式2：使用 ReadonlyArray<T> 类型（等价于 readonly T[]）
const arr2: ReadonlyArray<string> = ["a", "b"];
arr2.pop(); // ❌ 报错

// 作用于元组（只读元组）
type Point = readonly [number, number];
const point: Point = [10, 20];
point[0] = 30; // ❌ 报错：只读元组元素不可修改
```

4. 结合 `keyof` + `in` 批量创建只读类型（映射类型）

```ts
interface Product {
  name: string;
  price: number;
  stock: number;
}

// 批量创建只读版本的 Product（TS 内置的 Readonly<T> 就是这么实现的）
type ReadonlyProduct = {
  readonly [K in keyof Product]: Product[K];
};

const product: ReadonlyProduct = { name: "手机", price: 2999, stock: 100 };
product.price = 3999; // ❌ 报错：price 是只读属性

// TS 内置了 Readonly<T>，可直接使用（无需手动写映射类型）
const product2: Readonly<Product> = { name: "电脑", price: 5999, stock: 50 };
product2.stock = 60; // ❌ 报错
```

5. 只读索引签名：如果类型使用索引签名，也可以标记为 `readonly`，禁止通过索引修改属性

```ts
// 只读索引签名：只能读取，不能修改
type ReadonlyDict = {
  readonly [key: string]: number;
};

const dict: ReadonlyDict = { a: 1, b: 2 };
dict["a"] = 3; // ❌ 报错：索引签名是只读的
console.log(dict["b"]); // ✅ 合法：仅读取
```
