---
title: f-cache-memory缓存库
isOriginal: true
category:
  - ts
tag:
  - f-cache-memory
date: 2024-07-20
---

## 问题起因

起因是某次发版之后，服务器接口压力过大，当场宕机，排查之后发现有个接口在首页被调十来次（六七年的老项目了，都是泪呀），后端反馈这个接口的sql很复杂，很耗性能，临时把这个接口放到登录后只执行一次，数据缓存在 `localStorage` 内，后续这个接口都直接从 `localStorage` 中取。

虽然临时解决了宕机问题，但还是会有多个组件内同时发起多个相同请求的问题。现在也有很多请求库带有缓存功能，但是这是老项目，请求只封装了 `axios` ，换个请求库风险又很高，最终决定自己搞搞。

## 思路历程

当时最初的想法就是在 `axios` 拦截器内做判断，首先在 `interceptors.request` 中判断缓存中是否有对应的请求，在 `interceptors.response` 中赋予缓存设置。

但很快问题就来，在 `interceptors.request` 判断有缓存之后，再取消这个缓存吗？搞了搞又发现个问题，当某个请求已发起，但是还没返回，这个时候这个请求又发起了，这不没解决问题。

然后又想着在 `interceptors.request` 中先让请求占位，这样多个组件同时发起某个请求，只要第一个占位了，后续的都取消。问题又来了，后续请求取消之后，后续逻辑又不触发了。后面突然想到我可以在请求之前做检测，当对应接口已经在缓存中时，就直接返回当前缓存中的值，缓存不存在再发起，这个时候肯定会想那第一个已经发起的还未返回的，后续相同接口从缓存中拿到的值如何出发后续逻辑呢？

请求本身返回的是 `promise`，那我先把 `promise` 存入缓存，相同接口再请求时直接返回缓存中的 `promise` ，这样后续逻辑可以正常触发。

## 最终方案

最终实现如下（仅 `get` 请求做接口缓存）：

```ts
export function get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
  const curHttpCacheKey: string = configToKey({
    url,
    ...config
  })
  if (!httpCache.hasCache(curHttpCacheKey)) {
    const httpRequest = instance.get(url, config)
    httpCache.setCache(curHttpCacheKey, httpRequest)
    return httpRequest as Promise<T>
  } else {
    return Promise.resolve(httpCache.getCache(curHttpCacheKey))
  }
}
```

对 `get` 请求再做个封装，缓存中以请求链接和 `query`拼接的字符串作为 `key`，`httpCache` 后续会讲，  `configToKey` 实现如下：

```ts
export function configToKey(config: AxiosRequestConfig): string {
  let key = config.url as string
  if (config.params) {
    key += JSON.stringify(config.params)
  }
  return key
}
```

然后在 `interceptors.response` 中赋予缓存值：

```ts
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.config.method === 'get') {
      const curHttpCacheKey = configToKey(response.config)
      // 缓存中设置的值要和下面 return 的结果一致
      httpCache.setCache(curHttpCacheKey, response)
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
```

下面说下 `httpCache`：

```ts
import CacheMemory from 'f-cache-memory'

const httpCache = new CacheMemory()
export default httpCache
```

## 缓存库 [f-cache-memory](https://github.com/fxss5201/f-cache-memory)

初始化一个库就行了，[f-cache-memory](https://github.com/fxss5201/f-cache-memory) 就是我专门开发的库，底层用的 `map` ，有些API也贴近 `map`，API如下：

### 初始化参数

|参数|默认值|描述|版本|
|------|----|------|------|
| `size?: number` | `100` | 最多缓存多少个 ||
| `expiration?: number` | `Number.MAX_SAFE_INTEGER` | 按时间毫秒设置缓存有效期，超出时间会被删除 ||
| `change?: (data: [string, any][]) => void` | - | 当缓存变更的时候，可以在此方法内同步外部数据 | 新增于 v0.0.7 |

### api

|名称|参数|返回值类型|描述|版本|
|----|----|----|----|------|
| `initCache` | `data: [string, any][]` | - | 初始化缓存数据 | 新增于 v0.0.7 |
| `hasCache` | `key: string` | `boolean` | 验证是否在缓存中 ||
| `setCache` | `key: string, data: any, expiration?: number` | - | 设置缓存，`expiration` 以毫秒为单位设置缓存有效期，优先级高于初始化的 `expiration` 参数，未设置时默认为 初始化的 `expiration` | `expiration` 新增于 v0.0.3 |
| `getCache` | `key: string` | `any` | 获取缓存 ||
| `deleteCache` | `key: string` | - | 删除缓存 ||
| `deleteCacheByStarts` | `url: string` | - | 根据键值的前缀删除缓存 ||
| `clearCache` | - | - | 清空缓存 ||
| `cacheSize` | - | `number` | 有多少个缓存 ||
| `getNowCache` | - | `any` | 获取当前缓存，默认为最后一个，`getPreviousCache`/`getNextCache`/`goPostionCache`/`goAbsPostionCache`都会影响当前缓存的值 ||
| `getPreviousCache` | - | `any` | 按设置顺序前一个缓存 ||
| `getNextCache` | - | `any` | 按设置顺序后一个缓存 ||
| `goPostionCache` | `num: number` | `any` | 相对当前缓存获取缓存，1为后一个，-1为前一个 ||
| `goAbsPostionCache` | `num: number` | `any` | 按照设置顺序获取第 `num` 个缓存 ||
| `getCacheToArray` | `needTime: boolean = false` | `[string, any][]` | 按设置顺序转换为数组，如果参数为 `false`，则直接返回设置的数据，如果为 `true`，则会返回 `{ dateTime: 过期时间, data: 设置数据 }` | `dateTime` 参数新增于 v0.0.7 |

### 同步缓存内外数据

当我们希望缓存内的数据和缓存外联动时，我们可以初始化时传入 第三个参数 `change` 函数， `change` 函数的参数就是缓存内的数据（内部数据的结构是 `{ dateTime: 过期时间, data: 设置的缓存 }`），所以如果与 `localStorage` 联动如下：

```ts
const localCache = new CacheMemory(100, 100000, (data) => {
  localStorage.setItem('localCache', JSON.stringify(data))
})
localCache.setCache('aaa', 111)
localCache.setCache('bbb', 222)
```

那下次再打开浏览器，`localStorage` 内的值如何传递到缓存中，此时可以初始化之后使用 `initCache` :

```ts
const initCache = new CacheMemory()
const localStorageCache = localStorage.getItem('localCache')
if (localStorageCache) {
  initCache.initCache(JSON.parse(localStorageCache))
}
console.log(initCache.getCacheToArray())
```

Vue:

```ts
const cacheList = ref<[string, any][]>([])
const localCache = new CacheMemory(100, 100000, (data) => {
  cacheList.value = data
})
```

React:

```ts
const [cacheList, setCacheList] = useState<[string, any][]>([])
const localCache = new CacheMemory(100, 100000, (data) => {
  setCacheList(data)
})
```

实际上面还有个问题，就是添加缓存之后，什么时候使缓存失效，虽然有过期时间一说，但设的小了，缓存没效果，设得大了，就涉及需要清缓存。

这里我提供几个思路：

1. 过期时间设的小一点，仅保证多个组件同时加载接口时做到缓存；
2. 接口映射表，哪些接口改变之后需要清缓存，做好映射关系，在 `interceptors.response` 中清除对应缓存，这样项目中的代码不用动；
3. 如果项目完全采用的 REST API 风格，可以在 `post/put/delete` 中清除对应缓存，此处有个 [例子](https://github.com/fxss5201/vue-components/blob/main/src/service/index.ts#L45)。

最后我们采用了第一种思路，解决服务器临时压力，因为接口规范不统一，接口映射表又太多，一时难以保证齐全。

完整例子可以查看 [vue-components](https://github.com/fxss5201/vue-components/blob/main/src/service/index.ts) ，本地运行，接口 mock 。
