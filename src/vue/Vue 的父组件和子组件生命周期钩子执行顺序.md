---
title: Vue 的父组件和子组件生命周期钩子执行顺序
shortTitle: Vue 生命周期钩子执行顺序
isOriginal: true
category:
  - Vue
date: 2020-04-18
---

1. 加载渲染过程
    1. 父组件： `beforeCreate` -> `created` -> `beforeMount`
    2. 子组件： -> `beforeCreate` -> `created` -> `beforeMount` -> `mounted`
    3. 父组件： -> `mounted`

2. 子组件更新过程
    1. 父组件： `beforeUpdate`
    2. 子组件： -> `beforeUpdate` -> `updated`
    3. 父组件： -> `updated`

3. 父组件更新过程
    1. 父组件： `beforeUpdate` -> `updated`

4. 销毁过程
    1. 父组件： `beforeDestroy`
    2. 子组件： -> `beforeDestroy` -> `destroyed`
    3. 父组件： -> `destroyed`
