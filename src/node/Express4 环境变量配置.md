---
title: Express4 环境变量配置
isOriginal: true
category:
  - node
tag:
  - Express4
date: 2020-02-06
---

在进项项目开发中经常会遇到不同环境切换的问题，比如说开发环境和正式环境对应不同服务器的 mysql ，总不能每次切换不同环境的时候修改代码，这样既容易出错，也不利于代码维护，所以这个时候就需要用到环境变量来进行配置了。

## 开发环境

在开发环境中，我们一般链接的是本地服务器的 mysql ，这个时候我们可以通过以下设置来进行变量控制：

`package.json`：

```javascript
"scripts": {
    "start": "set NODE_ENV=development&& node ./bin/www",
    "devstart": "set NODE_ENV=development&& nodemon ./bin/www"
  }
```

需要注意的是 `...=development&&...`  `development` 和 `&&` 之间不能有空格，否则之后在代码中进行判断的时候不等于`'development'` 。

上面的两个命令的区别是： `devstart` 是采用 `nodemon`  ，修改Express代码之后有热重载的功能。

在代码里面就可以进行环境变量的判断：

`db.js`：

```javascript
if (process.env.NODE_ENV === 'development') {
    console.log('开发环境')
    var db = mysql.createPool({
        host: 'localhost',
        user: '',
        password: '',
        database: ''
    });
} else if (process.env.NODE_ENV === 'production') {
    console.log('正式环境')
    var db = mysql.createPool({
        host: '',
        user: '',
        password: '',
        database: ''
    });
}
```

## 正式环境

在正式环境中，当代码部署到 linux 服务器时，是需要使用 pm2 来进行配合处理的，上面代码不变。

```javascript
pm2 ecosystem
```

生成配置文件。

`ecosystem.config.js`：

```javascript
module.exports = {
  apps : [
      {
        name: "myapp",
        script: "./../home/www/myapp/bin/www",
        watch: true,
        env: {
            "NODE_ENV": "development"
        },
        env_production: {
            "NODE_ENV": "production",
        }
      }
  ]
}
```

这里默认环境是 `env` ，但是您可以通过使用`pm2 start ecosystem.config.js --env production` 决定使用  `env_production` ，这样在上面的代码中就会自动走正式环境了。
