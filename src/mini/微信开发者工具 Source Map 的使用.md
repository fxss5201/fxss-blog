---
title: 微信开发者工具 Source Map 的使用
shortTitle: Source Map
isOriginal: true
category:
  - 小程序
tag:
  - Source Map
date: 2021-12-11
---

在小程序后台 -》开发管理 -》运维中心 -》 错误日志 中可以看到小程序运行中的报错信息，但是代码都是压缩混淆的，那就需要如何去定位，下面说明说如使用微信开发者工具 Source Map。

1. 下载微信开发者工具

[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

2. 下载sourceMap文件

在小程序后台 -》开发管理 -》运维中心 -》错误日志 可以下载线上最新版本的 Source Map 文件。
![screenshot20211211145706.png](https://img.fxss.work/article-163920586000050-production.png)

下载的 sourceMap 的目录和文件说明：

```
1. `APP` 是主包，`FULL` 是整包（仅在不支持分包的低版本微信中使用），其他目录是分包。
2. 每个分包下都有对应的 `app-service.js.map` 文件。
3. 如果是使用了按需注入特性（`app.json`中配置了`lazyCodeLoading`），那么每个分包下还会有 `appservice.app.js.map`（对应分包下非页面的js），和所有页面的 `xxx.js.map`。
```

3. 查看错误信息，如果错误信息为`https://components/......`，则一般对应为主目录下`components`组件文件，并且后面标注的就是具体的`行号:列号`，如果错误信息结尾是`......app-service.js`，则一般为主包或者分包下的错误，找到发生错误对应的分包，选择分包的map文件。

4. 打开下载的 sourceMap 中有个 wx 字段，标明了该 sourceMap 文件对应小程序版本号。

![screenshot20211211151059.png](https://img.fxss.work/article-163920668500054-production.png)

其中 userVersion 未上传是填的版本号， userNotes 为项目备注。

5. 下载 sourceMap 匹配调试器

打开微信开发者工具，在菜单栏选择"设置 -》通用设置 -》扩展 -》调试器插件"，进入插件下载页面，添加sourcemap匹配调试插件。添加成功后，即可在调试器使用该插件。

![screenshot20211211151533.png](https://img.fxss.work/article-163920694800035-production.png)

6. 打开对应的项目，切换到上个发布分支，从上个发布分支新开 hotfix 分支，打开 调试器 -》sourcemap

![screenshot20211211151626.png](https://img.fxss.work/article-163920713300031-production.png)

选择对应的 map 文件，第二个输入框填入对应的错误信息中的 行号:列号 ，点击匹配，可直接跳转到对应文件对应的行数。
