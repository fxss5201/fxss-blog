---
title: Vue2.7 setup 中使用vue-router、vuex
isOriginal: true
category:
  - Vue
tag:
  - Vue2.7
  - vue-router
  - vuex
date: 2022-11-16
---

[Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html)，中文版可产看 [Vue 2.7 正式发布，代号为 Naruto](https://juejin.cn/post/7115361618774622216) 。

使用 [Vue CLI](https://cli.vuejs.org/zh/guide/installation.html) 创建的新项目项目，vue/vue-router/vuex的版本对应如下：

```json
{
  "dependencies": {
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
  },
}
```

查看 yarn.lock 来看下具体安装版本号如下：

``` lock
vue@^2.6.11:
  version "2.7.14"
  resolved "https://registry.npmmirror.com/vue/-/vue-2.7.14.tgz#3743dcd248fd3a34d421ae456b864a0246bafb17"
  integrity sha512-b2qkFyOM0kwqWFuQmgd4o+uHGU7T+2z3T+WQp8UBjADfEv2n4FEMffzBmCKNP0IGzOEEfYjvtcC62xaSKeQDrQ==
  dependencies:
    "@vue/compiler-sfc" "2.7.14"
    csstype "^3.1.0"

vue-router@^3.2.0:
  version "3.6.5"
  resolved "https://registry.npmmirror.com/vue-router/-/vue-router-3.6.5.tgz#95847d52b9a7e3f1361cb605c8e6441f202afad8"
  integrity sha512-VYXZQLtjuvKxxcshuRAwjHnciqZVoXAjTjcqBTz4rKc8qih9g9pI3hbDjmqXaHdgL3v8pV6P8Z335XvHzESxLQ==

vuex@^3.4.0:
  version "3.6.2"
  resolved "https://registry.npmmirror.com/vuex/-/vuex-3.6.2.tgz#236bc086a870c3ae79946f107f16de59d5895e71"
  integrity sha512-ETW44IqCgBpVomy520DT5jf8n0zoCac+sxWnn+hMe/CzaSejb/eVw2YToiXYX+Ex/AuHHia28vWTq4goAexFbw==
```

也就是当前安装 Vue 2.7.14 版本，支持 `<script setup>` ，但 vue-router 3.6.5 和 vuex 3.6.2 版本并不支持组合式API的写法，这个时候需要对 vue-router 和 vuex 做兼容处理，以便使用组合式API。

在项目 `src/utils` 下创建 `vueApi.js` 文件：

``` js
import { getCurrentInstance } from 'vue'

// 访问vuex
export const useStore = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$store
}
// 访问router
export const useRouter = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$router
}
// 访问route
export const useRoute = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$route
}
```

接下来测试组合式API如下：

```vue
<template>
  <div class="bg-white mx-auto">
    <div class="mt-4">
      <div class="text-center">测试 ref</div>
      <div>num: {{ num }}</div>
      <button @click="changeNum" class="border rounded-4 py-1 px-4 hover:border-blue-700">+2</button>
    </div>
    <div class="mt-4">
      <div class="text-center">测试 组合式 vue-router</div>
      <div>routePath: {{ route.path }}</div>
      <button @click="changeRouter" class="border rounded-4 py-1 px-4 hover:border-blue-700">跳转到 optionApi</button>
    </div>
    <div class="mt-4">
      <div class="text-center">测试 组合式 vuex</div>
      <div>count: {{ count }}</div>
      <button @click="changeCount" class="border rounded-4 py-1 px-4 hover:border-blue-700">+1</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useStore, useRouter, useRoute } from './../utils/vueApi'

  const num = ref(1)
  function changeNum() {
    num.value += 2
  }

  const router = useRouter()
  const route = useRoute()
  function changeRouter() {
    router.push('/optionApi')
  }

  const store = useStore()
  const count = computed(() => store.state.count)
  function changeCount() {
    store.commit('setCount', count.value + 1)
  }
</script>
```

在项目中在创建一个页面用于选项式API的书写，查看 vue-router 和 vuex 是否使用正常：

``` vue
<template>
  <div class="bg-white mx-auto">
    <div class="mt-4">
      <div class="text-center">测试 data</div>
      <div>num: {{ num }}</div>
      <button @click="changeNum" class="border rounded-4 py-1 px-4 hover:border-blue-700">+2</button>
    </div>
    <div class="mt-4">
      <div class="text-center">测试 选项式 vue-router</div>
      <div>routePath: {{ route.path }}</div>
      <button @click="changeRouter" class="border rounded-4 py-1 px-4 hover:border-blue-700">跳转到 compositionApi</button>
    </div>
    <div class="mt-4">
      <div class="text-center">测试 选项式 vuex</div>
      <div>count: {{ count }}</div>
      <button @click="changeCount" class="border rounded-4 py-1 px-4 hover:border-blue-700">+1</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OptionApi',
    data() {
      return {
        num: 1
      }
    },
    computed: {
      route() {
        return this.$route
      },
      count() {
        return this.$store.state.count
      }
    },
    methods: {
      changeNum() {
        this.num += 2
      },
      changeRouter() {
        this.$router.push('/compositionApi')
      },
      changeCount() {
        this.$store.commit('setCount', this.count + 1)
      }
    }
  }
</script>
```

经过测试，两者功能均正常，但是在组合式API中 vuex 的 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 辅助函数是无法使用的。

要在 vue devtools 查看页面中的内容信息，需要将 vue devtools 升级到 6.2.0 以上版本。
