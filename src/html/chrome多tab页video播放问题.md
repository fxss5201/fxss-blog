---
title: chrome多tab页video播放问题
isOriginal: true
category:
  - html
tag:
  - video
date: 2022-12-04
---

最近在做大屏项目，在研发测试阶段，一切正常，在投放线上的时候，线上是在一台机器上同时打开10来个chrome tab页，这个时候测试反馈说线上查看的时候页面视频很卡，页面刷新视频就动了一下就不动了，我在自己本地页面也试了下，chrome 同时打开 10 个 tab 页播放视频，确实是视频动了一下就不播放了。

视频多是采用如下方案，进入页面之后自动播放：

``` vue
<video autoplay muted loop class="w-full h-full">
  <source v-for="item in props.srcList" :key="item.type" :src="item.src" :type="item.type" />
</video>
```

或者

``` vue
<video autoplay muted loop class="w-full h-full" :src="videoSrc"></video>
```

按理说是没问题的，最后在网上查资料，说是可能硬件加速的一些问题，在 chrome 浏览器的搜索框中搜索 `chrome://flags` , 在页面中再搜索 `hardware` :

![hardware](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f80fb055-eaa7-4008-b0c3-05194e370800/e2998bcb-6e9d-4265-b16b-ed34879321fd.png)

需要将上述两项搜索结果设置为 `Disabled`。

经过设置测试之后，打开多个 tab 页同时播放视频可以正常播放了，chrome 使用版本为 **108.0.5359.94**。
