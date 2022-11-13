---
title: 小程序tabBar右上角添加角标
isOriginal: true
category:
  - 小程序
date: 2020-07-28
---

小程序可以在 `pages.json` 中使用 `tabBar` 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页。

关于 `tabBar` 的配置可以查看 <https://uniapp.dcloud.io/collocation/pages?id=tabbar> 。但我们有时候在某个 tab 展示角标，比如微信第一个 tab 的未读消息提示，第三个 tab 的朋友圈未读消息，这些信息是不能通过 `pages.json` 中的 `tabBar` 来配置的，而是使用如下API进行设置：

 1. [uni.setTabBarBadge(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge) 为 tabBar 某一项的右上角添加文本；
 2. [uni.removeTabBarBadge(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=removetabbarbadge) 移除 tabBar 某一项右上角的文本；
 3. [uni.showTabBarRedDot(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=showtabbarreddot) 显示 tabBar 某一项的右上角的红点；
 4. [uni.hideTabBarRedDot(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbarreddot) 隐藏 tabBar 某一项的右上角的红点。
