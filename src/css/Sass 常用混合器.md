---
title: Sass 常用混合器
isOriginal: true
category:
  - css
date: 2020-06-05
---

常用混合器，可用 `@include` 引入混合器。

1. 清浮动

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
```

2. 文字超出一行...显示

```scss
@mixin ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

3. 多行超出省略号

```scss
@mixin ellipsis2() {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

4. flex 布局: $direction 主轴方向 $wrap 让弹性盒元素在必要的时候拆行

```scss
@mixin flex($direction: column, $wrap: nowrap) {
  display: flex;
  flex-direction: $direction;
  flex-wrap: $wrap;
}
```

5. 水平垂直居中

```scss
@mixin row-column-center($direction: column) {
  @include flex($direction);
  justify-content: center;
  align-items: center;
}
```

6. 指定宽高

```scss
@mixin width-height($width, $height: $width) {
  width: $width;
  height: $height;
}
```

7. 字体大小、行高、颜色

```scss
@mixin font-size-height-color($size, $line-height, $color) {
  font-size: $size;
  line-height: $line-height;
  color: $color;
}
```
