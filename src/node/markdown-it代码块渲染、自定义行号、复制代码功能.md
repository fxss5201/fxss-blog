---
title: markdown-it代码块渲染、自定义行号、复制代码功能
shortTitle: markdown-it
isOriginal: true
category:
  - node
tag:
  - markdown-it
date: 2020-03-12
---

之前写过一篇关于代码块渲染添加自定义行号的文章：[markdown-it和highlight.js的结合渲染代码，并添加自定义行号](https://www.fxss.work/vue-blog/detail/33) 。

不过在之后的渲染使用过程中由于效果不是很好，所以重新改版，并借此机会添加复制代码功能。

本博客采用的后端是 node.js 框架 Express，在使用 markdown-it 渲染 md 文件的时候，选择在添加文章或者更新文章的时候由 md 生成 html。

## 代码块生成

```js
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    // 当前时间加随机数生成唯一的id标识
    const codeIndex = parseInt(Date.now()) + Math.floor(Math.random() * 10000000)
    // 复制功能主要使用的是 clipboard.js
    let html = `<button class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</button>`
    const linesLength = str.split(/\n/).length - 1
    // 生成行号
    let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
    for (let index = 0; index < linesLength; index++) {
      linesNum = linesNum + '<span></span>'
    }
    linesNum += '</span>'
    if (lang && hljs.getLanguage(lang)) {
      try {
        // highlight.js 高亮代码
        const preCode = hljs.highlight(lang, str, true).value
        html = html + preCode
        if (linesLength) {
          html += '<b class="name">' + lang + '</b>'
        }
        // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "&lt;" 代替，不影响复制功能
        return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
      } catch (error) {
        console.log(error)
      }
    }

    const preCode = md.utils.escapeHtml(str)
    html = html + preCode
    return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
  }
})
```

# 前端

## 前端实现代码选中的功能：

```js
import Clipboard from 'clipboard'

export default {
  ...
  data () {
    return {
      ...
      clipboard: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.clipboard = new Clipboard('.copy-btn')
      // 复制成功失败的提示
      this.clipboard.on('success', (e) => {
        this.$message.success('复制成功')
      })
      this.clipboard.on('error', (e) => {
        this.$message.error('复制成功失败')
      })
    })
  },
  ...
  destroyed () {
    this.clipboard.destroy()
  }
}
```

## 自定义行号

```scss
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,&::-webkit-scrollbar-track {
      background: #1E1E1E;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1E1E1E;
      width: 6px
    }
  }
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, .66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 2px;
    right: 50px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
  .copy-btn {
    position: absolute;
    top: 2px;
    right: 4px;
    z-index: 10;
    color: #333;
    cursor: pointer;
    background-color: #fff;
    border: 0;
    border-radius: 2px;
  }
}
```

自定义行号主要使用的是CSS计数方面的知识，感兴趣可以查看 [css计数器](https://www.fxss.work/vue-blog/detail/63) 。
