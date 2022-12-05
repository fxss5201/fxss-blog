---
title: filter网站全部页面置灰
isOriginal: true
category:
  - css
date: 2022-12-05
---

网站全部页面置灰最简单方式是:

```css
html {
  filter: grayscale(100%);
}
```

可以 F12 打开浏览器调试面板把上述样式加入查看。

原理：[css filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)。
