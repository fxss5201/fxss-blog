---
title: Vue echarts封装
isOriginal: true
category:
  - Vue
tag:
  - echarts
date: 2022-12-04
---

做大屏的时候经常会遇到 echarts 展示，下面展示在 Vue2.7 / Vue3 中对 echarts （^5.4.0） 的简单封装。

## echarts 封装使用

### props 说明

|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|opts|初始化传入的 opts <https://echarts.apache.org/zh/api.html#echarts.init>|`Object`|-|`{renderer: 'svg'}`|
|options|配置项，对应 <https://echarts.apache.org/zh/option.html#title>|`Object`|-|`{}`|
|seriesData|series 数据配置内容<https://echarts.apache.org/zh/option.html#series>，数据变更自动更新|`Array`|-|`[]`|
|intervalTime|自动切换的时间跨度，指自动切换 高亮 + tooltip 展示，[例子](https://echarts.apache.org/handbook/zh/concepts/event#%E4%BB%A3%E7%A0%81%E8%A7%A6%E5%8F%91-echarts-%E4%B8%AD%E7%BB%84%E4%BB%B6%E7%9A%84%E8%A1%8C%E4%B8%BA)|`Number`|-|`1500`|
|autoPlay|是否自动播放，指的是是否自动添加切换 高亮 + tooltip 展示|`Boolean`|-|`true`|
|isAddOn|是否自动添加鼠标上移事件，切换 高亮 + tooltip 展示的时候，鼠标再移动到其他需要高亮显示上时，自动停止切换动画，鼠标移开自动继续播放|`Boolean`|-|`true`|

### 方法

|方法名|说明|参数|
|----|----|----|
|echartsInstance|返回 echarts 实例，如果功能不满足，自己定义|-|
|echartsPlay|echarts开启动画，对外开放，可手动调用|`clear = false, seriesIndex = 0, dataIndex = -1`clear: 是否立即开始动画，并清除上个定时器，开启下个定时器，默认为 false；seriesIndex: series 中的第几项数据，默认为 0；dataIndex: series[seriesIndex].data 中的第几项，默认为 -1|
|echartsPause|echarts关闭动画，对外开放，可手动调用|-|

## 代码封装

```vue
<template>
  <div ref="echartsRef" style="width: 100%; height: 100%"></div>
</template>

<script setup>
  import { defineProps, defineExpose, watch, nextTick, ref, onMounted, onBeforeUnmount } from 'vue'
  import * as echarts from 'echarts'
  import { useElementSize } from '@vueuse/core'

  const props = defineProps({
    // https://echarts.apache.org/zh/api.html#echarts.init
    // 初始化传入的 opts
    opts: {
      type: Object,
      default() {
        return {
          renderer: 'svg'
        }
      }
    },
    // 配置项
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    // 数据集合
    seriesData: {
      type: Array,
      default() {
        return []
      }
    },
    // 自动切换的时间跨度
    intervalTime: {
      type: Number,
      default: 1500
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 是否自动添加鼠标上移事件
    isAddOn: {
      type: Boolean,
      default: true
    }
  })

  const echartsRef = ref()
  let myChart = null
  let echartsOptions = {}
  let myChartEventTime = null
  let currentSeriesIndex = 0
  let currentDataIndex = -1

  // 是否调用过 echartsPlay
  let isEchartsPlay = false
  // echarts初始化
  function init() {
    destroyEchart() //判断是否有echart实例，如果有，先销毁
    myChart = echarts.init(echartsRef.value, null, props.opts)
    update()

    if (props.isAddOn) {
      addEventFn()
    }
  }

  // 绑定事件
  function addEventFn() {
    // 鼠标移上查看的时候，暂停动画
    myChart.on('mouseover', 'series', event => {
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: currentSeriesIndex,
        dataIndex: currentDataIndex
      })
      echartsPause()
    })
    // 鼠标移出的时候打开动画
    myChart.on('mouseout', 'series', event => {
      // 自动播放 或者 调用过 echartsPlay
      if (props.autoPlay || isEchartsPlay) echartsPlay(true, event.seriesIndex, event.dataIndex - 1)
    })
  }

  // 移除事件
  function removeEventFn() {
    myChart.off('mouseover')
    myChart.off('mouseout')
  }

  // 数据更新
  function update(isRefresh = false) {
    // 逻辑处理组件options参数
    const options = {
      ...props.options,
      series: props.seriesData
      // other options here ...
    }
    echartsOptions = options
    // 调用ECharts组件setOption更新
    nextTick(() => {
      myChart.setOption(options, true)
      if (options.series.length && props.autoPlay) {
        if (isRefresh) {
          echartsPlay(false, currentSeriesIndex, -1)
        } else {
          echartsPlay(false, currentSeriesIndex, currentDataIndex)
        }
      }
    })
  }

  // 销毁echarts
  function destroyEchart() {
    if (myChart) {
      if (props.isAddOn) {
        removeEventFn()
      }
      if (typeof myChart.clear === 'function') myChart.clear()
      if (typeof myChart.dispose === 'function') myChart.dispose()
      myChart = null
    }
  }

  /**
   * echarts开启动画，对外开放，可手动调用
   * clear: 是否立即开始动画，并清除上个定时器，开启下个定时器，默认为 false
   * seriesIndex: series 中的第几项数据，默认为 0
   * dataIndex: series[seriesIndex].data 中的第几项，默认为 -1
   */
  function echartsPlay(clear = false, seriesIndex = 0, dataIndex = -1) {
    if (clear) {
      echartsPause()
    }
    isEchartsPlay = true
    currentSeriesIndex = seriesIndex
    currentDataIndex = dataIndex
    if (!myChartEventTime) {
      echartsEventPlay(seriesIndex)
    }
  }

  function echartsTimeout(seriesIndex = 0) {
    myChartEventTime = setTimeout(() => {
      echartsEventPlay(seriesIndex)
    }, props.intervalTime)
  }

  function echartsEventPlay(seriesIndex = 0) {
    const dataLen = echartsOptions.series[seriesIndex].data.length
    if (myChart && myChart.dispatchAction) {
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex,
        dataIndex: currentDataIndex
      })
      currentDataIndex = (currentDataIndex + 1) % dataLen
      // 高亮当前图形
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex,
        dataIndex: currentDataIndex
      })
      // 显示 tooltip
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex,
        dataIndex: currentDataIndex
      })
    }
    echartsTimeout(seriesIndex)
  }

  // echarts关闭动画，对外开放，可手动调用
  function echartsPause() {
    if (myChart && myChart.dispatchAction) {
      // 取消之前高亮的图形
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: currentSeriesIndex,
        dataIndex: currentDataIndex
      })
      // 取消显示 tooltip
      myChart.dispatchAction({
        type: 'hideTip'
      })
    }
    if (myChartEventTime) {
      clearTimeout(myChartEventTime)
      myChartEventTime = null
    }
  }

  // 重置大小
  function echartsResize() {
    if (myChart) myChart.resize()
  }

  onMounted(() => {
    init()
  })
  onBeforeUnmount(() => {
    echartsPause()
    destroyEchart()
  })

  watch(
    () => props.seriesData,
    (val, oldVal) => {
      let isRefresh = false
      // 前后两次赋值的 seriesData[0].data.length 不一样，动画从头开始
      if (val.length > 0 && val[currentSeriesIndex].data && oldVal.length > 0 && oldVal[currentSeriesIndex].data && val[currentSeriesIndex].data.length !== oldVal[currentSeriesIndex].data.length) {
        isRefresh = true
      }
      update(isRefresh)
    },
    { deep: true }
  )

  // 监听 props.autoPlay ，自动关闭、继续动画
  watch(
    () => props.autoPlay,
    val => {
      if (val) {
        echartsPlay(false, currentSeriesIndex, currentDataIndex)
      } else {
        echartsPause()
      }
    }
  )

  // 监听 props.isAddOn ，自动添加、移除事件
  watch(
    () => props.isAddOn,
    val => {
      if (val) {
        addEventFn()
      } else {
        removeEventFn()
      }
    }
  )

  // 父元素大小改变的时候，自动 resieze
  const { width, height } = useElementSize(echartsRef)
  watch(
    () => width.value,
    val => {
      nextTick(() => {
        echartsResize()
      })
    }
  )
  watch(
    () => height.value,
    val => {
      nextTick(() => {
        echartsResize()
      })
    }
  )

  defineExpose({
    echartsInstance: () => myChart,
    echartsPlay,
    echartsPause
  })
</script>
```
