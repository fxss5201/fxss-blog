---
title: tailwindcss一览表
isOriginal: true
category:
  - css
tag:
  - tailwindcss
date: 2022-11-13
image: https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f80fb055-eaa7-4008-b0c3-05194e370800/26671f33-7f69-40e8-af57-cc66a8d437cf.png
---

![Tailwind CSS IntelliSense](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f80fb055-eaa7-4008-b0c3-05194e370800/26671f33-7f69-40e8-af57-cc66a8d437cf.png)

引入 [tailwindcss](https://www.tailwindcss.cn/docs) 的目的是减少编写 css ，下面列出的是 tailwindcss 一览表：

## [间距](https://www.tailwindcss.cn/docs/customizing-spacing#-2)

默认情况下，Tailwind 包括一个丰富和全面的数字间隔比例。这些值是成比例的，所以 16 是 8 的两倍。一个间距单位等于 0.25rem，在通用浏览器中默认为 4px。

会应用 `padding`/`margin`/`top`/`left`/`right`/`bottom`/`width`/`height`/`lineHeight`/，`p-1 = padding: 4px;`/`p-1 = padding: 0.25rem;` 。

## 前缀

输入前缀会有代码提示，代码提示中包含具体内容。

|前缀|含义|
|----|----|
|`box-`|设置`box-sizing`|
|`float-`|设置浮动`float`|
|`clear-`|清楚浮动`clear`|
|`object-`|用于控制可替换元素的内容如何调整大小及在其容器中的位置`object-fit`/`object-position`|
|`overflow-`|如何处理超出容器的内容`overflow`|
|`overscroll-`|用于控制浏览器到达滚动区域边界时的行为`overscroll-behavior`|
|`z-`|用于设置`z-index`|
|`flex`/`flex-`|flex布局`flex`/`flex-direction`/`flex-wrap`/`flex-grow`/`flex-shrink`|
|`order`|flex和grid的排序`order`|
|`justify-`|用于设置`justify-content`/`justify-items`/`justify-self`|
|`content-`|用于设置`align-content`|
|`items-`|用于设置`align-items`|
|`self-`|用于设置`align-self`|
|`grid-`|grid布局`grid-template-columns`/`grid-column`/`grid-template-rows`/`grid-auto-flow`|
|`row-`|元素的大小和放置方式`grid-row`|
|`auto-`|控制隐式创建的网格行/列的大小`grid-auto-rows`/`grid-auto-columns`|
|`gap-`|grid和flexbox items间隔`gap`/`row-gap`/`column-gap`|
|`place-`|用于同时控制内容如何在水平和垂直方向上对齐`place-content`/`place-items`/`place-self`|
|`p-`|内边距`padding`|
|`m-`|外边距`margin`|
|`w-`|元素宽度`width`|
|`min-w-`|最小宽度`min-width`|
|`max-w-`|最小宽度`max-width`|
|`h-`|元素高度`height`|
|`min-h-`|最小高度`min-height`|
|`max-h-`|最小高度`max-height`|
|`font-`|字体序列`font-family`/字体粗细`font-weight`|
|`text-`|字体大小、行高、对齐、颜色、透明度`font-size`/`line-height`/`text-align`/`color`|
|`leading-`|行高`line-height`|
|`tracking-`|字母间距`letter-spacing`|
|`align-`|设置`vertical-align`|
|`whitespace-`|设置`white-space`|
|`break-`|文本换行`overflow-wrap`/`word-break`|
|`placeholder-`|占位文本颜色及透明度|
|`list-`|列表项标记类型`list-style-type`/`list-style-position`|
|`bg-`|背景相关`background-attachment`/`background-clip`/`background-color`/`background-origin`/`background-position`/`background-repeat`/`background-size`/`background-image`|
|`rounded-`|设置`border-radius`|
|`border-`|设置边框颜色、厚度、透明度、样式、表格边框`border-width`/`border-color`/`border-style`/`border-collapse`|
|`divide-`|设置分割线颜色、厚度、透明度、样式|
|`ring-`|设置分割线颜色、厚度、透明度、偏移厚度、偏移颜色`box-shadow`|
|`shadow-`|盒阴影|
|`opacity-`|不透明度`opacity`|
|`table-`|表格布局`table-layout`|
|`transition-`|过渡属性`transition-property`/`transition-timing-function`/`transition-duration`|
|`duration-`|过渡持续时间`transition-duration`|
|`ease-`|过渡计时函数`transition-timing-function`|
|`delay-`|过渡延迟`transition-delay`|
|`animate-`|动画`animation`|
|`transform-`|变换`transform`|
|`origin-`|变换原点`transform-origin`|
|`scale-`|缩放|
|`rotate-`|旋转|
|`translate-`|平移|
|`skew-`|倾斜|
|`pointer-`|指向事件`pointer-events`|
|`resize`/`resize-`|大小调整`resize`|
|`select-`|用户选择`user-select`|
|`cursor-`|光标效果`cursor`|
|`outline-`|轮廓`outline`/`outline-offset`|

## 特殊的，无共同前缀

### [Top / Right / Bottom / Left](https://www.tailwindcss.cn/docs/top-right-bottom-left)

使用 `{top|right|bottom|left|inset}-0` 功能类，将绝对定位的元素锚定在最近定位的父元素的任何边缘上。

### 可见性

|Class|Properties|
|----|----|
|`visible`|`visibility: visible;`|
|`invisible`|`visibility: hidden;`|

### 定位

|Class|Properties|
|----|----|
|`static`|`position: static;`|
|`fixed`|`position: fixed;`|
|`absolute`|`position: absolute;`|
|`relative`|`position: relative;`|
|`sticky`|`position: sticky;`|

### 元素显示类型

|Class|Properties|
|----|----|
|`block`|`display: block;`|
|`inline-block`|`display: inline-block;`|
|`inline`|`display: inline;`|
|`flex`|`display: flex;`|
|`inline-flex`|`display: inline-flex;`|
|`table`|`display: table;`|
|`inline-table`|`display: inline-table;`|
|`table-caption`|`display: table-caption;`|
|`table-cell`|`display: table-cell;`|
|`table-column`|`display: table-column;`|
|`table-column-group`|`display: table-column-group;`|
|`table-footer-group`|`display: table-footer-group;`|
|`table-header-group`|`display: table-header-group;`|
|`table-row-group`|`display: table-row-group;`|
|`table-row`|`display: table-row;`|
|`flow-root`|`display: flow-root;`|
|`grid`|`display: grid;`|
|`inline-grid`|`display: inline-grid;`|
|`contents`|`display: contents;`|
|`list-item`|`display: list-item;`|
|`hidden`|`display: none;`|

### 文本装饰

|Class|Properties|
|----|----|
|`underline`|`text-decoration: underline;`|
|`line-through`|`text-decoration: line-through;`|
|`no-underline`|`text-decoration: none;`|

### 文本转换

|Class|Properties|
|----|----|
|`uppercase`|`text-transform: uppercase;`|
|`lowercase`|`text-transform: lowercase;`|
|`capitalize`|`text-transform: capitalize;`|
|`normal-case`|`text-transform: none;`|

### 文本溢出

|Class|Properties|
|----|----|
|`truncate`|`overflow: hidden;text-overflow: ellipsis;white-space: nowrap;`|
|`overflow-ellipsis`|`text-overflow: ellipsis;`|
|`overflow-clip`|`text-overflow: clip;`|

### 字体样式

|Class|Properties|
|----|----|
|`italic`|`font-style: italic;`|
|`not-italic`|`font-style: normal;`|

## [悬停、焦点和其它状态](https://www.tailwindcss.cn/docs/hover-focus-and-other-states)

下面列出几个常用的

### Hover

添加 `hover:` 前缀，以在 hover 状态时应用一个功能类。

``` html
<button class="bg-red-500 hover:bg-red-700 ...">
  Hover me
</button>
```

### Focus

添加 `focus:` 前缀，以在 focus 状态时应用一个功能类。

``` html
<input class="focus:ring-2 focus:ring-blue-600 ...">
```

### Active

添加 `active:` 前缀，以在元素处于 active 状态时应用某个功能。

``` html
<button class="bg-green-500 active:bg-green-700 ...">
  Click me
</button>
```

### Disabled

添加 `disabled:` 前缀，以便当一个元素被禁用时才应用功能类。

``` html
<button class="disabled:opacity-50 ..." disabled>
  Submit
</button>
```

### Visited

添加 `visited:` 前缀，以便当一个链接被访问后才应用功能类。

``` html
<a href="#" class="text-blue-600 visited:text-purple-600 ...">Link</a>
```

### First-child

添加 `first:` 前缀，以仅当元素是父元素的第一个子元素时才应用功能类。当使用某种循环生成元素时，最为有用。

``` html
<div v-for="item in items" class="transform first:rotate-45 ...">
  {{ item }}
</div>
```

### Last-child

添加 `last:` 前缀，在仅当元素是父元素的最后一个子元素时才应用功能类。当使用某种循环生成元素时，最为有用。

``` html
<div v-for="item in items" class="transform last:rotate-45 ...">
  {{ item }}
</div>
```

### Odd-child

添加 `odd:` 前缀使得仅在元素是父级奇数子元素的时候才应用功能类。当使用某种循环生成元素时，最为有用。

``` html
<div v-for="item in items" class="transform odd:rotate-45 ...">
  {{ item }}
</div>
```

### Even-child

添加 `even:` 前缀使得仅在元素是父级偶数子元素的时候才应用功能类。当使用某种循环生成元素时，最为有用。

``` html
<div v-for="item in items" class="transform even:rotate-45 ...">
  {{ item }}
</div>
```

## 个人配置

为了使用方便，个人增加如下配置 `tailwind.config.js`：

``` js
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"], // 生产优化，删除未使用的CSS
  content: [],
  theme: {
    extend: {
      fontSize: {
        // 增加字体配置
        // text-12 = font-size: 12px;
        // text-sm = font-size: 24px;line-height: 21px;
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        30: "30px",
        sm: ["14px", "21px"],
        md: ["16px", "24px"],
        lg: ["20px", "30px"],
        xl: ["24px", "36px"],
      },
      lineHeight: {
        // 增加行高配置
        // leading-12 = line-height: 12px;
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        21: "21px",
        24: "24px",
        27: "27px",
        30: "30px",
        36: "36px",
        45: "45px",
      },
      borderRadius: {
        // 增加圆角配置
        // rounded-2 = border-radius: 2px;
        0: "0px",
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
      },
    },
  },
   // 使用变体新增状态类
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      backgroundOpacity: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      borderColor: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      borderOpacity: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      boxShadow: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      opacity: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      outline: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      textColor: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      textOpacity: ['active', 'disabled', 'visited', 'first', 'last', 'odd', 'even'],
      margin: ['first', 'last', 'odd', 'even'],
      padding: ['first', 'last', 'odd', 'even']
    }
  },
  plugins: [],
};
```

`tailwind.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
```
