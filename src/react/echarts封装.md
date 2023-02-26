---
title: React echarts封装
isOriginal: true
category:
  - React
tag:
  - echarts
date: 2023-02-26
---

做大屏的时候经常会遇到 echarts 展示，下面展示在 React （^18.2.0） 中对 echarts （^5.4.0） 的简单封装。

[样例查看](https://fxss5201.github.io/react-antd/#/pageEcharts)

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
|onRef|ref实例使用，在父组件中`const echartsRef = React.createRef();...<EchartsModule onRef={echartsRef} />`|-|-|-|
|className|添加样式|`String`|-|`''`|

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

```jsx
import { Button, Typography, theme } from "antd";
import React from "react";
import EchartsModule from "../../components/EchartsModule";

const { Title } = Typography;
const { useToken } = theme;

const PageDemo = () => {
  const { token } = useToken();
  const { colorText, colorBgContainer, colorBorder } = token;
  const echartsRef = React.createRef();
  const options = {
    textStyle: {
      color: colorText,
    },
    title: {
      text: '饼图程序调用高亮示例',
      left: 'center',
      textStyle: {
        color: colorText,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      confine: true,
      className: 'echart-tooltip-zIndex',
      backgroundColor: colorBgContainer,
      borderColor: colorBorder,
      textStyle: {
        color: colorText,
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      textStyle: {
        color: colorText,
      },
    }
  }

  const seriesData = [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      lable: {
        textStyle: {
          color: colorText,
        },
      },
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
        }
      }
    }
  ]
  const changeDate = () => {
    echartsRef.current.echartsPlay(true, 0, -1)
  }
  const changeDate1 = () => {
    echartsRef.current.echartsPause()
  }
  const changeDate2 = () => {
    const echartsInstance = echartsRef.current.echartsInstance()
    echartsInstance.clear()
    echartsInstance.dispose()
  }

  return (
    <div>
      <Title level={3}>6、通过 ref 调用开始结束动画，使用 ref 调用的好处是可以指定在第几项开始动画</Title>
      <div>
        <Button onClick={changeDate}>开始动画</Button>
        <Button className="ml-2" onClick={changeDate1}>结束动画</Button>
        <Button className="ml-2" onClick={changeDate2}>获取实例，销毁echarts</Button>
      </div>
      <div className="w-full h-80">
        <EchartsModule onRef={echartsRef} options={options} seriesData={seriesData}></EchartsModule>
      </div>
    </div>
  );
};

export default PageDemo;
```

:::

## 代码封装

```jsx
import { useEffect, useImperativeHandle, useRef } from "react";
import * as echarts from 'echarts';
import { useDeepCompareEffect, useMount, useSize, useUnmount, useUpdateEffect } from "ahooks";
import classNames from 'classnames';

const EchartsModule = ({
  // https://echarts.apache.org/zh/api.html#echarts.init
  // 初始化传入的 opts
  opts = { renderer: 'svg' },
  // 配置项
  options = {},
  // 数据集合
  seriesData = [],
  // 自动切换的时间跨度
  intervalTime = 1500,
  // 是否自动播放
  autoPlay = true,
  // 是否自动添加鼠标上移事件
  isAddOn = true,
  onRef,
  className = ''
}) => {
  
  const echartsRef = useRef(null);
  let myChart = useRef(null);
  let echartsOptions = useRef({});
  let myChartEventTime = useRef(null);
  let currentSeriesIndex = useRef(0);
  let currentDataIndex = useRef(-1);
  let timer = useRef(intervalTime);

  // 是否调用过 echartsPlay
  let isEchartsPlay = useRef(false);
  // echarts初始化
  function init() {
    destroyEchart() //判断是否有echart实例，如果有，先销毁
    myChart.current = echarts.init(echartsRef.current, null, opts)
    update()

    if (isAddOn) {
      addEventFn()
    }
  }

  // 绑定事件
  function addEventFn() {
    // 鼠标移上查看的时候，暂停动画
    myChart.current.on('mouseover', 'series', event => {
      // 取消之前高亮的图形
      myChart.current.dispatchAction({
        type: 'downplay',
        seriesIndex: currentSeriesIndex.current,
        dataIndex: currentDataIndex.current
      })
      echartsPause()
    })
    // 鼠标移出的时候打开动画
    myChart.current.on('mouseout', 'series', event => {
      // 自动播放 或者 调用过 echartsPlay
      if (autoPlay || isEchartsPlay.current) echartsPlay(true, event.seriesIndex, event.dataIndex - 1)
    })
  }

  // 移除事件
  function removeEventFn() {
    myChart.current.off('mouseover')
    myChart.current.off('mouseout')
  }

  // 数据更新
  function update() {
    // 逻辑处理组件options参数
    const curOptions = {
      ...options,
      series: seriesData
      // other options here ...
    }
    echartsOptions.current = curOptions
    // 调用ECharts组件setOption更新
    myChart.current.setOption(curOptions, true)
    if (curOptions.series.length && autoPlay) {
      myChart.current.dispatchAction({
        type: 'highlight',
        seriesIndex: currentSeriesIndex.current,
        dataIndex: currentDataIndex.current
      })
      // 显示 tooltip
      myChart.current.dispatchAction({
        type: 'showTip',
        seriesIndex: currentSeriesIndex.current,
        dataIndex: currentDataIndex.current
      })
      echartsPlay(false, currentSeriesIndex.current, currentDataIndex.current <= seriesData[currentSeriesIndex.current].data.length - 1 ? currentDataIndex.current : -1)
    }
  }

  // 销毁echarts
  function destroyEchart() {
    if (myChart.current) {
      if (isAddOn) {
        removeEventFn()
      }
      if (typeof myChart.current.clear === 'function') myChart.current.clear()
      if (typeof myChart.current.dispose === 'function') myChart.current.dispose()
      myChart.current = null
    }
  }

  /**
   * echarts开启动画，可手动调用
   * clear: 是否立即开始动画，并清除上个定时器，开启下个定时器，默认为 false
   * seriesIndex: series 中的第几项数据，默认为 0
   * dataIndex: series[seriesIndex].data 中的第几项，默认为 -1
   */
  function echartsPlay(clear = false, seriesIndex = 0, dataIndex = -1) {
    if (clear) {
      echartsPause()
    }
    isEchartsPlay.current = true
    currentSeriesIndex.current = seriesIndex
    currentDataIndex.current = dataIndex
    if (!myChartEventTime.current) {
      echartsEventPlay(seriesIndex)
    }
  }

  function echartsTimeout(seriesIndex = 0) {
    myChartEventTime.current = setTimeout(() => {
      echartsEventPlay(seriesIndex)
    }, timer.current)
  }

  function echartsEventPlay(seriesIndex = 0) {
    const dataLen = echartsOptions.current.series[seriesIndex].data.length
    if (myChart.current && myChart.current.dispatchAction) {
      // 取消之前高亮的图形
      myChart.current.dispatchAction({
        type: 'downplay',
        seriesIndex,
        dataIndex: currentDataIndex.current
      })
      currentDataIndex.current = (currentDataIndex.current + 1) % dataLen
      // 高亮当前图形
      myChart.current.dispatchAction({
        type: 'highlight',
        seriesIndex,
        dataIndex: currentDataIndex.current
      })
      // 显示 tooltip
      myChart.current.dispatchAction({
        type: 'showTip',
        seriesIndex,
        dataIndex: currentDataIndex.current
      })
    }
    echartsTimeout(seriesIndex)
  }

  // echarts关闭动画，可手动调用
  function echartsPause() {
    if (myChart.current && myChart.current.dispatchAction) {
      // 取消之前高亮的图形
      myChart.current.dispatchAction({
        type: 'downplay',
        seriesIndex: currentSeriesIndex.current,
        dataIndex: currentDataIndex.current
      })
      // 取消显示 tooltip
      myChart.current.dispatchAction({
        type: 'hideTip'
      })
    }
    if (myChartEventTime.current) {
      clearTimeout(myChartEventTime.current)
      myChartEventTime.current = null
    }
  }

  // 重置大小
  const echartsResize = () => {
    if (myChart.current) myChart.current.resize()
  }

  useMount(() => {
    init()
  })
  useUnmount(() => {
    echartsPause()
    destroyEchart()
  })

  useDeepCompareEffect(() => {
    update()
  }, [seriesData])

  useUpdateEffect(() => {
    if (autoPlay) {
      echartsPlay(false, currentSeriesIndex.current, currentDataIndex.current)
    } else {
      echartsPause()
    }
  }, [autoPlay])

  useUpdateEffect(() => {
    timer.current = intervalTime
  }, [intervalTime])

  useUpdateEffect(() => {
    if (isAddOn) {
      addEventFn()
    } else {
      removeEventFn()
    }
  }, [isAddOn])

  const size = useSize(echartsRef)
  useEffect(() => {
    echartsResize()
  }, [size])

  useImperativeHandle(onRef, () => {
    return {
      echartsInstance: () => myChart.current,
      echartsPlay,
      echartsPause
    }
  });

  return (
    <div ref={echartsRef} className={classNames('w-full h-full', className)}></div>
  );
};

export default EchartsModule;
```
