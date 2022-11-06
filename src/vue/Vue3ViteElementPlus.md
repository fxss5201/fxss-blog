---
title: Vue3/Vite/Element Plus初体验
category:
  - Vue3
  - Vite
  - Element Plus
date: 2022-06-16
---

最近看完 Vue3 和 Vite 文档之后，就写了个小 [demo](https://github.com/vueBlog/viteblog) ，整体感觉下来还是很丝滑的。 

- [Vue3](https://v3.cn.vuejs.org/)
- [Vite中文网](https://vitejs.cn/)
- [Element Plus](https://element-plus.gitee.io/zh-CN/)

## Vue3 相关的

### script setup

首先说说组合式API，将对同一块操作的变量函数等放在一起，比如说搜索功能，将和搜索相关的功能集中一块（写出了以前写jQuery的感觉）。

其二在 script setup 中提供了另一种代码复用的写法，将代码逻辑封装，例如某个请求，在 script setup 中导入直接调用，返回对应的数据， script setup 中声明的变量可以直接在 template 中使用。如 [demo](https://github.com/vueBlog/viteblog) 中的 `src/views/pageHome.vue` 中的 `getAsideEvent` 和 `getArticleEvent` 即采用的是新的代码复用逻辑。

其三在 script setup 中无法使用 `this` ，并且像一些公共API `ref/reactive/watch/computed/...` 及生命周期钩子 `onBeforeMount/onMounted/onBeforeUpdate/onUpdated/onBeforeUnmount/onUnmounted/...` 等都需要手动导入（也可以通过`unplugin-auto-import`自动导入）。

### ref 和 reactive

`ref` 一般用于基础数据的响应式，`reactive` 一般用于引用数据的响应式，结合上面说到的同一块操作的变量放一起，总结如下：


```js
const count = ref(0)

const aside = reactive({
  loading: true,
  list: []
})

const list = reactive({
  loading: true,
  list: [],
  page: 1,
  total: 0
})
```

### vue-router 和 vuex

vue-router 和 vuex 需要导入并生成，后续使用和之前一样：

```js
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()
```

## Vite 和 Element Plus

vite 配置：

```js
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
// 自动导入按需组件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/viteblog/',
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // https://sass.bootcss.com/documentation/at-rules/use
        // Element Plus 中 scss 变量全局导入
        additionalData: `@use "@/styles/index.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    })
  ],
  server: {
    // 代理配置
    proxy: {
      '/api': {
        target: 'https://www.fxss.work',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
```

在 `package.json` 中的 `scripts` 添加 `"devF": "vite --force",` 脚本，用于重新构建依赖。

Element Plus 使用 [自动导入](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5) 功能，在其他页面中再使用 Element Plus 中的组件时都不需要再次导入，可以直接使用。

`src/styles/index.scss` 确保在项目中任何地方都可以使用 Element Plus 中的 scss 变量：

```css
@forward 'element-plus/theme-chalk/src/common/var.scss';
```

如果需要重新定义 Element Plus 中的主题色则使用如下：

```css
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': green,
    ),
  ),
);
```

## 感谢

本次分享到这里就结束了，**感谢您的阅读**！如对您有帮助，帮忙点个赞，您的点赞是我继续创作的动力。
