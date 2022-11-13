---
title: 防抖函数 debounce
category:
  - javascript
date: 2020-06-01
---

本文转自：[深入浅出防抖函数 debounce | 木易杨前端进阶](https://muyiy.cn/blog/7/7.2.html)

```js
// fn 是需要防抖处理的函数
// wait 是时间间隔
// immediate 表示第一次是否立即执行
function debounce(fn, wait = 50, immediate) {
  // 通过闭包缓存一个定时器 id
  let timer = null
  // 将 debounce 处理结果当作函数返回
  // 触发事件回调时执行这个返回函数
  return function(...args) {
    // 如果已经设定过定时器就清空上一次的定时器
    if (timer) clearTimeout(timer)
  
    // immediate 为 true 表示第一次触发后执行
    // timer 为空表示首次触发
    if (immediate && !timer) {
        fn.apply(this, args)
    }
    
    // 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
    timer = setTimeout(() => {
        fn.apply(this, args)
    }, wait)
  }
}

// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000, true)
// 第一次触发 scroll 执行一次 fn，后续只有在停止滑动 1 秒后才执行函数 fn
document.addEventListener('scroll', betterFn)
```

现在考虑一种情况，如果用户的操作非常频繁，不等设置的延迟时间结束就进行下次操作，会频繁的清除计时器并重新生成，所以函数 fn 一直都没办法执行，导致用户操作迟迟得不到响应。

有一种思想是将「节流」和「防抖」合二为一，变成加强版的节流函数，关键点在于「 wait 时间内，可以重新生成定时器，但只要 wait 的时间到了，必须给用户一个响应」。这种合体思路恰好可以解决上面提出的问题。

结合 throttle 和 debounce 代码，加强版节流函数 throttle 如下，新增逻辑在于当前触发时间和上次触发的时间差小于时间间隔时，设立一个新的定时器，相当于把 debounce 代码放在了小于时间间隔部分。

```js
// fn 是需要节流处理的函数
// wait 是时间间隔
function throttle(fn, wait) {
  
  // previous 是上一次执行 fn 的时间
  // timer 是定时器
  let previous = 0, timer = null
  
  // 将 throttle 处理结果当作函数返回
  return function (...args) {
    
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    
    // ------ 新增部分 start ------ 
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔
    if (now - previous < wait) {
      // 如果小于，则为本次触发操作设立一个新的定时器
      // 定时器时间结束后执行函数 fn 
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        previous = now
        fn.apply(this, args)
      }, wait)
    // ------ 新增部分 end ------ 
      
    } else {
      // 第一次执行
      // 或者时间间隔超出了设定的时间间隔，执行函数 fn
      previous = now
      fn.apply(this, args)
    }
  }
}

// DEMO
// 执行 throttle 函数返回新函数
const betterFn = throttle(() => console.log('fn 节流执行了'), 1000)
// 第一次触发 scroll 执行一次 fn，每隔 1 秒后执行一次函数 fn，停止滑动 1 秒后再执行函数 fn
document.addEventListener('scroll', betterFn)
```
