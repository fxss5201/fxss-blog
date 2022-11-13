---
title: Vue cli 配置CDN及Gzip
isOriginal: true
category:
  - Vue
date: 2020-06-04
---

在Vue项目中，为了提升性能缩短首页的白屏时间（更具体的白屏时间可查看[Web 性能优化-首屏和白屏时间](https://lz5z.com/Web%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96-%E9%A6%96%E5%B1%8F%E5%92%8C%E7%99%BD%E5%B1%8F%E6%97%B6%E9%97%B4/)），我们可以通过将公共库采用CDN引入的方式以及将资源文件压缩的方式。

关于 配置CDN及Gzip 之后可从以下3个链接进行体验，在 Chrome 开发者工具 Network 中勾选 Disable Cache：

1. 未配置CDN及Gzip：<https://www.fxss.work/authorityRouter>
2. 配置CDN但未配置Gzip：<https://www.fxss.work/authorityRouterCdn>
3. 配置CDN及Gzip: <https://www.fxss.work/authorityRouterGzip>

不过由于 Gzip 压缩只有2个文件，所以 2 和 3 的差异不是很明显，不过也可以体验我的博客： <https://www.fxss.work/vue-blog/> ，已经配置CDN及Gzip。

## Vue项目中CDN的配置

在 vue.config.js 配置文件的 `chainWebpack` 中配置 `externals` ，`externals` 包含需要采用 CDN 方式的资源。

```js
module.exports = {
  ...
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      }
      config.externals(externals)
      const cdn = {
        css: [
          // element-ui css
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/theme-chalk/index.css'
        ],
        js: [
          // vue
          'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
          // vue-router
          'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.3/vue-router.min.js',
          // vuex
          'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.2/vuex.min.js',
          // axios
          'https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js',
          // element-ui js
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/index.js'
        ]
      }
      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
  }
  ...
}
```

上面采用的CDN练接是 [BootCDN](https://www.bootcdn.cn/) 的。

之后需要在 `public/index.html` 的 `head` 标签中增加：

```html
    <% if (process.env.NODE_ENV === 'production') { %>
      <% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
        <link rel="stylesheet" href="<%=css%>" as="style">
      <% } %>
      <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
        <script src="<%=js%>"></script>
      <% } %>
    <% } %>
```

上面之所以都是用正式环境，是因为开发环境还需要使用 Vue Devtools。

需要注意的是 **本地开发环境中使用的版本与正式环境的版本需要一致** ，可以查看 `package.json` 和 `package-lock.json` 中对应的版本号。

## Vue项目中Gzip的配置

Gzip的配置需要借助 [compression-webpack-plugin](https://www.npmjs.com/package/compression-webpack-plugin) 。

首先安装：

```npm
npm install compression-webpack-plugin --save-dev
```

然后在 `vue.config.js` 中做如下配置：

```js
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  ...
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    } else {
      // 开发环境
    }
  }
  ...
}
```

不过要使用扩展名为 .gz 的预压缩文件也需要服务器端进行对应的配置，nginx 的配置可参考 [nginx 配置 gzip_static](https://www.fxss.work/vue-blog/detail/99) 。
