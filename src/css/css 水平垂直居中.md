---
title: css 水平垂直居中
isOriginal: true
category:
  - css
date: 2020-02-17
---

下面为公共代码：

```html
<div class="box">
    <div class="small">small</div>
</div>
```

```css
.box {
    width: 300px;
    height: 300px;
    background: #ddd;
}
.small {
    background: red;
}
```

## `absolute` + `margin`实现

### `absolute` + `margin` 第1种

```css
.box {
    position: relative;
}
.small {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    width: 100px;
    height: 100px;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/eQobgb)

### `absolute` + `margin` 第2种

```css
.box {
    position: relative;
}
.small {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100px;
    height: 100px;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/PxgXRJ)

## `absolute` + `calc` 实现

```css
.box {
    position: relative;
}
.small {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/rQboqX)

## `absolute` + `transform` 实现

```css
.box {
    position: relative;
}
.small {
    position: absolute;
    top: 50%;
    left: 50%;
    /* transform: translate(-50%,-50%); */
    transform: translate3d(-50%,-50%,0);
    width: 100px;
    height: 100px;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/vQMvbZ)

## 转行内元素

```css
.box {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.small {
    padding: 6px 10px;
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: 16px;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/xQeMwE)

## `table-cell`

```css
.box {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.small {
    padding: 6px 10px;
    display: inline-block;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/ZmZweG)

## `flex`

### `flex` 第1种

```css
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/rQbPJM)

### `flex` 第2种

```css
.box {
    display: flex;
    justify-content: center;
}
.small {
    align-self: center;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/LXvqBe)

## `grid`

### `grid` 第1种

```css
.box {
    display: grid;
    justify-items: center;
    align-items: center;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/dQLaxj)

### `grid` 第2种

```css
.box {
    display: grid;
}
.small {
    justify-self: center;
    align-self: center;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/JeVzdv)

### `grid` 第3种

```css
.box {
    display: grid;
    justify-items: center;
}
.small {
    align-self: center;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/dQLrOw)

### `grid` 第4种

```css
.box {
    display: grid;
    align-items: center;
}
.small {
    justify-self: center;
}
```

[Open in CodePen](https://codepen.io/fxss5201/pen/yQrwMb)
