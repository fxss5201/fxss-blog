---
title: cmock 可视化操作
isOriginal: true
category:
  - node
tag:
  - cmock
date: 2022-04-04
---

> [cmock 使用指导](https://www.fxss.work/blogNuxt/detail/155)

[cmock](https://github.com/fxss5201/cmock) 主要将接口相关配置保存在本地 js 文件中，结构如下：

```js
module.exports = {
  name: "$name", // 接口名称
  url: "$url", // 接口的 url
  method: "$method", // 接口方法
  type: "$type", // 接口对应的 response.type
  createTime: "$createTime", // mock 文件创建时间
  updateTime: "$updateTime", // mock 文件最后更新时间，如果手动更新 mock 文件，改时间可能不准确
  isUseMockjs: false, // 是否使用 mockjs 生成返回的数据，需要在 body 中配置 mockTemplate 
  timeout: 0, // 多久时间返回数据，用于模拟等待时间，方便前端加加载状态
  bodyKey: {}, // 内部使用，误删
  body: { // 用于存放接口数据结构
    接口参数（仅包含 package.json needParams 中配置的参数）: 接口数据结构
    mockTemplate // 用于 mock.js 生成数据
  },
}
```

之前主要的操作使用命令行或者直接修改文件，命令行如下：

| 命令行 | 功能 |
|----|----|
| `cmock add` / `cmock a` | 新增 mock 文件 |
| `cmock delete` / `cmock d` | 删除 mock 文件 |
| `cmock language` / `cmock lang` | 切换语言 |
| `cmock author` | 作者github信息 |
| `cmock github` | 项目github地址 |

直接操作文件会导致更新时间不准确的问题，所以最近新增了可视化操作。

在项目目录下：

```
npm install

// 创建 mock 文件
npm run create

// 起 mock 服务
npm run dev
```

再在项目 view 目录下：

```
npm install

// 可视化服务
npm run dev
```

项目会占用 8888/8889/8890 三个端口，可视化界面如下：

![可视化操作界面](https://img.fxss.work/article-164907137000013-production.png)

可视化功能包含如下：

1. 右上角搜索服务，支持搜索接口名称、接口url、接口mock文件名
2. 右上角新增接口mock文件
3. 左侧菜单对应配置的 mock 文件目录中的 mock 文件
4. 修改接口配置mock文件
5. 删除接口mock文件
6. 尝试发送接口请求，及时预览接口返回结果

可视化操作界面使用 vite + vue3 + ts ，界面和服务通过 socket 连接。
