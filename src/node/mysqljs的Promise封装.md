---
title: mysqljs的Promise封装
isOriginal: true
category:
  - node
tag:
  - mysqljs
date: 2020-02-06
---

[mysqljs](https://github.com/mysqljs/mysql)暂不支持Promise的写法，这导致我们代码的嵌套层级增多，不易于理解和维护，所以需要对其进行Promise封装，结合async/await来使代码易于维护。

## mysqljs的Promise封装

假设我们将mysqljs的Promise封装放在db.js文件中，内容如下：

```javascript
const mysql = require('mysql');

// 创建连接池
const pool = mysql.createPool({
  connectionLimit: 50,
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.dbDatabase,
  multipleStatements: true
});

let query = function (sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}
```

## 使用

```javascript
const express = require('express')
const router = express.Router()
const mysql = require('../mysql/db')

router.get('/', articleList)

async function articleList(req, res, next) {
  try {
    let limitNumber = req.query.limit * 1 || 10
    let offsetNumber = (req.query.page * 1 - 1) * limitNumber
    let totalData = await mysql.query('SELECT * FROM vue_blog')
    let selectData = await mysql.query('SELECT * FROM vue_blog ORDER BY articleCreateTime DESC LIMIT ? OFFSET ?',
      [limitNumber, offsetNumber])
    return res.json({
      isok: true,
      data: {
        total: totalData.length,
        list: selectData
      },
      msg: ''
    });
  } catch (error) {
    return res.json({
      isok: false,
      msg: error
    });
  }
  next();
}

module.exports = router;
```
