---
title: Vue路由权限
isOriginal: true
category:
  - Vue
date: 2020-04-06
---

在做后台管理系统的时候，一般都会遇见路由权限的问题。

大家可以先体验一下最终的例子 [authority vue Router](https://www.fxss.work/authorityRouter/#/login) ，例子项目地址 [authorityRouter](https://github.com/fxss5201/authorityRouter)。在例子的登录页面中，通过选择不同的用户类型来模拟不同的用户账号登录的情况，通过不同的用户类型登录后台的时候，可以看到左侧的 menu 菜单是不同的，只有当有权限的时候才可以进行查看，并且当手动输入的时候都会直接到404页面。

下面我就围绕这个例子说一下实现原理：

## 路由导航守卫`beforeEach`

`src/permission.js`

```js
import Vue from 'vue'
import router from './router'
import store from './store'

// 路由白名单，允许未登录的时候可以查看的路由
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 设置文章标题
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  // 获取cookies
  // 有cookies的时候就默认登录
  let authorityRouterType = Vue.$cookies.get('authorityRouterType')
  if (authorityRouterType && authorityRouterType * 1 >= 0) {
    authorityRouterType = authorityRouterType * 1
    store.commit('setLoginFlag', true)
    store.commit('setAuthorityType', authorityRouterType)
    // 处理的路由信息
    const asyncRoutes = !!store.state.permission.asyncRoutes.length
    if (asyncRoutes) {
      next()
    } else {
      // 当路由信息不存在的时候进行请求
      try {
        // 根据权限得到可用的路由信息
        const accessRoutes = await store.dispatch('permission/getRouter', authorityRouterType)
        router.addRoutes(accessRoutes)
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
      } catch (error) {
        Vue.prototype.$message.error('获取路由失败')
        if (!whiteList.includes(to.path)) {
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 当未登录的时候，当前路由在白名单中直接 next ，否则跳转回登录页面，并携带路由path
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
```

此文件会被引入 `main.js` 进行执行。

## store 信息处理

`src/store/module/permission.js`

```js
import Vue from 'vue'
import { resetRouter } from '@/router/index'
import { formatAsyncRoute, asyncRoutesBase } from '@/router/dynamicRoutes/index'

/**
 * Use meta.role to determine if the current user has permission
 */
function hasPermission (role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role)
  }
}

/**
 * 对路由进行筛选
 */
export function filterAsyncRoutes (routes, role) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(role, tmp)) {
      if (tmp.children && tmp.children.length > 0) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      } else {
        tmp.children = null
      }
      res.push(tmp)
    } else if (tmp.meta && route.meta.base) {
      res.push(tmp)
    }
  })
  return res
}

export default {
  namespaced: true,
  state: {
    asyncRoutes: [],
    accessedRoutes: []
  },
  mutations: {
    setAsyncRoutes (state, asyncRoutes) {
      asyncRoutes = [asyncRoutes]
      formatAsyncRoute(asyncRoutes)
      // 将基础路由添加进去
      state.asyncRoutes = asyncRoutes.concat(asyncRoutesBase)
    },
    setAccessedRoutes (state, accessedRoutes) {
      state.accessedRoutes = accessedRoutes
    },
    resetAsyncRoutes (state) {
      state.asyncRoutes = []
    }
  },
  actions: {
    async getRouter ({ commit, state }, type) {
      // 根据用户类型获取路由信息
      const res = await Vue.axios.post('/api/authorityRouter/getRouter', {
        type
      })
      if (res.status && res.status === 200) {
        if (res.data.isok) {
          commit('setAsyncRoutes', res.data.data)
          return new Promise(resolve => {
            let accessedRoutes
            // 这里 type = 0 表示管理员
            if (type === 0) {
              accessedRoutes = state.asyncRoutes || {}
            } else {
              accessedRoutes = filterAsyncRoutes(state.asyncRoutes, type)
            }
            commit('setAccessedRoutes', accessedRoutes)
            resolve(accessedRoutes)
          })
        } else {
          Vue.prototype.$message.error('获取路由失败')
        }
      } else {
        Vue.prototype.$message.error('网络出错，请重试')
      }
    },
    logout ({ commit, state }) {
      // 退出登录
      resetRouter()
      commit('resetAsyncRoutes')
      commit('setAccessedRoutes', [])
    }
  }
}
```

## router 路由

`src/router/dynamicRoutes/asyncRoutesMap.js` 将所有路由 import 待用

```js
/**
* 该组件集合会配合后台返回的动态路由表，匹配有角色权限的 component
*/
export default {
  Admin: () => import('@/views/Admin.vue'),
  AdminBase: () => import('@/views/AdminBase.vue'),
  AdminVip: () => import('@/views/AdminVip.vue'),
  AdminAdmin: () => import('@/views/AdminAdmin.vue')
}
```

`src/router/dynamicRoutes/index.js`

```js
import asyncRoutesMap from './asyncRoutesMap'
const Page404 = () => import('@/views/Page404.vue')

// 基础的动态路由，带有通配符 * 的路由应该始终放置在路由表的最后面，会拼接到验权生成的动态路由后面
const asyncRoutesBase = [
  {
    path: '/404',
    name: 'Page404',
    component: Page404,
    meta: {
      base: true,
      title: '404',
      requiresAuth: false
    }
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      base: true,
      title: '404',
      requiresAuth: false
    }
  }
]

// 对后台返回的动态路由 component 属性实体化工具函数
const formatAsyncRoute = (asyncRoutes) => {
  asyncRoutes.forEach(asyncRoute => {
    if (asyncRoute.component) {
      if (asyncRoutesMap[asyncRoute.component]) {
        asyncRoute.component = asyncRoutesMap[asyncRoute.component]
      } else {
        delete asyncRoute.component
      }
    }
    if (asyncRoute.children) {
      formatAsyncRoute(asyncRoute.children)
    }
  })
}

export {
  asyncRoutesMap,
  formatAsyncRoute,
  asyncRoutesBase
}
```

`src/router/index.js`

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/Login.vue')

Vue.use(VueRouter)

// 公共路由，和路由白名单里的路由信息一致
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false
    }
  }
]

// 生成信息的公共路由
const createRouter = () => new VueRouter({
  routes: publicRoutes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
export {
  publicRoutes,
  resetRouter
}

```

## 登录信息处理

`src/view/Login.vue`

```js
async login () {
  // 模拟登录
  const res = await this.$axios.post('/api/authorityRouter/login', this.form)
  if (res.status && res.status === 200) {
    if (res.data.isok) {
      this.$store.commit('setLoginFlag', true)
      this.$store.commit('setAuthorityType', this.form.type)
      this.$cookies.set('authorityRouterType', this.form.type, { expires: 7, path: '' })
      // 重置router
      resetRouter()
      // 根据权限得到可用的路由信息
      const accessRoutes = await this.$store.dispatch('permission/getRouter', this.form.type)
      router.addRoutes(accessRoutes)

      this.$nextTick(() => {
        // 处理从其他页面页面跳往登录页面的情况
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push('/')
        }
      })
    } else {
      this.$message.error('登录失败')
    }
  } else {
    this.$message.error('网络出错，请重试')
  }
}
```

## menu 菜单信息处理

`src/view/Admin.vue`

```js
...mapState('permission', ['asyncRoutes', 'accessedRoutes']),
menuRoutes () {
  if (this.accessedRoutes.length) {
    // 这里请根据具体情况定
    return this.accessedRoutes[0].children
  } else {
    return []
  }
}
```

实际上路由权限也是将所有页面组件都导入了，只是 router 路由中是否添加对应的路由信息罢了。
