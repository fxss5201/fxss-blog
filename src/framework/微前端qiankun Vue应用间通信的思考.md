---
title: 微前端qiankun Vue应用间通信的思考
shortTitle: 微前端qiankun Vue
isOriginal: true
category:
  - Vue
  - qiankun
date: 2021-04-24
---

> 注意：文中的父应用和主应用只是名称不同，但都指主应用基座。

之所以会有这个思考，是因为看了一篇文章 [基于 qiankun 的微前端最佳实践（图文并茂） - 应用间通信篇](https://juejin.cn/post/6844904151231496200) ，其中有介绍使用 `Shared` 通信，精辟之处在于

```javascript
// micro-app-vue/src/main.js
//...

/**
 * 渲染函数
 * 主应用生命周期钩子中运行/子应用单独启动时运行
 */
function render(props = {}) {
  // 当传入的 shared 为空时，使用子应用自身的 shared
  // 当传入的 shared 不为空时，主应用传入的 shared 将会重载子应用的 shared
  const { shared = SharedModule.getShared() } = props;
  SharedModule.overloadShared(shared);

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/vue" : "/",
    mode: "history",
    routes,
  });

  // 挂载应用
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
}
```

`const { shared = SharedModule.getShared() } = props` 利于解构赋值指定默认值的方式来实现父子应用共用同一个 shared ，看到这里我就想在 Vue 中我们一般使用 Vuex 进行数据集中状态处理，那我如果直接把父应用的 Vuex 创建的 store 传到子应用怎么样？

## 直接将父应用 store 传给子应用

详细代码可以查看 <https://github.com/fxss5201/micro-app-test> `main` 分支和 <https://github.com/fxss5201/micro-app-test-vue> `main` 分支：

父应用：

`scr/micro/apps.ts`

```javascript
import store from '@/store'

const apps = [
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口 - 通过该地址加载微应用
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  {
    name: 'VueMicroApp',
    entry: '//localhost:8111',
    container: '#frame',
    activeRule: '/vue',
    props: {
      // 此处将父应用的 store 传入子应用
      store
    }
  }
]

export default apps
```

store 是在父应用中通过 Vuex 创建的：

`src/store/index.ts`

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'store123456'
  },
  mutations: {
    setToken (state, val) {
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  }
})
```

之后就需要在子应用中进行接收处理。

子应用：

`src/main.js`

```javascript
import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import microStore from './store'
import actions from '@/shared/actions'
import './plugins/element.js'

Vue.config.productionTip = false

let router = null
let instance = null
function render (props = {}) {
  console.log('micro-app-test-vue')
  console.log(props)
  // 这里通过解构赋值方式把父应用创建的store传入
  const { container, store = microStore } = props

  if (props) {
    // 注入 actions 实例
    actions.setActions(props)
  }

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue/' : '/',
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}
export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
```

在父应用中有4个菜单，分别如下：

```javascript
  menus: [
    {
      key: 'Home',
      title: '主应用-主页',
      icon: 'el-icon-location',
      path: '/'
    },
    {
      key: 'About',
      title: '主应用-关于',
      icon: 'el-icon-location',
      path: '/about'
    },
    {
      key: 'VueMicroAppHome',
      title: 'Vue子应用-主页',
      icon: 'el-icon-menu',
      path: '/vue/'
    },
    {
      key: 'VueMicroAppAbout',
      title: 'Vue子应用-关于',
      icon: 'el-icon-menu',
      path: '/vue/about'
    }
  ]
```

![例子效果图](https://img.fxss.work/article-161927967400024-production.png)

点击按钮可切换值。

父应用的 `App.vue` 文件：

```html
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <main-menu :menus="menus"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>Header</div>
          <div class="head-content">
            <span>主应用Action通信:</span>
            <el-divider direction="vertical"></el-divider>
            <span>actionToken: {{ actionToken }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" @click="setMainAtionToken">设置actionToken为mainAtionToken</el-button>
          </div>
          <div class="head-content">
            <span>主应用Props(vuex)通信:</span>
            <el-divider direction="vertical"></el-divider>
            <span>vuexToken: {{ vuexToken }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" @click="setMainVuexToken">设置vuexToken为mainVuexToken</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
          <router-view v-show="$route.name" />

          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <section v-show="!$route.name" id="frame"></section>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MainMenu from '@/components/MainMenu.vue'
import actions from '@/shared/actions'

@Component({
  components: {
    MainMenu
  }
})

export default class App extends Vue {
  /**
   * 菜单列表
   * key: 唯一 Key 值
   * title: 菜单标题
   * icon?: 图标
   * path: 菜单对应的路径
   */
  menus = [
    {
      key: 'Home',
      title: '主应用-主页',
      icon: 'el-icon-location',
      path: '/'
    },
    {
      key: 'About',
      title: '主应用-关于',
      icon: 'el-icon-location',
      path: '/about'
    },
    {
      key: 'VueMicroAppHome',
      title: 'Vue子应用-主页',
      icon: 'el-icon-menu',
      path: '/vue/'
    },
    {
      key: 'VueMicroAppAbout',
      title: 'Vue子应用-关于',
      icon: 'el-icon-menu',
      path: '/vue/about'
    }
  ]

  // 采用Action通信的Token
  actionToken = ''

  get vuexToken (): string {
    return this.$store.state.token
  }

  mounted (): void {
    console.log(this.menus)

    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log('主应用观察者：token 改变前的值为 ', prevState.token)
      console.log('主应用观察者：改变后的 token 的值为 ', state.token)
      this.actionToken = state.token
    }, true)
  }

  setMainAtionToken (): void {
    actions.setGlobalState({ token: 'mainAtionToken' })
  }

  setMainVuexToken (): void {
    this.$store.commit('setToken', 'mainVuexToken')
  }

  @Watch('vuexToken', { immediate: true })
  onVuexTokenChange (val: string, oldVal: string): void {
    // vuex中token值: val变更后的状态; oldVal: 变更前的状态
    console.log('主应用vuex中token值改变前的值为 ', oldVal)
    console.log('主应用vuex中token值改变后的值为 ', val)
  }
}
</script>
```

子应用的  `App.vue` 文件：

```html
<template>
  <div id="app-box">
    <div>
      <div class="content">
        <span>子应用Action通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>actionToken: {{ actionToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroActionToken">设置actionToken为microActionToken</el-button>
      </div>
      <div class="content">
        <span>子应用Props(vuex)通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>vuexToken: {{ vuexToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroVuexToken">设置vuexToken为microVuexToken</el-button>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import actions from '@/shared/actions'
export default {
  name: 'app',
  data () {
    return {
      actionToken: '',
      vuexToken: ''
    }
  },
  mounted () {
    /**
      由于在 main.js 中 const { container, store = microStore } = props
      store 如果独立运行用的是自己的Store，如果作为子应用运行，则用的是主应用的Store，此时主应用的Store在子应用中
      不是动态的，所以只能初始化赋值，再订阅主应用Store的mutation来修改当前数据

      为了统一处理，可能都需要通过初始化赋值，再订阅主应用Store的mutation来修改当前数据的方式
    */
    // 初始化拿到值
    this.vuexToken = this.$store.state.token

    console.log(this.$store)
    console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__)
    if (window.__POWERED_BY_QIANKUN__) {
      actions.onGlobalStateChange((state, prevState) => {
        // state: 变更后的状态; prevState: 变更前的状态
        console.log('子应用观察者：token 改变前的值为 ', prevState.token)
        console.log('子应用观察者：改变后的 token 的值为 ', state.token)

        const { token } = state
        this.actionToken = token
      }, true)
    }

    // 订阅 store 的 mutation
    this.$store.subscribe((mutation, state) => {
      console.log(mutation.type)
      console.log(mutation.payload)
      console.log(state)
      console.log(this.$store)
      this.vuexToken = state.token
    })
  },
  methods: {
    setMicroActionToken () {
      if (window.__POWERED_BY_QIANKUN__) {
        actions.setGlobalState({ token: 'microActionToken' })
      }
    },

    setMicroVuexToken () {
      this.$store.commit('setToken', 'microVuexToken')
    }
  },
  watch: {
    vuexToken (val, oldVal) {
      console.log('子应用vuex中token值改变前的值为 ', oldVal)
      console.log('子应用vuex中token值改变后的值为 ', val)
    }
  }
}
</script>
```

父子应用都有对应的按钮点击切换状态值得事件，并且也通过 `qiankun` 的官方通信方式 `action` 通信 和 `props` 传 `Vuex` 创建的 `store` 的方式通信，`props` 传 `Vuex` 创建的 `store` 通信方式就有点问题，由 `props` 传 `Vuex` 创建的 `store` ，注意此时的 `store` 是在父应用中 `Vue.use(Vuex)` 和 `new` 的，所以此时的 `store` 在子应用中无法使用 `computed` 计算属性，在子应用的 `App.vue` 文件也有对应的解释，暂时通过初始化赋值和订阅主应用 `store` 的 `mutation` 来修改当前数据。这样虽然可以通信，但还是有点麻烦，而且后续也不清楚在子应用中使用主应用的 `store` 还会遇到哪些坑，所以就有了下面的思考。

## `eventBus` 通信

详细代码可以查看 <https://github.com/fxss5201/micro-app-test> `bus` 分支 或者 <https://github.com/fxss5201/micro-app-test-js> `bus` 分支 和 <https://github.com/fxss5201/micro-app-test-vue> `bus` 分支：

为啥新加了一个项目，<https://github.com/fxss5201/micro-app-test> 这个主应用基座采用的是 TypeScript ，而子应用基座采用的是 JavaScript ，导致有些文件不方便直接复制使用，所以就新建了 <https://github.com/fxss5201/micro-app-test-js> 项目，也是采用 JavaScript ，当然你也可以都用 TypeScript ，我这里只是做演示。

下面以 <https://github.com/fxss5201/micro-app-test-js> `bus` 分支 和 <https://github.com/fxss5201/micro-app-test-vue> `bus` 分支作讲解，也就是使用 JavaScript ，TypeScript 分支可以自行查看 <https://github.com/fxss5201/micro-app-test> 项目，思想都是一致的。

父应用：

`src/plugins/bus.js` 创建 `eventBus`

```javascript
import Vue from 'vue'
import store from './../store'

// 使用 Event Bus
const bus = new Vue({
  data: {
    // 保持初始化时与store数据一致
    // 基本类型可以这样用，引用类型请用cloneDeep深拷贝
    // https://www.lodashjs.com/docs/lodash.cloneDeep#_clonedeepvalue
    token: store.state.tokenModule.token
  }
})

export default bus
```

`src/plugins/busOn.js` `eventBus` 的 `$on` 统一放置的地方

```javascript
export default {
  install (thisArg) {
    thisArg.$bus.$on('setBusToken', (val) => {
      thisArg.$bus.token = val
      thisArg.$store.commit('tokenModule/setToken', val)
    })
  }
}
```

`src/micro/apps.js`

```javascript
import bus from './../plugins/bus'

const apps = [
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口 - 通过该地址加载微应用
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  {
    name: 'VueMicroApp',
    entry: '//localhost:8111',
    container: '#frame',
    activeRule: '/vue',
    props: {
      bus
    }
  }
]

export default apps
```

`src/main.js`

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import startQiankun from './micro'
import bus from './plugins/bus'

startQiankun({ prefetch: false })
Vue.config.productionTip = false
// 将bus挂载在Vue原型，保持父子应用一致
Vue.prototype.$bus = bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

并且把在父子应用间通信的数据单独放到 Vuex 的一个 modules 中，所以父应用的 `store` 文件变成如下：

`src/store/index.js`

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import tokenModule from './tokenModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tokenModule
  }
})
```

`src/store/tokenModule.js`

```javascript
export default {
  namespaced: true,
  state: {
    token: 'store123456'
  },
  mutations: {
    setToken (state, val) {
      console.log('main', val)
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  }
}
```

之后就是父应用的 `App.vue` 的改造：

```html
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <main-menu :menus="menus"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>Header</div>
          <div class="head-content">
            <span>主应用Action通信:</span>
            <el-divider direction="vertical"></el-divider>
            <span>actionToken: {{ actionToken }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" @click="setMainAtionToken">设置actionToken为mainAtionToken</el-button>
          </div>
          <div class="head-content">
            <span>主应用Props(bus)通信:</span>
            <el-divider direction="vertical"></el-divider>
            <span>busToken: {{ busToken }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" @click="setMainBusToken">设置busToken为mainBusToken</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
          <router-view v-show="$route.name" />

          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <section v-show="!$route.name" id="frame"></section>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'
import actions from '@/shared/actions'
import busOn from './plugins/busOn'

export default {
  name: 'app',
  components: {
    MainMenu
  },
  data () {
    return {
      menus: [
        {
          key: 'Home',
          title: '主应用-主页',
          icon: 'el-icon-location',
          path: '/'
        },
        {
          key: 'About',
          title: '主应用-关于',
          icon: 'el-icon-location',
          path: '/about'
        },
        {
          key: 'VueMicroAppHome',
          title: 'Vue子应用-主页',
          icon: 'el-icon-menu',
          path: '/vue/'
        },
        {
          key: 'VueMicroAppAbout',
          title: 'Vue子应用-关于',
          icon: 'el-icon-menu',
          path: '/vue/about'
        }
      ],
      actionToken: ''
    }
  },
  computed: {
    busToken () {
      return this.$store.state.tokenModule.token
    }
  },
  mounted () {
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log('主应用观察者：token 改变前的值为 ', prevState.token)
      console.log('主应用观察者：改变后的 token 的值为 ', state.token)
      this.actionToken = state.token
    }, true)

    // bus.$on('setBusToken', (val: string) => {
    //   this.$store.commit('tokenModule/setToken', val)
    // })

    // 多个eventBus统一书写地方
    busOn.install(this)
  },
  methods: {
    setMainAtionToken () {
      actions.setGlobalState({ token: 'mainAtionToken' })
    },
    setMainBusToken () {
      // 防止多次commit setToken，所以将commit setToken放在eventBus中去做，此处仅emit eventBus
      // this.$store.commit('tokenModule/setToken', 'mainBusToken')
      this.$bus.$emit('setBusToken', 'mainBusToken')
    }
  },
  watch: {
    busToken: {
      immediate: true,
      handler (val, oldVal) {
        // vuex中token值: val变更后的状态; oldVal: 变更前的状态
        console.log('主应用vuex中token值改变前的值为 ', oldVal)
        console.log('主应用vuex中token值改变后的值为 ', val)
      }
    }
  }
}
</script>
```

接下来说说子应用的修改，子应用：

看过项目的应该会发现父子应用 `src/plugins/bus.js` 、`src/plugins/busOn.js` 、 `src/store/tokenModule.js`  这3个文件是一致的，这里是专门把两个用一致的思想，就是方便在父子应用间复制粘贴，所以父子应用要么全用 JavaScript 或者 typeScript 。

`src/main.js`

```javascript
import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import actions from '@/shared/actions'
import './plugins/element.js'
import microBus from './plugins/bus'

Vue.config.productionTip = false

let router = null
let instance = null
function render (props = {}) {
  console.log('micro-app-test-vue')
  console.log(props)
  // 通过解构赋值默认值的方式，当父应用传了 bus 就应用父应用的 bus ，未传则应用子应用的 bus
  const { container, bus = microBus } = props
  Vue.prototype.$bus = bus

  if (props) {
    // 注入 actions 实例
    actions.setActions(props)
  }

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue/' : '/',
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}
export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
```

`src/App.vue`

```html
<template>
  <div id="app-box">
    <div>
      <div class="content">
        <span>子应用Action通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>actionToken: {{ actionToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroActionToken">设置actionToken为microActionToken</el-button>
      </div>
      <div class="content">
        <span>子应用Props(bus)通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>busToken: {{ busToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroBusToken">设置busToken为microBusToken</el-button>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import actions from '@/shared/actions'
import busOn from './plugins/busOn'

export default {
  name: 'app',
  data () {
    return {
      actionToken: ''
    }
  },
  computed: {
    busToken () {
      return this.$store.state.tokenModule.token
    }
  },
  mounted () {
    console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__)
    if (window.__POWERED_BY_QIANKUN__) {
      actions.onGlobalStateChange((state, prevState) => {
        // state: 变更后的状态; prevState: 变更前的状态
        console.log('子应用观察者：token 改变前的值为 ', prevState.token)
        console.log('子应用观察者：改变后的 token 的值为 ', state.token)

        const { token } = state
        this.actionToken = token
      }, true)
    }

    // 多个eventBus统一书写地方
    busOn.install(this)
    if (window.__POWERED_BY_QIANKUN__) {
      // 嵌入父应用中进入页面的时候初始化数据
      this.$bus.$emit('setBusToken', this.$bus.token)
    }
  },
  methods: {
    setMicroActionToken () {
      if (window.__POWERED_BY_QIANKUN__) {
        actions.setGlobalState({ token: 'microActionToken' })
      }
    },

    setMicroBusToken () {
      // 防止多次commit setToken，所以将commit setToken放在eventBus中去做，此处仅emit eventBus
      // this.$store.commit('tokenModule/setToken', 'microBusToken')
      this.$bus.$emit('setBusToken', 'microBusToken')
    }
  },
  watch: {
    busToken (val, oldVal) {
      console.log('子应用vuex中token值改变前的值为 ', oldVal)
      console.log('子应用vuex中token值改变后的值为 ', val)
    }
  }
}
</script>
```

这种通信方式主要采用的就是 `eventBus` 的 `$emit` 触发事件和 `$on` 监听事件，如果子应用单独使用，则使用子应用的 `eventBus` 去更改 `store` 中的值，如果子应用嵌在父应用中使用时，则使用父应用的 `eventBus` 。这种方案的好处就是子应用嵌入父应用及单独使用时不用做任何的适配处理。

## `action` + `Vuex` 通信

详细代码可以查看 <https://github.com/fxss5201/micro-app-test-js> `action-vuex` 分支（<https://github.com/fxss5201/micro-app-test> `action-vuex` 分支） 和 <https://github.com/fxss5201/micro-app-test-vue> `action-vuex` 分支：

`action` + `Vuex` 通信主要是使用官方的 `action` 进行通信，之后在将值更新到 `vuex` 中：

主应用：

`src/App.vue`

```html
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <main-menu :menus="menus"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>Header</div>
          <div class="head-content">
            <span>主应用Action通信:</span>
            <el-divider direction="vertical"></el-divider>
            <span>actionToken: {{ actionToken }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" @click="setMainAtionToken">设置actionToken为mainAtionToken</el-button>
          </div>
          <div class="head-content">
            <span>主应用Action + Vuex通信:</span>
            <el-divider direction="vertical"></el-divider>
            <span>actionVuexToken: {{ actionVuexToken }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" @click="setMainActionVuexToken">设置actionVuexToken为mainActionVuexToken</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
          <router-view v-show="$route.name" />

          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <section v-show="!$route.name" id="frame"></section>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'
import actions from '@/shared/actions'

export default {
  name: 'app',
  components: {
    MainMenu
  },
  data () {
    return {
      menus: [
        {
          key: 'Home',
          title: '主应用-主页',
          icon: 'el-icon-location',
          path: '/'
        },
        {
          key: 'About',
          title: '主应用-关于',
          icon: 'el-icon-location',
          path: '/about'
        },
        {
          key: 'VueMicroAppHome',
          title: 'Vue子应用-主页',
          icon: 'el-icon-menu',
          path: '/vue/'
        },
        {
          key: 'VueMicroAppAbout',
          title: 'Vue子应用-关于',
          icon: 'el-icon-menu',
          path: '/vue/about'
        }
      ],
      actionToken: ''
    }
  },
  computed: {
    actionVuexToken () {
      return this.$store.state.tokenModule.token
    }
  },
  mounted () {
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log('主应用观察者：token 改变前的值为 ', prevState.token)
      console.log('主应用观察者：改变后的 token 的值为 ', state.token)

      this.actionToken = state.token
      this.$store.commit('tokenModule/setToken', state.token)
    }, true)
  },
  methods: {
    setMainAtionToken () {
      actions.setGlobalState({ token: 'mainAtionToken' })
    },
    setMainActionVuexToken () {
      // 注意这里用actions去修改，在onGlobalStateChange中去commit
      actions.setGlobalState({ token: 'mainActionVuexToken' })
    }
  },
  watch: {
    actionVuexToken: {
      immediate: true,
      handler (val, oldVal) {
        // vuex中token值: val变更后的状态; oldVal: 变更前的状态
        console.log('主应用vuex中token值改变前的值为 ', oldVal)
        console.log('主应用vuex中token值改变后的值为 ', val)
      }
    }
  }
}
</script>
```

子应用：

`src/App.vue`

```html
<template>
  <div id="app-box">
    <div>
      <div class="content">
        <span>子应用Action通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>actionToken: {{ actionToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroActionToken">设置actionToken为microActionToken</el-button>
      </div>
      <div class="content">
        <span>子应用Action + Vuex通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>actionVuexToken: {{ actionVuexToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroActionVuexToken">设置actionVuexToken为microActionVuexToken</el-button>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import actions from '@/shared/actions'

export default {
  name: 'app',
  data () {
    return {
      actionToken: ''
    }
  },
  computed: {
    actionVuexToken () {
      return this.$store.state.tokenModule.token
    }
  },
  mounted () {
    console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__)
    if (window.__POWERED_BY_QIANKUN__) {
      actions.onGlobalStateChange((state, prevState) => {
        // state: 变更后的状态; prevState: 变更前的状态
        console.log('子应用观察者：token 改变前的值为 ', prevState.token)
        console.log('子应用观察者：改变后的 token 的值为 ', state.token)

        const { token } = state
        this.actionToken = token
        this.$store.commit('tokenModule/setToken', token)
      }, true)
    }
  },
  methods: {
    setMicroActionToken () {
      if (window.__POWERED_BY_QIANKUN__) {
        actions.setGlobalState({ token: 'microActionToken' })
      }
    },

    setMicroActionVuexToken () {
      if (window.__POWERED_BY_QIANKUN__) {
        actions.setGlobalState({ token: 'microActionVuexToken' })
      } else {
        this.$store.commit('tokenModule/setToken', 'microActionVuexToken')
      }
    }
  },
  watch: {
    actionVuexToken (val, oldVal) {
      console.log('子应用vuex中token值改变前的值为 ', oldVal)
      console.log('子应用vuex中token值改变后的值为 ', val)
    }
  }
}
</script>
```

`action` + `vuex` 通信方式就是子应用需要根据 `window.__POWERED_BY_QIANKUN__` 的值做一些适配，比如：

```javascript
    setMicroActionVuexToken () {
      if (window.__POWERED_BY_QIANKUN__) {
        // 嵌在父应用中时使用 actions
        actions.setGlobalState({ token: 'microActionVuexToken' })
      } else {
        // 独立使用时commit
        this.$store.commit('tokenModule/setToken', 'microActionVuexToken')
      }
    }
```

> 微应用建议使用 `history` 模式的路由，需要设置路由 `base`，值和它的 `activeRule` 是一样的。

总结一下，上面的通信方式视情况而定，可以单独使用也可以混合使用。
