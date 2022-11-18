---
title: Nuxt.js 部署
isOriginal: true
category:
  - Vue
tag:
  - Nuxt
date: 2020-06-26
---

本篇文章主要用于记录一次 Nuxt.js 部署失败的问题，原来本博客系统的移动端 [樊小书生的博客](https://www.fxss.work/blogNuxtM/) 部署在 9000 端口，这次打算更换为 8088 端口，结果按照官方的 [服务端渲染应用部署](https://zh.nuxtjs.org/guide/commands/#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E5%BA%94%E7%94%A8%E9%83%A8%E7%BD%B2) 一直报 `This page could not be found` 的问题，试了好多次重新部署都没有作用。

最后是将 `.nuxt`/`server`/`static`/`.env`/`nuxt.config.js`/`package.json` 等文件一起上传，然后 `pm2 start ...` 之后就好了，看来使用了 [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module#readme) 来配置环境变量的话还需要引入 `.env` 环境变量文件。
