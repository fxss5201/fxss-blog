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

[样例查看](https://fxss5201.github.io/large-screen/#/echartsExample)

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

### 使用

如下演示 echarts 封装使用：

::: details echarts封装使用

可以将如下代码拷贝到项目运行，更方便查看效果

```vue
<template>
  <div class="overflow-y-auto bg-white text-black box-border" style="max-height: calc(100% - 80px)">
    <div class="flex items-start justify-between m-2">
      <div class="w-1/2 overflow-x-hidden border rounded-2">
        <h1 class="text-md my-2">1、默认展示，测试 seriesData 变更</h1>
        <button @click="changeDate1" class="border rounded-4 py-1 px-4 hover:border-blue-700">切换</button>
        <div class="h-80">
          <echarts-module :options="options1" :seriesData="seriesData1"></echarts-module>
        </div>
      </div>
      <div class="w-1/2 overflow-x-hidden border rounded-2 ml-2">
        <h1 class="text-md my-2">2、默认不展示，展示的时候，设置 seriesData</h1>
        <button @click="changeDate2" class="border rounded-4 py-1 px-4 hover:border-blue-700">切换</button>
        <div class="h-80">
          <echarts-module v-if="isShow" :options="options2" :seriesData="seriesData2"></echarts-module>
        </div>
      </div>
    </div>
    <div class="flex items-start justify-between m-2">
      <div class="w-1/2 overflow-x-hidden border rounded-2">
        <h1 class="text-md my-2">3、前后两次赋值的 seriesData[0].data.length 不一样，动画从头开始</h1>
        <button @click="changeDate3" class="border rounded-4 py-1 px-4 hover:border-blue-700">切换</button>
        <div class="h-80">
          <echarts-module :options="options3" :seriesData="seriesData3"></echarts-module>
        </div>
      </div>
      <div class="w-1/2 overflow-x-hidden border rounded-2 ml-2">
        <h1 class="text-md my-2">4、切换宽高，自动 resize</h1>
        <button @click="changeDate4" class="border rounded-4 py-1 px-4 hover:border-blue-700">切换宽度</button>
        <button @click="changeDate41" class="border rounded-4 py-1 px-4 ml-3 hover:border-blue-700">切换高度</button>
        <div class="h-80">
          <div :style="{ width: boxWidth4 ? '100%' : '50%', height: boxHeight4 ? '100%' : '75%' }">
            <echarts-module :options="options4" :seriesData="seriesData4"></echarts-module>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-start justify-between m-2">
      <div class="w-1/2 overflow-x-hidden border rounded-2">
        <h1 class="text-md my-2">5、通过 ref 调用开始结束动画，使用 ref 调用的好处是可以指定在第几项开始动画</h1>
        <button @click="changeDate5" class="border rounded-4 py-1 px-4 hover:border-blue-700">开始动画</button>
        <button @click="changeDate51" class="border rounded-4 py-1 px-4 ml-3 hover:border-blue-700">关闭动画</button>
        <div class="h-80">
          <echarts-module ref="echartsModule5" :options="options5" :seriesData="seriesData5" :autoPlay="false"></echarts-module>
        </div>
      </div>
      <div class="w-1/2 overflow-x-hidden border rounded-2 ml-2">
        <h1 class="text-md my-2">6、改变 autoPlay 开始结束动画，使用 autoPlay 改变的好处是可以从上次暂停动画项处继续动画</h1>
        <button @click="changeDate6" class="border rounded-4 py-1 px-4 hover:border-blue-700">{{ autoPlay6 ? '结束' : '开始' }}动画</button>
        <div class="h-80">
          <echarts-module ref="echartsModule6" :options="options6" :seriesData="seriesData6" :autoPlay="autoPlay6"></echarts-module>
        </div>
      </div>
    </div>
    <div class="flex items-start justify-between m-2">
      <div class="w-1/2 overflow-x-hidden border rounded-2">
        <h1 class="text-md my-2">7、切换动画跳动时间 5s -> 1s</h1>
        <button @click="changeDate7" class="border rounded-4 py-1 px-4 hover:border-blue-700">切换</button>
        <div class="h-80">
          <echarts-module :options="options7" :seriesData="seriesData7" :intervalTime="timeout"></echarts-module>
        </div>
      </div>
      <div class="w-1/2 overflow-x-hidden border rounded-2 ml-2">
        <h1 class="text-md my-2">8、通过 isAddOn 添加移除鼠标事件</h1>
        <button @click="changeDate8" class="border rounded-4 py-1 px-4 hover:border-blue-700">{{ isAddOn8 ? '移除' : '添加' }}</button>
        <div class="h-80">
          <echarts-module :options="options8" :seriesData="seriesData8" :isAddOn="isAddOn8"></echarts-module>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, nextTick } from 'vue'
  import EchartsModule from './../components/EchartsModule.vue'

  // 图表1
  const options1 = reactive({
    legend: {},
    xAxis: {
      type: 'category',
      data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie', 'Brownie', 'Cheese']
    },
    yAxis: {},
    tooltip: {
      trigger: 'axis'
    }
  })
  const seriesData1 = ref([
    {
      type: 'bar',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4, 88, 90]
    },
    {
      type: 'bar',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9, 75, 68]
    },
    {
      type: 'bar',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1, 95, 93]
    }
  ])
  function changeDate1() {
    seriesData1.value = [
      {
        type: 'bar',
        name: '2015',
        data: [89.3, 92.1, 94.4, 85.4, 50, 69]
      },
      {
        type: 'bar',
        name: '2016',
        data: [95.8, 89.4, 91.2, 76.9, 75, 68]
      }
    ]
  }

  // 图表2
  const isShow = ref(false)
  const options2 = reactive({
    legend: {},
    xAxis: {},
    yAxis: {
      type: 'category',
      data: ['Latte', 'Tea', 'Cocoa', 'Brownie']
    },
    tooltip: {
      trigger: 'axis'
    }
  })
  const seriesData2 = ref([])
  function changeDate2() {
    isShow.value = true
    seriesData2.value = [
      {
        type: 'bar',
        name: '2015',
        data: [89.3, 92.1, 94.4, 85.4]
      },
      {
        type: 'bar',
        name: '2016',
        data: [95.8, 89.4, 91.2, 76.9]
      }
    ]
  }

  // 图表3
  const options3 = reactive({
    legend: {},
    xAxis: {
      type: 'category',
      data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie', 'Brownie', 'Cheese']
    },
    yAxis: {},
    tooltip: {
      trigger: 'axis'
    }
  })
  const seriesData3 = ref([
    {
      type: 'bar',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4, 88, 90]
    },
    {
      type: 'bar',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9, 75, 68]
    },
    {
      type: 'bar',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1, 95, 93]
    }
  ])
  function changeDate3() {
    seriesData3.value = [
      {
        type: 'bar',
        name: '2015',
        data: [89.3, 92.1]
      }
    ]
  }

  // 图表4
  const boxWidth4 = ref(true)
  const boxHeight4 = ref(true)
  const options4 = reactive({
    legend: {},
    xAxis: {
      type: 'category',
      data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie', 'Brownie', 'Cheese']
    },
    yAxis: {},
    tooltip: {
      trigger: 'axis'
    }
  })
  const seriesData4 = ref([
    {
      type: 'line',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4, 88, 90]
    },
    {
      type: 'line',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9, 75, 68]
    },
    {
      type: 'line',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1, 95, 93]
    }
  ])
  function changeDate4() {
    boxWidth4.value = !boxWidth4.value
  }
  function changeDate41() {
    boxHeight4.value = !boxHeight4.value
  }

  // 图表5
  const options5 = reactive({
    title: {
      text: '饼图程序调用高亮示例',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      confine: true
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    }
  })
  const seriesData5 = ref([
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ])
  const echartsModule5 = ref()
  function changeDate5() {
    echartsModule5.value.echartsPlay(true, 0, -1)
  }
  function changeDate51() {
    echartsModule5.value.echartsPause()
  }

  // 图表6
  const autoPlay6 = ref(false)
  const options6 = reactive({
    title: {
      text: '饼图程序调用高亮示例',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      confine: true
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    }
  })
  const seriesData6 = ref([
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ])
  const echartsModule6 = ref()
  function changeDate6() {
    autoPlay6.value = !autoPlay6.value
  }

  // 图表7
  const timeout = ref(5000)
  const options7 = reactive({
    legend: {},
    xAxis: {
      type: 'category',
      data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie', 'Brownie', 'Cheese']
    },
    yAxis: {},
    tooltip: {
      trigger: 'axis'
    }
  })
  const seriesData7 = ref([
    {
      type: 'line',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4, 88, 90]
    },
    {
      type: 'line',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9, 75, 68]
    },
    {
      type: 'line',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1, 95, 93]
    }
  ])
  function changeDate7() {
    timeout.value = 1000
  }

  // 图表8
  const isAddOn8 = ref(false)
  const options8 = reactive({
    legend: {},
    xAxis: {
      type: 'category',
      data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie', 'Brownie', 'Cheese']
    },
    yAxis: {},
    tooltip: {
      trigger: 'axis'
    }
  })
  const seriesData8 = ref([
    {
      type: 'line',
      name: '2015',
      data: [89.3, 92.1, 94.4, 85.4, 88, 90]
    },
    {
      type: 'line',
      name: '2016',
      data: [95.8, 89.4, 91.2, 76.9, 75, 68]
    },
    {
      type: 'line',
      name: '2017',
      data: [97.7, 83.1, 92.5, 78.1, 95, 93]
    }
  ])
  function changeDate8() {
    isAddOn8.value = !isAddOn8.value
  }
</script>
```

:::

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
