---
title: markdown-it和highlight.js的结合渲染代码，并添加自定义行号
shortTitle: markdown-it和highlight.js
isOriginal: true
category:
  - javascript
date: 2020-02-06
---

一般写博客都采用md格式，快捷方便，但是写好之后为了方便查看，我们需要将md格式的代码解析。

## markdown-it

本示例中采用的是[markdown-it](https://github.com/markdown-it/markdown-it#readme)来解析md格式的代码。

## highlight.js

本示例中采用的是[highlight.js](https://highlightjs.org/)来进行代码高亮显示。

但是highlight.js不支持行号，这会导致代码看起来不方便，本示例结合[给博客的highlight.js添加行号和行号高亮](https://xuexb.com/post/highlight-showline.html)中的方法来给代码添加行号。

```javascript
const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // 此处判断是否有添加代码语言
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 得到经过highlight.js之后的html代码
        const preCode = hljs.highlight(lang, str, true).value
        // 以换行进行分割
        const lines = preCode.split(/\n/).slice(0, -1)
        // 添加自定义行号
        let html = lines.map((item, index) => {
          return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
        }).join('')
        html = '<ol>' + html + '</ol>'
        // 添加代码语言
        if (lines.length) {
          html += '<b class="name">' + lang + '</b>'
        }
        return '<pre class="hljs"><code>' +
          html +
          '</code></pre>'
      } catch (__) {}
    }
    // 未添加代码语言，此处与上面同理
    const preCode = md.utils.escapeHtml(str)
    const lines = preCode.split(/\n/).slice(0, -1)
    let html = lines.map((item, index) => {
      return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
    }).join('')
    html = '<ol>' + html + '</ol>'
    return '<pre class="hljs"><code>' +
      html +
      '</code></pre>'
  }
})

// req.body.content 代表md代码
let articleContentHtml = md.render(`@[toc]${req.body.content}`)
```

在vue中的渲染

```html
<template>
  <!-- 渲染生成的html代码 -->
  <div class="article-content" v-html="info.articleContentHtml"></div>
</template>

<script>
// 引入默认样式
import 'highlight.js/scss/default.scss'
// 引入个性化的vs2015样式
import 'highlight.js/styles/vs2015.css'
</script>

<style lang="scss">
// 添加行号样式
pre.hljs {
  padding: 8px 2px;
  border-radius: 5px;
  position: relative;
  ol {
    list-style: decimal;
    margin: 0;
    margin-left: 40px;
    padding: 0;
    li {
      list-style: decimal-leading-zero;
      position: relative;
      padding-left: 10px;
      .line-num {
        position: absolute;
        left: -40px;
        top: 0;
        width: 40px;
        height: 100%;
        border-right: 1px solid rgba(0, 0, 0, .66);
      }
    }
  }
  b.name {
    position: absolute;
    top: 2px;
    right: 12px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
}
</style>
```

渲染之后的样式如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191216185638989.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Z4c3M1MjAx,size_16,color_FFFFFF,t_70)
在代码中更详细的使用可查看[vue-blog](https://github.com/vueBlog/vue-blog/blob/fxss/src/views/Detail.vue#L34) 和 [vue-blog-express](https://github.com/vueBlog/vue-blog-express/blob/fxss/routes/addArticle.js#L5)。
