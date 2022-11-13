---
title: 前端 mock 数据实践
isOriginal: true
category:
  - node
tag:
  - mock
date: 2021-06-01
---

在项目中一般使用 [Mock](https://github.com/nuysoft/Mock/wiki) 创建假数据，Mock 有提供拦截请求响应数据的功能 [Mock.mock()](https://github.com/nuysoft/Mock/wiki/Mock.mock()) ，但是 Mock 拦截就导致在 `Network` 中无法进行数据联调，只能通过 `console` 打印，使用起来就比较麻烦。这个时候我们可以使用 [koa](https://github.com/koajs/koa) 起本地服务，再通过 Mock 生成数据，前端项目将请求代理到 koa 本地服务，这样就可以在 `Network` 中进行数据联调了。

## eMock 使用

项目地址：[eMock](https://github.com/fxss5201/eMock)，示例地址：[use-eMock](https://github.com/fxss5201/use-eMock)。

将 eMock 项目克隆到本地，在前端项目中新建一个文件夹例如 `eMock` ，将 eMock 项目中除了 `.git` 和 `node_modules` 文件夹的其他所有文件拷贝到前端项目的 `eMock` 文件夹下，在 `eMock` 文件夹下 `yarn` 安装依赖，`yarn dev` 启动服务，服务端口是 `8888` ，之后在前端项目中直接配置代理，这里演示 [vue cli](https://cli.vuejs.org/zh/) 创建的项目怎么配置：

`vue.config.js` 文件：

```js
module.exports = {
  ......
  ......
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true
      }
    }
  }
  ......
  ......
}
```

## eMock 简介

eMock 采用 koa + Mock 生成 Mock 数据，`yarn dev` 实际执行的是 `nodemon --watch index --watch controller.js --watch global.js --watch ./controllers/*` ， [nodemon](https://www.npmjs.com/package/nodemon) 可以 `watch` 文件或者文件夹当内容有修改的时候，重启服务。

`index.js` 入口文件：

```js
const Koa = require('koa')
const chalk = require('chalk')
const bodyParser = require('koa-bodyparser')

const global = require('./global.js').global
const controller = require('./controller')

const app = new Koa()

// 全局公共变量及方法
app.context.global = global

// log request URL:
app.use(async (ctx, next) => {
  console.log(chalk.blue(`Process ${ctx.request.method} ${ctx.request.url}...`))
  await next()
})

// parse request body:
app.use(bodyParser())

// add controllers:
app.use(controller())

app.listen(8888)
console.log(chalk.green('app started at port 8888...'))
```

`controller.js` 文件自动读取 `controllers` 文件夹及目录下的js文件，并自动注册 `router` ，其中 [chalk](https://www.npmjs.com/package/chalk) 是修改 `console` 打印颜色：

```js
// https://github.com/michaelliao/learn-javascript/blob/master/samples/node/web/koa/url2-koa/controller.js

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

/**
 * add url-route in /controllers:
 * @param {Object} router require('koa-router')()
 * @param {Object} mapping require(__dirname + '/' + dir + '/' + f)
 */
function addMapping(router, mapping) {
  for (const url in mapping) {
    if (url.toLowerCase().startsWith('get ')) {
      const path = url.substring(4)
      router.get(path, mapping[url])
      console.log(chalk.green(`register URL mapping: ${chalk.yellow('get')} ${path}`))
    } else if (url.toLowerCase().startsWith('post ')) {
      const path = url.substring(5)
      router.post(path, mapping[url])
      console.log(chalk.green(`register URL mapping: ${chalk.yellow('post')} ${path}`))
    } else if (url.toLowerCase().startsWith('put ')) {
      const path = url.substring(4)
      router.put(path, mapping[url])
      console.log(chalk.green(`register URL mapping: ${chalk.yellow('put')} ${path}`))
    } else if (url.toLowerCase().startsWith('delete ')) {
      const path = url.substring(7)
      router.del(path, mapping[url])
      console.log(chalk.green(`register URL mapping: ${chalk.yellow('delete')} ${path}`))
    } else {
      console.log(chalk.red(`invalid URL: ${url}`))
    }
  }
}

/**
 * addControllers
 * @param {Object} router require('koa-router')()
 * @param {String} dir path
 */
function addControllers(router, dir) {
  const fullpath = path.join(__dirname + '/' + dir)
  listFile(router, fullpath)
}

/**
 * 递归循环深层目录便利
 * @param {Object} router require('koa-router')()
 * @param {String} dirPath path
 */
function listFile(router, dirPath) {
  const arr = fs.readdirSync(dirPath)
  arr.forEach(function (item) {
    const fullpath = path.join(dirPath, item)
    const stats = fs.statSync(fullpath)
    if (stats.isDirectory()) {
      listFile(router, fullpath);
    } else {
      console.log(chalk.blue(`process controller: ${fullpath}...`))
      const mapping = require(fullpath)
      addMapping(router, mapping)
    }
  });
}

module.exports = function (dir) {
  const controllers_dir = dir || 'controllers'
  const router = require('koa-router')()
  addControllers(router, controllers_dir)
  return router.routes()
}
```

再来查看 `global.js` 文件，如果有约定的不同状态下返回不同的 `code` 值，也可以放在 `global.js` 文件中：

```js
/** 存放公共变量，供所有使用 */
class Global {
  global = {
    // 模拟自动登录的时候，首次登录之后，将用户添加到 users 中，后续就可以模拟 cookie 自动登录
    users: [
      {
        cookie: 'cc077e4074d58b5b3afe96921b220364',
        name: 'fxss'
      }
    ],
    // 登录用户的 cookies
    cookies: []
  }

  /**
   * 设置cookie
   * @param {string} val 新的cookie值 
   */
  setCookie (val) {
    const cookies = this.global.cookies.concat(val)
    this.global.cookies = [...new Set(cookies)]
  }

  /**
   * 删除cookie
   * @param {string} val cookie值 
   */
  deleteCookie (val) {
    this.global.cookies.splice(this.global.cookies.indexOf(val), 1)
  }

  /**
   * 检查当前cookie是否在cookies中
   * @param {string} val 当前cookie
   * @returns true: 在cookies中，false：不在cookies中
   */
  isInCookies (val) {
    return this.global.cookies.indexOf(val) !== -1
  }

  /**
   * 获取所有的公共变量
   * @returns 所有的公共变量
   */
  getGlobal () {
    return this.global
  }

  /**
   * 使用当前cookie获取用户信息
   * @param {string} val 当前cookie
   * @returns 当前cookie对应的用户信息
   */
  getUserByCookie (val) {
    let res = {}
    for (let index = 0, length = this.global.users.length; index < length; index++) {
      if (this.global.users[index].cookie === val) {
        res = this.global.users[index]
        break
      }
    }
    return res
  }
}

const global = new Global()

module.exports = {
  global
}
```

公共文件就足够了，下面我们看下 `controllers` 内的文件，首先查看登录退出功能：

`login.js` 登录功能：

```js
const md5 = require('blueimp-md5')

// 正常用户名密码登录
const loginFn = async (ctx, next) => {
  const postData = ctx.request.body.data

  // 这里只是模拟生成 cookie ,然后将其添加到公共变量中
  ctx.global.setCookie(md5(postData.password))
  ctx.response.type = 'json'
  ctx.response.body = ({
    user: {
      name: postData.name,
      cookie: md5(postData.password)
    }
  })
  next()
}

// 根据 cookie 登录
const loginByCookieFn = async (ctx, next) => {
  const user = ctx.global.getUserByCookie(ctx.cookies.get('mockCookie'))
  
  ctx.response.type = 'json'
  ctx.response.body = ({
    user: user
  })
  next()
}

module.exports = {
  'post /api/login': loginFn,
  'post /api/loginByCookie': loginByCookieFn
}
```

`logout.js` 退出功能：

```js
// 退出登录
const logoutFn = async (ctx, next) => {
  // 删除公共变量中的 cookie
  ctx.global.deleteCookie(ctx.cookies.get('mockCookie'))
  ctx.response.type = 'json'
  ctx.response.body = ({
    msg: '退出成功'
  })
  next()
}

module.exports = {
  'post /api/logout': logoutFn
}
```

然后再查看文章的增删改查：

```js
const Mock = require('mockjs')
const Random = Mock.Random

// 生成文章自增 id
const articles = Mock.mock({
  'list|100': [{
    'id|+1': 0
  }]
})

let articleList = articles.list

// 为文章填充标题、内容、时间、作者
articleList = articleList.map(item => {
  const title = Random.ctitle(3, 10)
  const description = `${title}${Random.cparagraph()}`
  return {
    id: item.id === 0 ? 100 : item.id, // 此处是为了模拟新增文章在最前面，新增文章 id 由第一个文章的 id + 1 得到
    title,
    description,
    time: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    author: Random.cname()
  }
})

// 获取文章列表
const getArticlesFn = async (ctx, next) => {
  const currentPage = ctx.query.currentPage * 1
  const pageSize = ctx.query.pageSize * 1

  // 分页获取数据
  const list = articleList.filter((item, index) => index >= (currentPage - 1) * pageSize && index < currentPage * pageSize)
  ctx.response.type = 'json'
  ctx.response.body = ({
    list,
    total: articleList.length
  })
  next()
}

/**
 * 由文章 id 获取当前文章所在的 index
 * @param {string} id 文章 id
 * @returns 当前文章所在的 index
 */
function getArticlesIndexById(id) {
  let res = -1
  for (let i = 0, len = articleList.length; i < len; i++) {
    if (articleList[i].id === id) {
      res = i
      break
    }
  }
  return res
}

// 根据文章 id 获取文章获取文章详情
const getArticlesByIdFn = async (ctx, next) => {
  const articleIndex = getArticlesIndexById(ctx.params.id * 1)

  // 可以在此处进行文章是否存在的判断 articleIndex != -1
  ctx.response.type = 'json'
  ctx.response.body = ({
    article: articleList[articleIndex]
  })
  next()
}

// 新增文章
const postArticlesFn = async (ctx, next) => {
  const postData = ctx.request.body.data
  const id = articleList[0].id + 1
  articleList.unshift({
    id,
    ...postData
  })
  ctx.response.type = 'json'
  ctx.response.body = ({
    msg: '添加成功'
  })
  next()
}

// 更新文章
const putArticlesByIdFn = async (ctx, next) => {
  const articleIndex = getArticlesIndexById(ctx.params.id * 1)
  const postData = ctx.request.body.data
  articleList.splice(articleIndex, 1, postData)
  ctx.response.type = 'json'
  ctx.response.body = ({
    msg: '编辑成功'
  })
  next()
}

// 删除文章
const deleteArticlesByIdFn = async (ctx, next) => {
  const articleIndex = getArticlesIndexById(ctx.params.id * 1)
  articleList.splice(articleIndex, 1)
  ctx.response.type = 'json'
  ctx.response.body = ({
    msg: '删除成功'
  })
  next()
}

module.exports = {
  'get /api/articles': getArticlesFn,
  'get /api/articles/:id': getArticlesByIdFn,
  'post /api/articles': postArticlesFn,
  'put /api/articles/:id': putArticlesByIdFn,
  'delete /api/articles/:id': deleteArticlesByIdFn
}
```
