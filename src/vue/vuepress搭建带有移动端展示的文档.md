---
title: vuepress搭建带有移动端展示的文档
shortTitle: vuepress搭建文档
isOriginal: true
category:
  - Vue3
tag:
  - vuepress
date: 2022-05-30
---

[VuePress](https://v2.vuepress.vuejs.org/zh/) 是一个以 Markdown 为中心的静态网站生成器。你可以使用 Markdown 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。

本文是使用 vuepress 搭建类似于 [vant](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart) 文档，右侧带有移动端展示。先看下成果：[shop-m使用文档](https://shop-template.github.io/shop-m-docs/guide/getting-started.html) ，左侧是文档，右侧带有移动端展示，且会根据不同的文档页面，移动端跳转到对应的页面展示。

## VuePress自定义

VuePress 提供的默认主题就挺好的，我们使用 [布局插槽](https://v2.vuepress.vuejs.org/zh/reference/default-theme/extending.html#%E5%B8%83%E5%B1%80%E6%8F%92%E6%A7%BD) 来完成我们的功能。

默认主题的 `Layout` 布局提供了一些插槽：

1. `navbar`
2. `navbar-before`
3. `navbar-after`
4. `sidebar`
5. `sidebar-top`
6. `sidebar-bottom`
7. `page`
8. `page-top`
9. `page-bottom`
10. `page-content-top`
11. `page-content-bottom`

在它们的帮助下，你可以很容易地添加或替换内容。下面通过一个示例来介绍一下如何使用布局插槽来继承默认主题。

首先，创建你的本地主题 `docs/.vuepress/theme/index.js` :

```js
const { defaultTheme } = require('vuepress')
const { path } = require('@vuepress/utils')

module.exports = {
  localTheme: (options) => {
    return {
      name: 'vuepress-theme-local',
      extends: defaultTheme(options),
      layouts: {
        Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
      },
    }
  }
}
```

这样你的本地主题将会继承默认主题，并且覆盖 Layout 布局。

接下来，创建 `docs/.vuepress/theme/layouts/Layout.vue` ，并使用由默认主题的 Layout 布局提供的插槽：

```html
<script setup>
import { watch, ref, nextTick } from 'vue'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { useRouter, useRoute } from 'vue-router'
import pathList from './../pathList.js'

const route = useRoute()
const iframeId = ref(null)
const iframeBaseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3000/shop-m/#' : 'https://shop-template.github.io/shop-m/#'
const iframeUrl = ref(iframeBaseUrl)

// 根据父 path 拿到 子 path
function parentPathToChildrenPath(parentPath) {
  const cur = pathList.find(x => x.parentPath === parentPath)
  return cur ? cur.childrenPath : ''
}

// 首次设置 iframe 的链接
iframeUrl.value = `${iframeBaseUrl}${parentPathToChildrenPath(route.path)}`

let osEnd = ref('pc')
// 获取是移动端还是PC，摘自：https://tim.qq.com/
const OS = function() {
  var a = navigator.userAgent,
      b = /(?:Android)/.test(a),
      d = /(?:Firefox)/.test(a),
      e = /(?:Mobile)/.test(a),
      f = b && e,
      g = b && !f,
      c = /(?:iPad.*OS)/.test(a),
      h = !c && /(?:iPhone\sOS)/.test(a),
      k = c || g || /(?:PlayBook)/.test(a) || d && /(?:Tablet)/.test(a),
      a = !k && (b || h || /(?:(webOS|hpwOS)[\s\/]|BlackBerry.*Version\/|BB10.*Version\/|CriOS\/)/.test(a) || d && e);
  return {
      android: b,
      androidPad: g,
      androidPhone: f,
      ipad: c,
      iphone: h,
      tablet: k,
      phone: a
  }
}();
if (OS.phone || OS.ipad) {
  osEnd.value = 'phone'
}
let oldPath = route.path
watch(
  route,
  async (val) => {
    await nextTick()
    if (val.path !== oldPath) {
      oldPath = val.path
      const childrenPath = parentPathToChildrenPath(val.path)
      if (childrenPath) {
        if (osEnd.value === 'pc') {
          iframeId.value && iframeId.value.contentWindow.location.replace(`${iframeBaseUrl}${childrenPath}`)
        } else {
          iframeUrl.value = `${iframeBaseUrl}${childrenPath}`
        }
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <ParentLayout>
    <!-- 因为page每次都重新渲染，所以pc端放在 navbar-after ，但移动端为了放置位置，所以放在 page-content-bottom -->
    <template #navbar-after>
      <div v-if="osEnd === 'pc'" class="docs-box">
        <iframe :src="iframeUrl" frameborder="0" ref="iframeId"></iframe>
      </div>
    </template>
    <template #page-content-bottom>
      <div v-if="osEnd === 'phone'" class="docs-box-wrap">
        <div class="docs-box">
          <iframe :src="iframeUrl" frameborder="0" ref="iframeId"></iframe>
        </div>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.docs-box {
  position: fixed;
  top: calc(var(--navbar-height) + 50px);
  right: 68px;
  width: 360px;
  height: 640px;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid var(--c-border);
}
.docs-box iframe {
  display: block;
  width: 100%;
  height: 640px;
}
.page {
  position: relative;
  padding-right: 450px;
}
@media (max-width: 1344px) {
  .page {
    padding-right: 380px;
  }
  .docs-box {
    right: 20px;
  }
}

@media (max-width: 419px) {
  .page {
    padding-right: 0;
  }
  .docs-box-wrap {
    width: 100vw;
    margin-left: calc(calc(100% - 100vw) / 2);
  }
  .docs-box {
    position: inherit;
    top: 0;
    right: 0;
    margin: 0 auto;
    z-index: 5;
  }
}
.theme-container.no-sidebar .docs-box {
  display: none;
}
:root {
  --sidebar-width: 15rem;
  --content-width: auto;
}
</style>
```

文档页面的路由和移动端展示页面的路由关系配置在`pathList.js`文件中，一一对应关系：

```js
// 配置父子 path
export default [
  {
    parentPath: '/guide/',
    childrenPath: '/'
  },
  {
    parentPath: '/guide/getting-started.html',
    childrenPath: '/'
  },
  {
    parentPath: '/guide/cssVar.html',
    childrenPath: '/demo/cssVar'
  },
  {
    parentPath: '/guide/navBar.html',
    childrenPath: '/demo/navBar'
  },
  {
    parentPath: '/guide/tabbar.html',
    childrenPath: '/demo/tabbar'
  },
  {
    parentPath: '/guide/network.html',
    childrenPath: '/demo/network'
  },
  {
    parentPath: '/guide/vconsole.html',
    childrenPath: '/demo/vconsole'
  },
  {
    parentPath: '/guide/404.html',
    childrenPath: '/aaaa'
  },
  {
    parentPath: '/guide/permission.html',
    childrenPath: '/user'
  },
  {
    parentPath: '/guide/login.html',
    childrenPath: '/login'
  },
  {
    parentPath: '/guide/userInfo.html',
    childrenPath: '/userInfo'
  },
  {
    parentPath: '/plugins/compressorjs.html',
    childrenPath: '/userInfo'
  }
]
```

> 其中需要注意的是 iframe 的链接赋值之后不能再次赋值，否则会在 `history` 中增加一个记录，导致浏览器点击返回按钮出问题，解决方案如下：

```js
iframeId.value && iframeId.value.contentWindow.location.replace(`${iframeBaseUrl}${childrenPath}`)
```

> PC端中移动端展示放在 `navbar-after` 插槽内，是为了防止每次路由变更之后 iframe 都重新创建的问题。移动端中移动端展示放在 `page-content-bottom` 插槽内，因为其他位置的插槽会导致摆放位置不太符合。所以针对PC端、移动端做不同的逻辑处理：

```js
let osEnd = ref('pc')
// 获取是移动端还是PC，摘自：https://tim.qq.com/
const OS = function() {
  var a = navigator.userAgent,
      b = /(?:Android)/.test(a),
      d = /(?:Firefox)/.test(a),
      e = /(?:Mobile)/.test(a),
      f = b && e,
      g = b && !f,
      c = /(?:iPad.*OS)/.test(a),
      h = !c && /(?:iPhone\sOS)/.test(a),
      k = c || g || /(?:PlayBook)/.test(a) || d && /(?:Tablet)/.test(a),
      a = !k && (b || h || /(?:(webOS|hpwOS)[\s\/]|BlackBerry.*Version\/|BB10.*Version\/|CriOS\/)/.test(a) || d && e);
  return {
      android: b,
      androidPad: g,
      androidPhone: f,
      ipad: c,
      iphone: h,
      tablet: k,
      phone: a
  }
}();
if (OS.phone || OS.ipad) {
  osEnd.value = 'phone'
}
```

观测路由变化，让移动端展示显示不同的路径页面：

```js
// 根据父 path 拿到 子 path
function parentPathToChildrenPath(parentPath) {
  const cur = pathList.find(x => x.parentPath === parentPath)
  return cur ? cur.childrenPath : ''
}
...
watch(
  route,
  async (val) => {
    await nextTick()
    if (val.path !== oldPath) {
      oldPath = val.path
      const childrenPath = parentPathToChildrenPath(val.path)
      if (childrenPath) {
        if (osEnd.value === 'pc') {
          iframeId.value && iframeId.value.contentWindow.location.replace(`${iframeBaseUrl}${childrenPath}`)
        } else {
          iframeUrl.value = `${iframeBaseUrl}${childrenPath}`
        }
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)
```

> **注意**：iframe 链接是全连接，所以需要自行修改 `docs/.vuepress/theme/layouts/Layout.vue` 中的 `iframeBaseUrl` 变量。

至此就可以实现一个带移动端展示的 [shop-m使用文档](https://shop-template.github.io/shop-m-docs/guide/getting-started.html) 。
