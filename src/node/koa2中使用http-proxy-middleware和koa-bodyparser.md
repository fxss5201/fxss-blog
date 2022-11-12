---
title: koa2中使用http-proxy-middleware和koa-bodyparser
shortTitle: koa2/http-proxy-middleware/koa-bodyparser
isOriginal: true
category:
  - node
tag:
  - cmock
date: 2022-01-23
---

## 前言

最近在研究 node.js 代理方面的内容，希望借助代理实现 mock 文件的自动生成，这个后面会写篇文章集中介绍，本篇先汇总下在 koa2 中使用 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) ，至于为什么选择 http-proxy-middleware 作代理，因为 [Vue CLI](https://cli.vuejs.org/zh/config/#devserver-proxy) 就用的 http-proxy-middleware ，这样大家理解配置就更加方便了。

## koa2 中使用 http-proxy-middleware 和 koa-bodyparser

首先引入 koa 和 http-proxy-middleware：

```js
const Koa = require("koa");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = new Koa();
```

接下来查看 [http-proxy-middleware Express 示例](https://github.com/chimurai/http-proxy-middleware#example)，我把改成 koa 之后如下：

```js
app.use(
  "/api",
  createProxyMiddleware({
    target: "...",
    changeOrigin: true,
  })
);
```

但程序运行之后会报错，提示 `next is not a function` 等之类的报错，Express 中没有 next，所以肯定会报，那要怎么解决？

这个时候我们借助另一个插件：[koa-connect](https://www.npmjs.com/package/koa2-connect)，或者查看 [每天一个npm包：koa-connect](https://zhuanlan.zhihu.com/p/362369370)，koa-connect作用就是在 Koa2 中可以使用 Express 社区的中间件，起到了一个中转或者适配的作用。修改之后代码如下：

```js
const Koa = require("koa");
const k2c = require("koa2-connect");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = new Koa();
app.use(async (ctx, next) => {
  if (ctx.url.startsWith("/api")) {
    ctx.respond = false;
    await k2c(
      createProxyMiddleware({
        target: "...",
        changeOrigin: true
      })
    )(ctx, next);
  }
  await next();
});
```

这样 koa2 中就可以完美使用 http-proxy-middleware 了，但很快又出现了 http-proxy-middleware 和 koa-bodyparser 冲突的问题，在 http-proxy-middleware 文档中我们查看 <https://github.com/chimurai/http-proxy-middleware#intercept-and-manipulate-requests> ，里面有介绍使用如下方案修复：

```js
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
  /**
   * Fix bodyParser
   **/
  onProxyReq: fixRequestBody,
});
```

但我在 koa 中使用依然会报错，不清楚错在哪里，如果有知道哪里不对请指出，谢谢：

```js
const Koa = require("koa");
const k2c = require("koa2-connect");
const bodyParser = require("koa-bodyparser");
const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");
const app = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
  if (ctx.url.startsWith("/api")) {
    ctx.respond = false;
    await k2c(
      createProxyMiddleware({
        target: "...",
        changeOrigin: true,
        onProxyReq: fixRequestBody,
      })
    )(ctx, next);
  }
  await next();
});
```

细看 which is used to fix proxied POST requests when `bodyParser` is applied before this middleware ，那意思就是 bodyParser 用在 middleware 之前才会报错喽，bodyParser 移动到 middleware 之后果然好了，下面附最终完整代码：

```js
const Koa = require("koa");
const k2c = require("koa2-connect");
const bodyParser = require("koa-bodyparser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = new Koa();
app.use(async (ctx, next) => {
  if (ctx.url.startsWith("/api")) {
    ctx.respond = false;
    await k2c(
      createProxyMiddleware({
        target: "...",
        changeOrigin: true
      })
    )(ctx, next);
  }
  await next();
});
app.use(bodyParser());
```

## 感谢

本次分享到这里就结束了，**感谢您的阅读**！如对您有帮助，帮忙点个赞，您的点赞是我继续创作的动力。
