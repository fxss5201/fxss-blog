---
title: uni-app 开发小程序总结
isOriginal: true
category:
  - 小程序
tag:
  - uni-app
date: 2020-07-25
---

最近开发项目中使用 uni-app 开发了 微信小程序，整个体验下来还算流畅，下面做一些总结：

## HBuilderX安装

HBuilderX安装的时候选择标准版，不要下载APP开发版，至于uni-app编辑都可以在标准版里面通过插件安装或者是直接通过vue-cli命令行创建项目，另外就我个人使用之后，APP开发版编译小程序的时候，有时候会导致编译出来的小程序页面空白（只剩下`<page></page>`）。

## 微信开发者工具

HBuilderX运行/发布微信小程序在编译完成之后会尝试打开微信开发者工具，实际上就是用命令行控制微信开发者工具（[命令行 V2](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html#%E8%87%AA%E5%8A%A8%E9%A2%84%E8%A7%88)），这个需要在开发者工具的设置 -> 安全设置中开启服务端口。

## 创建项目

官方提供了HBuilderX可视化界面和vue-cli命令行两种方式创建项目，不过cli版如果想安装less、scss、ts等编译器，需自己手动npm安装。在HBuilderX的插件管理界面安装无效，那个只作用于HBuilderX创建的项目。

## 代码目录

以HBuilderX可视化界面创建的项目：

1. components：组件文件，不用引入声明，直接使用。
2. pages：页面
   1. index：首页
3. static：静态资源
4. store：全局状态管理中心
5. unpackage：打包文件
6. .gitignore：忽略文件，暂时忽略 `unpackage` 文件
7. APP.vue：应用配置，用来配置App全局样式以及监听
8. main.js：Vue初始化入口文件
9. manifest.json：配置应用名称、appid、logo、版本等打包信息
10. pages.json：配置页面路由、导航条、选项卡等页面类信息
11. uni.scss：整体控制应用的风格，<https://uniapp.dcloud.io/collocation/uni-scss>
12. mixins：混入
13. utils：工具，uni.request 和 uni.uploadFile 方法封装
14. config：配置文件
    1. index.js：类似于vue.config.js
    2. theme.js：配置在js中使用的主题配置
15. sitemap.json：配置页面是否被索引
16. package.json：npm相关，直接安装对应的库，和web一样引入使用
17. package-lock.json：npm相关

完整代码可查看<https://github.com/fxss5201/uni-template>

## 代码封装

### `config -> index.js 配置信息`

```javascript
export default {
  loginExpiredCode: '', // 用户信息过期的code
  token: 'token', // 如果使用到用户信息，需要存储token时，设置此token值，表示token的key
  origin: process.env.NODE_ENV === 'development' ? '' : '', // 配置请求的域名
  origin1: process.env.NODE_ENV === 'development' ? '' : '' // 用于设置多个域名
}
```

### `utils -> request.js uni.request 和 uni.uploadFile 方法封装`

```javascript
// uni.request 和 uni.uploadFile 方法封装
// 使用方式：
// this.$request({
//   url: '',
//   origin: 1, // 可选参数，用于设置使用项目中 config/index.js 中配置的哪个origin，值为对应的数字，未设置则使用默认的 origin
//   method: 'POST',
//   data: {}
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// }).finally(_ => {})

import store from '../store'
import config from '../config'

export function request(options) {
  let origin
  if (typeof options.origin === 'number' && !isNaN(options.origin)) {
    origin = config[`origin${options.origin}`]
  } else {
    origin = config.origin
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${origin}${options.url}`, // 统一配置域名信息
      method: options.method,
      header: options.header || {
        'content-type': 'application/json',
        'token': store.state.token
      },
      data: options.data || {},
      success(res) {
        /**
         * https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
         * uni.showLoading 和 uni.showToast 同时只能显示一个
         * 我们一般会在发起请求的时候 uni.showLoading ，此处需要先 uni.hideLoading() ，才方便后面的提示信息
         */ 
        uni.hideLoading()
        if (res.statusCode === 200) {
          // code 看公司及个人定义
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            // 返回的信息需要报错错误的msg，进行uni.showToast
            uni.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            // 此处再根据code统一做一些相关处理，比如登录过期等操作
            if(res.data.code === config.loginExpiredCode) {
              // 删除本地Storage的token
              uni.removeStorageSync(config.token)
              // uni.showToast 默认显示 1500ms ，之后跳转到登录页面
              setTimeout(() => {
                uni.reLaunch({
                  url: 'pages/login/index'
                })
              }, 1500)
            }
            reject(res.data)
          }
        } else {
          // statusCode 不为 200 的时候先报网络出错加 statusCode
          uni.showToast({
            title: `网络出错: ${res.statusCode}`,
            icon: 'none'
          })
          reject(res.data)
          console.log(`网络出错：${res.data.path} -> ${res.data.status}`)
        }
      },
      fail(err) {
        uni.hideLoading()
        uni.showToast({
          title: '网络出错',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

export function upload(options) {
  let origin
  if (typeof options.origin === 'number' && !isNaN(options.origin)) {
    origin = config[`origin${options.origin}`]
  } else {
    origin = config.origin
  }
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${origin}${options.url}`,
      filePath: options.filePath,
      name: options.name,
      formData: options.formData || {},
      header: {
        'content-type': 'multipart/form-data',
        'token': store.state.token
      },
      success(result) {
        uni.hideLoading()
        if (result.statusCode === 200) {
          /**
           * https://uniapp.dcloud.io/api/request/network-file
           * data String开发者服务器返回的数据
           */
          const res = JSON.parse(result.data)
          if (res.code === 0) {
            resolve(res)
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
            if(res.code === config.loginExpiredCode) {
              uni.removeStorageSync(config.token)
              setTimeout(() => {
                uni.reLaunch({
                  url: 'pages/login/index'
                })
              }, 1500)
            }
            reject(res)
          }
        } else {
          uni.showToast({
            title: `网络出错: ${result.statusCode}`,
            icon: 'none'
          })
          reject(res.data)
          console.log(`网络出错：${res.data.path} -> ${res.data.status}`)
        }
      },
      fail(err) {
        uni.hideLoading()
        uni.showToast({
          title: '网络出错',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}
```

### 网络监控

我是在全局放了网络监控，当断网的时间弹出断网弹窗禁止操作，再次联网的时间，关闭弹窗。

`App.vue` :

```javascript
<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		uni.onNetworkStatusChange(({isConnected}) => {
      if (isConnected) {
        uni.hideToast()
      } else {
        uni.hideToast()
        uni.showToast({
          title: '您已断网',
          icon: 'none',
          mask: true,
          duration: 6000000
        })
      }
    })
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>
```

## 更新提示

```javascript
  onLaunch: function() {
    // 更新版本提示
    if (uni.canIUse('getUpdateManager')) {
      const updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            uni.showModal({
              title: '更新提示',
              content: '新版本已经准备好，请重启应用',
              showCancel: false,
              confirmColor: theme.showModalConfirmColor,
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            uni.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
              showCancel: false,
              confirmColor: theme.showModalConfirmColor
            })
          })
        }
      })
    } else {
      uni.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
        showCancel: false,
        confirmColor: theme.showModalConfirmColor
      })
    }
  }
```

至于测试可以在 添加编译模式 设置：

![更新提示](https://img.fxss.work/article-159869075400052-production.png)

## 遇到的一些问题及解决方法

 1. [微信小程序用户授权弹窗，获取用户信息。用户拒绝授权时，引导用户去重新授权](https://developers.weixin.qq.com/community/develop/article/doc/00048c4a3086408592e8d563a51c13)
 2. [关于小程序获取手机号解密失败的踩坑历程](https://developers.weixin.qq.com/community/develop/doc/000c20636ace08f0aeb7b84d356804)
