---
title: css、scss常用汇总
isOriginal: true
category:
  - css
tag:
  - scss
date: 2022-03-17
---

## 清除浮动

```scss
@mixin clearfix {
  $selector: &;

  @at-root {
    #{$selector}::before,
    #{$selector}::after {
      display: table;
      content: "";
    }
    #{$selector}::after {
      clear: both;
    }
  }
}

.row {
  @include clearfix;
}
```

## 文字超出...显示

一行：

```scss
@mixin ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.one-line {
  @include ellipsis;
}
```

多行：

```scss
.ellipsis-l2 {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
}
.ellipsis-l3 {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical
}
```
