---
title: minimal-mock 极简 mock 服务
isOriginal: true
category:
  - node
tag:
  - mockjs
  - koa
date: 2023-03-04
---

minimal-mock 极简 mock 服务，采用 [koa](https://github.com/koajs/koa) 搭建，支持全局配置及多种数据格式。

> 什么是 Mock 数据：在前后端约定好 API 接口以后，前端可以使用 Mock 数据来在本地模拟出 API 应该要返回的数据，这样一来前后端开发就可以同时进行，不会因为后端 API 还在开发而导致前端的工作被阻塞。

## 全局配置

注意对 `package.json` 文件增加了两个自定义：

```js
// package.json

  "port": "8888", // 定义 mock 端口及代理配置
  "timeout": "1000", // 定义 mock 接口返回数据的时间，可以方便调节 loading 状态
```

## 目录约定

约定 `/mock` 目录下的所有文件为 Mock 文件，例如这样的目录结构：

```
.
├── mock
    ├── todos.js
    ├── items.js
    └── users.js
└── src
    └── pages
```

则 `/mock` 目录中的 `todos.js`, `items.js` 和 `users.js` 就会被视为 Mock 文件来处理。

## Mock 文件

Mock 文件默认导出一个对象，而对象的每个 Key 对应了一个 Mock 接口，值则是这个接口所对应的返回数据，例如这样的 Mock 文件：

key 的定义如下 `请求方法 请求路由 请求时间`，**key 是通过空格划分不同标识的，所以请勿添加无意义的空格**。请求方法不区分大小写，当请求方式为 `GET`/`get` 时可省略，请求时间可省略。

```js
// ./mock/users.js

module.exports = {
  // 返回值可以是数组形式
  'GET /api/users': [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ],
  // 返回值也可以是对象形式
  'GET /api/users/1': {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
};
```

就声明了两个 Mock 接口，透过 `GET /api/users` 可以拿到一个带有两个用户数据的数组，透过 `GET /api/users/1` 可以拿到某个用户的模拟数据。

## 请求方法

当 Http 的请求方法是 GET 时，可以省略方法部分，只需要路径即可，例如：

```js
// ./mock/users.js

module.exports = {
  '/api/users': [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ],
};
```

也可以用不同的请求方法，例如 `POST`，`PUT`，`DELETE`：

```js
// ./mock/users.js

module.exports = {
  'POST /api/users': [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ],
};
```

## 请求时间

`package.json` 文件中定义的 `timeout` 为全局接口返回数据需要的时间 1000 毫秒。

```js
// package.json
  "timeout": "1000", // 定义 mock 接口返回数据需要的时间，可以方便调节 loading 状态
```

minimal-mock 也支持单独配置，配置方式是在 Mock 文件默认导出的对象 key 属性上定义：

```js
module.exports = {
  // 返回值也可以是对象形式
  'GET /api/users/1 0': {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  // 自定义函数
  'GET /api/users/2 2000': (ctx) => {
    ctx.body = {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    };
  },
};
```

`/api/users/1` 立即返回，`/api/users/2` 2000 毫秒返回。

## 自定义函数

除了直接静态声明返回值，也可以用函数的方式来声明如何计算返回值，例如：

```js
module.exports = {
  // 自定义函数
  'GET /api/users/2': (ctx) => {
    ctx.body = {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    };
  },
};
```

minimal-mock 底层使用的是 [koa](https://github.com/koajs/koa) ，更多 API 查看 [koa](https://github.com/koajs/koa) 。

## 引入 Mock.js

在 Mock 中我们经常使用 [Mock.js](http://mockjs.com/) 来帮我们方便的生成随机的模拟数据：

```js
const Mock = require('mockjs');

module.exports = {
  'GET /api/usersList': (ctx) => {
    const total = 120;
    const page = ctx.query.page;
    const pageSize = ctx.query.pageSize;
    let mockSize = pageSize;
    if (page * pageSize > total && (page - 1) * pageSize < total) {
      mockSize = total - (page - 1) * pageSize;
    }
    const mocklist = Mock.mock({
      [`list|${mockSize}`]: [
        {
          // 属性 key 是一个自增数，起始值为 1，每次增 1
          'key|+1': (page - 1) * pageSize + 1,
          name: () => Mock.Random.cname(),
          age: () => Mock.Random.natural(),
          address: () => Mock.Random.county(true),
        },
      ],
    });
    ctx.body = {
      list: mocklist.list,
      total,
    };
  },
};
```

如上是一个简单的分页展示信息。
