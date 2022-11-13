---
title: vue 单页面重载（刷新）
isOriginal: true
category:
  - Vue
date: 2020-02-06
---

首先先说一下标题，此处的重新（刷新）并不是浏览器 `reload` ，只是当前页面组件重新 `create` 。

最近重构的项目中有重新加载的按钮，以前直接是 `location.reload()` ，但现在重构为了单页面方式，这个在 `location.reload()` 的话那体验就太 low 了，刚好前段时间看了花裤衩大佬的 [手摸手，带你用vue撸后台 系列五(v4.0新版本)](https://juejin.im/post/5c92ff94f265da6128275a85#heading-3)  ，仔细思考之后不得不说这个方法很赞，巧妙的将离开页面的所有参数信息与 redirect 页面信息结合，并且在 redirect 页面信息中可以获得之前页面的信息，在 redirect 页面的 `created`生命周期函数中再替换为离开页面的信息参数，离开的页面经历了 `destroyed` 和 `created` 等其他生命周期，相当于重载了。

代码如下：

```javascript
// router.js
const router = new Router({
  ...
  routes: [
    ...
    {
      // 刷新页面
      path: "/redirect/:path*",
      name: "redirect",
      component: () => import('./views/redirectPage/index.vue')
    }
    ...
  ]
  ...
})
```

需要在 `views/redirectPage` 文件夹下新建 `index.vue` ，内容如下：

```html
<script>
export default {
  name: 'RedirectPage',
  created () {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: `/${path}`, query })
  },
  render (h) {
    return h()
  }
}
</script>
```

准备工作已经做好，使用的时候如下：

```javascript
...
pageReload () {
  // 刷新
  this.$router.replace({ path: `/redirect${this.$route.fullPath}` })
}
...
```
