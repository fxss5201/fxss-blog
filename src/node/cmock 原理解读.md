---
title: cmock 原理解读
isOriginal: true
category:
  - node
tag:
  - cmock
date: 2022-01-25
---

## cmock 简介

[cmock](https://github.com/fxss5201/cmock) 用于根据接口自动生成 mock 文件，并根据 mock 文件起 mock 服务。本篇着重讲解 cmock 原理，如果仅关注使用，可以查看 [cmock 使用指导](https://www.fxss.work/blogNuxt/detail/155) 。

## cmock 原理

依然先看 cmock 原理图：
![cmock原理图](https://img.fxss.work/article-164303624400033-production.png)

```
npm install

// 创建 mock 文件
npm run create

// 起 mock 服务
npm run dev
```

### 目录介绍

本项目的目录如下：

![目录](https://img.fxss.work/article-16431004880002-production.png)

| 目录 | 功能介绍 |
| --- | --- |
| controllers | 用于存放 mock 文件的目录 |
| util | 用于存放一些公共方法 |
| controller.js | 主要用于 `npm run dev` 起 cmock 服务，自动读取 controllers 文件夹下的 mock 文件 |
| global.js | 全局方法或变量存在，暂时无用 |
| index.js | 起服务的入口文件 |
| nodemon.json | 用于 nodemon 的配置 |
| package.json | 项目描述及配置 |
| README.md | 项目说明文档 |

`util` 下的目录：

![util目录](https://img.fxss.work/article-164310047100080-production.png)

| 目录 | 功能介绍 |
| --- | --- |
| objectToString.js | 将对象转换成字符串，例如 `objectToString({ name: 'fxss', age: 28, location: 'shanghai' }, ['name', 'age']) = namefxssage20`，用于生成 mock 文件中 body 的 key |
| onProxy.js | 代理配置 |
| replaceAll.js | 使用正则实现全部替换 |
| template.js | 用于生成 mock 文件的模板 |

### 环境区分

本项目通过 [cross-env](https://github.com/kentcdodds/cross-env#readme) 设置环境变量，配置不同的命令行：

```js
"scripts": {
  "dev": "nodemon",
  "create": "cross-env create=true nodemon"
},
```

`npm run dev` 起 cmock 服务，并根据请求参数返回 mock 文件中对应的数据结构。
`npm run create` 起 cmock 服务，会代理请求并根据返回的数据结构生成 mock 文件。

在项目中使用 `process.env.create` 作为区分。

### 代理

本项目使用的 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 进行代理， [http-proxy-middleware http-proxy events](https://github.com/chimurai/http-proxy-middleware#http-proxy-events) 支持配置 **onProxyReq** 和 **onProxyRes** 事件，本项目主要核心使用的就是 **onProxyReq** 和 **onProxyRes** 事件。

如下是 `onProxy.js` 文件的内容，主要地方已备注：

```js
const fs = require("fs");
const chalk = require("chalk");
const qs = require("qs");
const dayjs = require("dayjs");
const replaceAll = require("./replaceAll.js");
const template = require("./template.js").template;
const { mockFolder, needParams } = require("../package.json");
const objectToString = require("./objectToString.js");

// https://github.com/chimurai/http-proxy-middleware#http-proxy-events
function onProxyReqFn(fullpath) {
  return function (proxyReq, req, res) {
    // 生成特殊标识，并 setHeader ，保证同一请求多次触发时能正确匹配
    let headerFlag = `headerFlag${parseInt(Math.random() * 100000000000)}`;
    proxyReq.setHeader("headerFlag", headerFlag);

    // 接口请求链接转换为文件名
    const fileNameUrl = `${replaceAll("/", "_", req.url)}`;
    let fileName = fileNameUrl;
    let url = req.url;
    // get请求特殊处理
    if (req.method.toLowerCase() === "get") {
      fileName = fileNameUrl.split("?")[0];
      url = url.split("?")[0];
    }

    let fileText;
    // 直接 require 对应的 mock 文件，如果失败则同步创建再 require
    try {
      fileText = require(`${fullpath}/${fileName}.js`);
    } catch (error) {
      let fileTemplate = template;
      let updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

      fileTemplate = fileTemplate.replace("$url", url);
      fileTemplate = fileTemplate.replace("$method", req.method);
      fileTemplate = fileTemplate.replace("$type", req.headers.accept);
      fileTemplate = fileTemplate.replace("$createTime", updateTime);
      fileTemplate = fileTemplate.replace("$updateTime", updateTime);

      // http://nodejs.cn/api/fs.html#fsappendfilesyncpath-data-options
      fs.appendFileSync(`./${mockFolder}/${fileName}.js`, fileTemplate);
      console.log(chalk.green(`onProxyReqFn: ${fileName}.js create success`));
      fileText = require(`${fullpath}/${fileName}.js`);
    }

    if (req.method.toLowerCase() !== "get") {
      // 非 get 请求时，请求参数获取
      let body = [];
      req.on("data", function (chunk) {
        body.push(chunk);
      });
      req.on("end", function () {
        // 获取到请求参数并转化为对应的参数 key
        body = Buffer.concat(body).toString();
        const paramsBody = body && JSON.parse(body);
        let paramsKeyList = Object.keys(paramsBody);
        let needParamsKeys = [];
        let bodyKey = "";
        paramsKeyList.forEach((item) => {
          if (needParams.includes(item)) {
            needParamsKeys.push(item);
          }
        });
        if (needParamsKeys.length) {
          bodyKey = objectToString(paramsBody, needParamsKeys);
        }
        if (bodyKey.length) {
          fileText.body[bodyKey] = "";
        } else {
          fileText.body.default = "";
        }
        fileText.bodyKey[headerFlag] = bodyKey;

        // 将参数 key 一并写入 mock 文件
        fileText = `module.exports=${JSON.stringify(fileText)}`;
        fs.writeFile(`${fullpath}\\${fileName}.js`, fileText, (err) => {
          if (err)
            console.log(chalk.red(`onProxyReqFn: ${fileName}.js ${err}`));
          console.log(chalk.green(`onProxyReqFn: ${fileName}.js save success`));
        });
      });
    } else {
      // get 请求直接从 url 上获取参数，并使用 qs 将参数字符串转化为对象，之后得到 body 中的参数 key
      const paramsBody = qs.parse(fileNameUrl.split("?")[1]);
      let paramsKeyList = Object.keys(paramsBody);
      let needParamsKeys = [];
      let bodyKey = "";
      paramsKeyList.forEach((item) => {
        if (needParams.includes(item)) {
          needParamsKeys.push(item);
        }
      });
      if (needParamsKeys.length) {
        bodyKey = objectToString(paramsBody, needParamsKeys);
      }
      if (bodyKey.length) {
        fileText.body[bodyKey] = "";
      } else {
        fileText.body.default = "";
      }
      fileText.bodyKey[headerFlag] = bodyKey;

      // 将参数 key 一并写入 mock 文件
      fileText = `module.exports=${JSON.stringify(fileText)}`;
      fs.writeFile(`${fullpath}\\${fileName}.js`, fileText, (err) => {
        if (err) console.log(chalk.red(`onProxyReqFn: ${fileName}.js ${err}`));
        console.log(chalk.green(`onProxyReqFn: ${fileName}.js save success`));
      });
    }
  };
}

function onProxyResFn(fullpath) {
  return function (proxyRes, req, res) {
    // 获取 onProxyReqFn 中设置的标识
    let headerFlag = proxyRes.req._header.match(/(?<=headerFlag: )(.*)\r\n/)[1];

    // 根据 url 获取 mock 文件名
    const fileNameUrl = `${replaceAll("/", "_", req.url)}`;
    let fileName = fileNameUrl;
    if (req.method.toLowerCase() === "get") {
      fileName = fileNameUrl.split("?")[0];
    }

    // 导入 mock 文件对象，并根据 headerFlag 拿到 body 中的参数 key
    let fileText = require(`${fullpath}/${fileName}.js`);
    let key = fileText.bodyKey[headerFlag] || "default";
    delete fileText.bodyKey[headerFlag];

    // 获取后端接口返回的数据结构
    let body = [];
    proxyRes.on("data", function (chunk) {
      body.push(chunk);
    });
    proxyRes.on("end", function () {
      body = Buffer.concat(body).toString();

      // 将后端接口返回的数据结构添加到 mock 文件的导出对象中
      if (!fileText.body[key]) {
        fileText.body[key] = body ? JSON.parse(body) : "";
      }

      // 更新时间
      fileText.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

      // 重新写入 mock 完整文件
      fileText = `module.exports=${JSON.stringify(fileText)}`;
      fs.writeFile(`${fullpath}\\${fileName}.js`, fileText, (err) => {
        if (err) console.log(chalk.red(`onProxyResFn: ${fileName}.js ${err}`));
        console.log(chalk.green(`onProxyResFn: ${fileName}.js save success`));
      });
      res.end();
    });
  };
}

module.exports = {
  onProxyReqFn,
  onProxyResFn,
};
```

接下来我们看一下上文中提到的 util 文件夹下其他的方法：

`objectToString.js`:

```js
/**
 * 将对象转换成字符串
 * @param {object} object 需要被转换的对象
 * @param {array} keys 保留的key
 * @returns {string}
 * 例如 objectToString({ name: 'fxss', age: 28, location: 'shanghai' }, ['name', 'age']) = namefxssage20
 */
module.exports = function (object, keys = []) {
  let res = "";
  Object.keys(object).forEach((item) => {
    if (keys.includes(item)) {
      res += `${item}${object[item]}`;
    }
  });
  return res;
};
```

`replaceAll.js`:

```js
/**
 * 全部替换
 * @param {string} find 需要匹配替换的内容
 * @param {string} replace 替换后的内容
 * @param {string} str 需要处理的字符串
 * @returns {string} 处理后的字符串
 */
module.exports = function (find, replace, str) {
  var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  return str.replace(new RegExp(find, "g"), replace);
};
```

`template.js`:

```js
/**
 * 用于生成 mock 文件的模板
 {
    name: "$name", // 接口名称
    url: "$url", // 接口的 url
    method: "$method", // 接口方法
    type: "$type", // 接口对应的 response.type
    createTime: "$createTime", // mock 文件创建时间
    updateTime: "$updateTime", // mock 文件最后更新时间，如果手动更新 mock 文件，改时间可能不准确
    isUseMockjs: false, // 是否使用 mockjs 生成返回的数据，需要在 body 中配置 mockTemplate 
    timeout: 0, // 多久时间返回数据，用于模拟等待时间，方便前端加加载状态
    bodyKey: {}, // 内部使用，误删
    body: { // 用于存放接口数据结构
      接口参数（仅包含 package.json needParams 中配置的参数）: 接口数据结构
      mockTemplate // 用于 mock.js 生成数据
    },
  }
 */
module.exports = {
  template: `module.exports = {
    name: "$name", // 接口描述
    url: "$url",
    method: "$method",
    type: "$type",
    createTime: "$createTime",
    updateTime: "$updateTime",
    isUseMockjs: false,
    timeout: 0,
    bodyKey: {},
    body: {},
  }`,
};
```

看一个我真实生成的 mock 文件：

![微信截图_20220125163414.png](https://img.fxss.work/article-164310044000017-production.png)

### 项目服务

```js
const Koa = require("koa");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");

const { port, proxy, mockFolder } = require("./package.json");
const global = require("./global.js").global;

const app = new Koa();

// 用于写入文件时拼接的文件地址
const fullpath = path.join(`${__dirname}\\${mockFolder}`);

// 判断文件夹是否存在，不存在则创建
fs.stat(`./${mockFolder}`, (err, stat) => {
  if (err) {
    fs.mkdirSync(`./${mockFolder}`, (ierr, istat) => {
      if (ierr) {
        console.log(chalk.red(`./${mockFolder} 文件夹不存在，并创建失败`));
      }
    });
  }

  // 全局公共变量及方法
  app.context.global = global;

  app.use(cors());

  // 接口访问是打印
  app.use(async (ctx, next) => {
    console.log(
      chalk.blue(`Process ${ctx.request.method} ${ctx.request.url}...`)
    );
    await next();
  });

  // cross-env 设置环境变量 create ，以此来区分是否用于创建 mock 文件
  if (process.env.create) {
    const { createProxyMiddleware } = require("http-proxy-middleware");
    const k2c = require("koa2-connect");
    const { onProxyReqFn, onProxyResFn } = require("./util/onProxy.js");

    // 配置多个代理
    proxy.forEach((item) => {
      app.use(async (ctx, next) => {
        if (ctx.url.startsWith(item.url)) {
          ctx.respond = false;
          await k2c(
            createProxyMiddleware({
              target: item.target,
              changeOrigin: true,
              onProxyReq: onProxyReqFn(fullpath),
              onProxyRes: onProxyResFn(fullpath),
            })
          )(ctx, next);
        }
        await next();
      });
    });

    // parse request body:
    app.use(bodyParser());
  } else {
    const controller = require("./controller");

    // parse request body:
    app.use(bodyParser());

    // add controllers:
    app.use(controller(mockFolder));
  }
});

app.listen(port);
console.log(chalk.green(`app started at port ${port}...`));
```

可以看到在代码 40 行的位置，使用了环境变量 `process.env.create` 进行区分不同的功能，如果是 `npm run create` ，则会导入 代理，并在代理时间中生成 mock 文件，`npm run dev` 则直接根据 mock 文件起 mock 服务。

### 导入 mock 文件，起 mock 服务

`controller.js`：

```js
// https://github.com/michaelliao/learn-javascript/blob/master/samples/node/web/koa/url2-koa/controller.js

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const Mock = require("mockjs");
const { needParams, timeout } = require("./package.json");
const objectToString = require("./util/objectToString.js");

/**
 * addControllers
 * @param {Object} router require('koa-router')()
 * @param {String} dir path
 */
function addControllers(router, dir) {
  const fullpath = path.join(__dirname + "/" + dir);
  listFile(router, fullpath);
}

/**
 * 便利 mock 文件目录
 * @param {Object} router require('koa-router')()
 * @param {String} dirPath path
 */
function listFile(router, dirPath) {
  const arr = fs.readdirSync(dirPath);
  arr.forEach(function (item) {
    const fullpath = path.join(dirPath, item);
    console.log(chalk.blue(`process controller: ${fullpath}...`));
    const mapping = require(fullpath);
    addMapping(router, mapping);
  });
}

/**
 * add url-route in /controllers:
 * @param {Object} router require('koa-router')()
 * @param {Object} mapping require(__dirname + '/' + dir + '/' + f)
 */
function addMapping(router, mapping) {
  if (mapping.method.toLowerCase() === "get") {
    router.get(mapping.url, createRouter(mapping));
    // 用于打印注册号接口的信息
    console.log(
      chalk.green(
        `register URL mapping: ${chalk.white(mapping.name)}： ${chalk.yellow(
          "get"
        )} ${mapping.url}`
      )
    );
  } else if (mapping.method.toLowerCase() === "post") {
    router.post(mapping.url, createRouter(mapping));
    // 用于打印注册号接口的信息
    console.log(
      chalk.green(
        `register URL mapping: ${chalk.white(mapping.name)}： ${chalk.yellow(
          "post"
        )} ${mapping.url}`
      )
    );
  } else if (mapping.method.toLowerCase() === "put") {
    router.put(mapping.url, createRouter(mapping));
    // 用于打印注册号接口的信息
    console.log(
      chalk.green(
        `register URL mapping: ${chalk.white(mapping.name)}： ${chalk.yellow(
          "put"
        )} ${mapping.url}`
      )
    );
  } else if (mapping.method.toLowerCase() === "delete") {
    router.del(mapping.url, createRouter(mapping));
    // 用于打印注册号接口的信息
    console.log(
      chalk.green(
        `register URL mapping: ${chalk.white(mapping.name)}： ${chalk.yellow(
          "delete"
        )} ${mapping.url}`
      )
    );
  } else {
    console.log(chalk.red(`invalid URL: ${mapping.url}`));
  }
}

/**
 * 生成路由函数
 * @param {Object} mapping 对应 mock 文件导出的对象
 */
function createRouter(mapping) {
  return async (ctx, next) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!mapping.isUseMockjs) {
          // 收集请求参数，得出 body 中的参数 key
          let paramsBody = Object.assign(
            {},
            ctx.params,
            ctx.query,
            ctx.request.body
          );
          let paramsKeyList = Object.keys(paramsBody);
          let needParamsKeys = [];
          let bodyKey = "default";
          paramsKeyList.forEach((item) => {
            if (needParams.includes(item)) {
              needParamsKeys.push(item);
            }
          });
          if (needParamsKeys.length) {
            bodyKey = objectToString(paramsBody, needParamsKeys);
          }
          // 判断 mock 文件的 body 中是否存在请求参数 key，如果不存在，则默认引用第一个
          const mappingBodyKeys = Object.keys(mapping.body);
          if (!mappingBodyKeys.includes(bodyKey) && mappingBodyKeys.length) {
            bodyKey = mappingBodyKeys[0];
          }

          ctx.response.type = mapping.type;
          ctx.response.body = mapping.body[bodyKey];
        } else {
          ctx.response.body = Mock.mock(mapping.body.mockTemplate);
        }
        resolve();
      }, mapping.timeout || timeout || 0);
    });
    next();
  };
}

module.exports = function (dir) {
  const controllers_dir = dir || "controllers";
  const router = require("koa-router")();
  addControllers(router, controllers_dir);
  return router.routes();
};
```

至此 cmock 原理解读到此结束。

## 感谢

本次分享到这里就结束了，**感谢您的阅读**！如对您有帮助，帮忙点个赞，您的点赞是我继续创作的动力。
