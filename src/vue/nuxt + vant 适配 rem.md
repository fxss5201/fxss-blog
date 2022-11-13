---
title: nuxt + vant 适配 rem
isOriginal: true
category:
  - Vue
  - Nuxt
  - Vant
  - rem
date: 2020-03-07
---

## 创建项目

```npm
npx create-nuxt-app <项目名>
```

详情查看 [安装-NuxtJS](https://zh.nuxtjs.org/guide/installation#%E8%BF%90%E8%A1%8C-create-nuxt-app)

## 安装vant

```npm
npm i vant -S
```

### 引入vant

这里采用的是： 导入所有组件

在根目录的 `plugins` 目录下创建 `vant.js` ，内容如下：

```js
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
```

在 `nuxt.config.js` 中引入：

```js
module.exports = {
  ...
  plugins: [
    {
      src: '~/plugins/vant.js'
    }
  }
  ...
}
```

### Rem 适配

```npm
npm install postcss-pxtorem autoprefixer --save-dev

npm i -S amfe-flexible
```

在根目录的 `plugins` 目录下创建 `lib-flexible.js` ，内容如下：

```js
import 'amfe-flexible'
```

然后在 `nuxt.config.js` 添加如下配置

```js
module.exports = {
  ...
  head: {
    ...
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      }
      ...
    }
    ...
  }
  ...
  plugins: [
    {
      src: '~/plugins/vant.js'
    },
    {
      src: '~/plugins/lib-flexible.js',
      mode: 'client'
    }
  }
  ...
  build: {
    ...
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 37.5,
          propList: ['*']
        }
      },
      preset: {
        autoprefixer: true
      }
    }
    ...
  }
}
```

可以在 `package.json` 中配置 `browserslist`:

```json
{
  ...
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
  ...
}
```
