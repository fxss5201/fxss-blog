---
title: nuxt.js + pm2 部署
isOriginal: true
category:
  - Vue
  - Nuxt
date: 2020-04-06
---

对于 nuxt 项目，一般采用官方提供的 [create-nuxt-app](https://github.com/nuxt/create-nuxt-app) 脚手架，具体过程 <https://zh.nuxtjs.org/guide/installation/> 。

1. 在实际开发中一般使用 `npm run dev` 其本地服务进行开发
2. 发布部署的时候首先需要 `npm run build` （相当于 `nuxt build` ） 利用webpack编译应用，压缩JS和CSS资源
3. 之后将文件上传到指定的服务器
4. 需要 `npm run start` （相当于 `cross-env NODE_ENV=production node server/index.js` ）

对第4步进行说明，如果使用了 Koa/Express 等 Node.js Web 开发框架，并使用了 Nuxt 作为中间件，可以自定义 Web 服务器的启动入口：

|命令|描述|
|-|-|
|`NODE_ENV=development nodemon server/index.js`|启动一个热加载的自定义 Web 服务器（开发模式）。|
|`NODE_ENV=production node server/index.js`|以生产模式启动一个自定义 Web 服务器 (需要先执行 nuxt build)。|

至于 [cross-env](https://www.npmjs.com/package/cross-env) 是运行跨平台设置和使用环境变量的脚本。

当我们以对应服务启动生产模式的 nuxt 项目的时候，可以正常访问（我这里都是采用 nginx 配置的代理），但是当我们关闭命令行窗口的时候，服务也就关闭了，所以这个时候我们需要使用 pm2 。

使用 pm2 启动 nuxt 项目：

1. 先到服务器项目的根目录下
2. `pm2 start npm --name "name" -- run start`

对第2步进行说明，这里设置的 name 之后可以在 `pm2 list` 进行查看，并且之后可以通过 `pm2 start name` 或 `pm2 stop name` 对服务进行开关。

pm2 常用的命令行：

```sh
# 查看当前正在运行的进程
pm2 list
# 启动所有应用
pm2 start id|name|all
# 重启所有应用
pm2 restart id|name|all
# 停止所有的应用程序
pm2 stop id|name|all
# 关闭并删除所有应用
pm2 delete id|name|all
# 控制台显示所有日志
pm2 logs
# 控制台显示指定编号的日志
pm2 logs id
# 查看信息
pm2 show id|name
# 显示每个应用程序的CPU和内存占用情况
pm2 monit
```
