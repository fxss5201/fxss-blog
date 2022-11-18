---
title: Element-UI、scrollbar-width.js
isOriginal: true
category:
  - Vue
tag:
  - Element-UI
date: 2020-02-06
---

获取浏览器滚动条宽度，一般用于弹出层的时候，设置`body`的右边距，防止`overflow: hidden`的时候元素抖动。

## scrollbar-width.js

```js
import Vue from 'vue';

let scrollBarWidth;

export default function() {
  // 如果是服务器端渲染，则浏览器滚动条的宽度为0
  if (Vue.prototype.$isServer) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  // 强制出现滚动条
  // .el-scrollbar__wrap {
  //   overflow: scroll;
  //   height: 100%
  // }
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);
  // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  // 父元素出现滚动条，子元素无滚动条，父元素减去子元素的宽度就是滚动条宽度
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};
```

## 简单使用

```js
let scrollBarWidth;

export default function() {
  const outer = document.createElement('div');
  outer.style.overflow = 'scroll';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.height = '100%';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);
  // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetWidth
  const widthNoScroll = outer.offsetWidth;

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  // 父元素出现滚动条，子元素无滚动条，父元素减去子元素的宽度就是滚动条宽度
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};
```

弹窗弹出时如果需要锁屏（锁住弹窗下的页面不滚动），则加上下面这段代码，弹窗弹出时锁屏，弹窗关闭时再将其去除。

```js
// 如果需要锁屏（锁住弹窗下的页面不滚动）
if (props.lockScroll) {
  // body 上面是否添加 'el-popup-parent--hidden'
  // .el-popup-parent--hidden {
  //     overflow: hidden
  // }
  this.withoutHiddenClass = !hasClass(document.body, 'el-popup-parent--hidden');
  if (this.withoutHiddenClass) {
    // 获取 body 的 paddingRight
    this.bodyPaddingRight = document.body.style.paddingRight;
    this.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10);
  }
  // 获取滚动条宽
  scrollBarWidth = getScrollBarWidth();
  // body 是否出现滚动条
  let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
  // body 的 overflowY 设置值
  let bodyOverflowY = getStyle(document.body, 'overflowY');
  if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
    // body 的 paddingRight 加上 滚动条宽度来实现防止页面抖动
    document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px';
  }
  // body 添加 overflow: hidden
  addClass(document.body, 'el-popup-parent--hidden');
}
```

弹窗关闭时将弹窗打开时设置的值去除。

```js
if (tthis.withoutHiddenClass) {
  document.body.style.paddingRight = this.bodyPaddingRight;
  removeClass(document.body, 'el-popup-parent--hidden');
}
this.withoutHiddenClass = true;
```

文中的一些方法可以查看[Element-UI / dom.js 的学习](http://www.fxss.work/vue-blog/detail/19)。
