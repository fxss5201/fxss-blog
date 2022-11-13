---
title: 动态加载js文件
isOriginal: true
category:
  - javascript
date: 2021-04-19
---

在日常开发中有很多时候需要动态加载js文件的场景，先看代码再看例子。

```js
/**
 * 动态加载js文件
 * @params {String} url 动态加载js文件路径
 * @params {Funtion} callback 加载完js文件之后的回调
 * @params {String} id 动态加载js文件的script标签的id
 * @params {Object} parent 动态加载js文件的script标签放在哪个父元素下，默认值为document.body
 */
function loadScript(url, callback, id, parent) {
  let parentDom = document.body
  parent && (parentDom = parent)
  if (id && parentDom.querySelector(`#${id}`)) {
    callback && callback()
  } else {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = 'async'
    script.src = url
    id && (script.id = id)
    parentDom.appendChild(script)
    if (script.readyState) {   //IE
      script.onreadystatechange = function() {
        if (script.readyState == 'complete' || script.readyState == 'loaded') {
          script.onreadystatechange = null
          callback && callback()
        }
      }
    } else {    // 非IE
      script.onload = function() {
        callback && callback()
      }
    }
  }
}
```

再看例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button id="button">加载js</button>
  <script>
    document.querySelector('#button').addEventListener('click', () => {
      console.log(123)
      loadScript('https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js', () => {
        console.log('loadScript')
      }, 'abc')
      console.log(456)
    })

    /**
     * 动态加载js文件
     * @params {String} url 动态加载js文件路径
     * @params {Funtion} callback 加载完js文件之后的回调
     * @params {String} id 动态加载js文件的script标签的id
     * @params {Object} parent 动态加载js文件的script标签放在哪个父元素下，默认值为document.body
     */
    function loadScript(url, callback, id, parent) {
      let parentDom = document.body
      parent && (parentDom = parent)
      if (id && parentDom.querySelector(`#${id}`)) {
        callback && callback()
      } else {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = 'async'
        script.src = url
        id && (script.id = id)
        parentDom.appendChild(script)
        if (script.readyState) {   //IE
          script.onreadystatechange = function() {
            if (script.readyState == 'complete' || script.readyState == 'loaded') {
              script.onreadystatechange = null
              callback && callback()
            }
          }
        } else {    // 非IE
          script.onload = function() {
            callback && callback()
          }
        }
      }
    }
  </script>
</body>
</html>
```

点击两次 加载js 按钮，第一次会进行jquery.js文件加载，加载完毕之后执行回调，第二次的时候，jquery.js文件已经存在，则直接执行回调函数。

![两次点击的打印内容](https://img.fxss.work/article-161884657000082-production.png)
