---
title: css选择器
isOriginal: true
category:
  - css
date: 2020-02-09
---

## [attribute]

|例子|例子描述|
|-|-|
|`[target]`|选择带有 target 属性所有元素。|

## [attribute=value]

|例子|例子描述|
|-|-|
|`[target=_blank]`|选择 target="_blank" 的所有元素。|

## [attribute~=value]

|例子|例子描述|
|-|-|
|`[title~=flower]`|选择 title 属性**包含**单词 "flower" 的所有元素。|

## [attribute*=value]

|例子|例子描述|
|-|-|
|`a[src*="abc"]`|选择其 src 属性中包含 "abc" 子串的每个 <a> 元素。|

`[attribute~=value]` 和 `[attribute*=value]` 的相同点和区别：

```html
<style> 
div[class~="test"] {
  background: #f00;
}
</style>
<div class="test">实验1</div> <!-- 背景色为红色 -->
<div class="test test1">实验2</div> <!-- 背景色为红色 -->
<div class="test-1">实验3</div>
<div class="test_1">实验4</div>
```

```html
<style> 
div[class*="test"] {
  background: #f00;
}
</style>
<div class="test">实验1</div> <!-- 背景色为红色 -->
<div class="test test1">实验2</div> <!-- 背景色为红色 -->
<div class="test-1">实验3</div> <!-- 背景色为红色 -->
<div class="test_1">实验4</div> <!-- 背景色为红色 -->
```

## [attribute|=value]

|例子|例子描述|
|-|-|
|`[lang|=en]`|选择 lang 属性值**以 "en" 开头**的所有元素。|

## [attribute^=value]

|例子|例子描述|
|-|-|
|`a[src^="https"]`|选择其 src 属性值以 "https" 开头的每个 `<a>` 元素。|

`[attribute|=value]` 和 `[attribute^=value]` 的相同点和区别：

```html
<style> 
div[class|="test"] {
  background: #f00;
}
</style>
<div class="test">实验1</div> <!-- 背景色为红色 -->
<div class="test test1">实验2</div>
<div class="test-1">实验3</div> <!-- 背景色为红色 -->
<div class="test_1">实验4</div>
```

```html
<style> 
div[class^="test"] {
  background: #f00;
}
</style>
<div class="test">实验1</div> <!-- 背景色为红色 -->
<div class="test test1">实验2</div> <!-- 背景色为红色 -->
<div class="test-1">实验3</div> <!-- 背景色为红色 -->
<div class="test_1">实验4</div> <!-- 背景色为红色 -->
```

## [attribute$=value]

|例子|例子描述|
|-|-|
|`a[src$=".pdf"]`|选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。|
