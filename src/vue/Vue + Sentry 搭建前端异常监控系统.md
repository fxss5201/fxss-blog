---
title: Vue + Sentry 搭建前端异常监控系统
shortTitle: Vue + Sentry
isOriginal: true
category:
  - Vue
tag:
  - Sentry
date: 2020-07-20
---

## Sentry账号及SDK语言选择

1. 注册账号：<https://sentry.io/for/vue/>
2. 选择平台：Sentry通过官方的Sentry SDK与许多不同的语言和平台集成。本项目选择 Vue 。

## 安装Sentry SDK

1. 安装Sentry的浏览器JavaScript SDK：`@sentry/browser` : `yarn add @sentry/browser` 或者 `npm install @sentry/browser` ，之后`@sentry/browser` 将报告通过应用程序捕获触发的任何异常，Vue 主要 [config.errorHandler](https://cn.vuejs.org/v2/api/#errorHandler) 钩子报告的。

2. 还需要安装 `@sentry/integrations`: `yarn add @sentry/integrations` 或者 `npm install @sentry/integrations`

## 集成进项目

1. 本地依赖

```js
import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

Sentry.init({
  dsn: '',  // 这里的配置参数是因人而异的
  integrations: [new VueIntegration({Vue, attachProps: true})],
});
```

`init` 初始化参数：

   1. `dsn` ：错误上传地址
   2. `debug`：调试模式，默认值：`false`。
   3. `release`：发布版本。
   4. `environment`：设置环境变量。

其他更多配置可查看<https://docs.sentry.io/error-reporting/configuration/?platform=browsernpm>。

`Integrations.Vue` 参数配置：

   * Vue：选填，如果未设置，在 `window.Vue` 必须存在
   * attachProps：选填，默认值为：`true`。如果将其设置为 `false` ，Sentry将禁止发送所有Vue组件的信息
   * logErrors：选填，默认值为：`false`。如果将其设置为 `true` ，Sentry也将调用原始Vue `logError`函数

2. CDN依赖

```html
<!-- Note that we now also provide a es6 build only -->
<!-- <script src="https://browser.sentry-cdn.com/5.18.0/bundle.es6.min.js" integrity="sha384-3tylvoYHunrYvs6gYUGcjiDdNVciKzdurMpaRI9Jj6XYPGbVp9TnD+UwfopKyJ4q" crossorigin="anonymous"></script> -->
<script src="https://browser.sentry-cdn.com/5.18.0/bundle.min.js" integrity="sha384-9M0M/t9hmfACAyfoyFXXyzRbljCren5OjRJhHwZHJzuzFt02ZB67XZO27O1tml6L" crossorigin="anonymous"></script>

<!-- If you include the integration it will be available under Sentry.Integrations.Vue -->
<script src="https://browser.sentry-cdn.com/5.18.0/vue.min.js" crossorigin="anonymous"></script>

<script>
Sentry.init({
  dsn: '',
  integrations: [new Sentry.Integrations.Vue({Vue, attachProps: true})],
});
</script>
```

3. source maps

   1. 安装webpack插件

   ```
   npm install --save-dev @sentry/webpack-plugin
   yarn add --dev @sentry/webpack-plugin
   ```

   2. 项目添加
    ```js
    // vue.config.js
    const SentryPlugin = require('@sentry/webpack-plugin')

    module.exports = {
      ...
      productionSourceMap: true,
      ...
      configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
          ...
          config.plugins.push(
            new SentryPlugin({
              include: './dist/',
              release: process.env.RELEASE_VERSION, // 一致的版本号
              configFile: 'sentry.properties', // 不用改
              ignore: ['node_modules', 'webpack.config.js'],
              urlPrefix: '~/vue-blog/' // 这里指的你项目需要观测的文件如果你的项目有publicPath这里加上就对了
            })
          }
        }
      }
      ...
    }

    // main.js
    if (process.env.NODE_ENV === 'production') {
      Sentry.init({
        dsn: 'https://53e44732a0fd4c398fe614fd058f1668@o412908.ingest.sentry.io/5296080',
        debug: true,
        release: process.env.RELEASE_VERSION,
        environment: process.env.NODE_ENV,
        integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })]
      })
    }

    // 根目录添加 .env.production
    RELEASE_VERSION ="test001"

    // 根目录添加 .sentryclirc
    [auth]
    token=e6997910a3bd4be3bb3cf02813103ddd189c87af7c4a4ddc95a5363ab6f15cf0

    [defaults]
    url=https://sentry.io
    org=fxss-work // 组织名称
    project=vue-blog // 项目名称
    ```
