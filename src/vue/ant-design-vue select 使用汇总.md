---
title: ant-design-vue select 使用汇总
shortTitle: ant-design-vue select
isOriginal: true
category:
  - Vue
tag:
  - ant-design-vue
date: 2020-08-23
---

最近使用ant-design-vue，在使用[select](https://www.antdv.com/components/select-cn/)的时候遇到一些特殊情况，特此做一下整理汇总。

首先实例中的下拉选中为：

```javascript
const options = [
  {
    name: '北京',
    id: '00001',
    spell: 'beijing',
    simpleSpell: 'bj'
  },
  {
    name: '上海',
    id: '00002',
    spell: 'shanghai',
    simpleSpell: 'sh'
  },
  {
    name: '广东',
    id: '00003',
    spell: 'guangdong',
    simpleSpell: 'gd'
  },
  {
    name: '深圳',
    id: '00004',
    spell: 'shenzhen',
    simpleSpell: 'sz'
  },
  {
    name: '重庆',
    id: '00005',
    spell: 'chongqing',
    simpleSpell: 'cq'
  },
  {
    name: '西安',
    id: '00006',
    spell: 'xian',
    simpleSpell: 'xa'
  }
]
```

## 设置默认值

设置默认值`defaultValue`或者当前选中值为`value`空字符串`''`/`null` 时，`placeholder` 都无法正常展示，需要设置为`undefined` 才可以。对应的代码可查看 <https://github.com/vueBlog/example-ant-design-vue/blob/master/src/views/Select.vue#L53> ，对应的实例可查看 <https://www.fxss.work/example-ant-design-vue/#/select> 。

## 设置筛选

select 在有些情况下需要支持搜索，可以有多种方式进行设置。

下述方式的详细代码可查看 <https://github.com/vueBlog/example-ant-design-vue/blob/master/src/views/Select.vue#L130> ，代码实例可查看 <https://www.fxss.work/example-ant-design-vue/#/select> 。

### 方式一

设置`optionFilterProp`为`children`。

```html
<a-select
  showSearch
  allowClear
  optionFilterProp="children"
  placeholder="请选择选项"
  style="width: 120px; margin-right: 16px">
  <a-select-option v-for="item in options" :key="item.code" :value="item.id">
    {{ item.name }}
  </a-select-option>
</a-select>
```

多选也同样适用：

```html
<a-select
  mode="multiple"
  allowClear
  optionFilterProp="children"
  placeholder="请选择选项"
  style="width: 100%">
  <a-select-option v-for="item in options" :key="item.code" :value="item.id">
    {{ item.name }}
  </a-select-option>
</a-select>
```

### 方式二

将`optionFilterProp`设置为`label`和`a-select-option`的`:label="item.name"`自定义属性

```html
<a-select
  showSearch
  allowClear
  optionFilterProp="label"
  placeholder="请选择选项"
  style="width: 120px; margin-right: 16px">
  <a-select-option v-for="item in options" :key="item.code" :value="item.id" :label="item.name">
    {{ item.name }}
  </a-select-option>
</a-select>
```

多选：

```html
<a-select
  mode="multiple"
  allowClear
  optionFilterProp="label"
  placeholder="请选择选项"
  style="width: 100%">
  <a-select-option v-for="item in options" :key="item.code" :value="item.id" :label="item.name">
    {{ item.name }}
  </a-select-option>
</a-select>
```

### 方式三

使用`filterOption`和`optionLabelProp` ，当`filterOption`为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。`optionLabelProp`为回填到选择框的 `Option` 的属性值。

适用`filterOption`可以实现更多的功能，比如中文搜索、拼音搜索、简拼搜索。

```html
<a-select
  showSearch
  allowClear
  :filterOption="filterOption"
  optionLabelProp="label"
  placeholder="请选择选项"
  style="width: 120px; margin-right: 16px">
  <a-select-option v-for="item in options" :key="item.code" :value="item.id" :label="item.name" :spell="item.spell" :simpleSpell="item.simpleSpell">
    {{ item.name }}
  </a-select-option>
</a-select>
```

```javascript
filterOption (inputValue, option) {
  console.log(inputValue, option)
  // 在option的componentOptions.propsData中只有value和label，也就是说其他自定义属性没有接收，所以只能自己去查找
  let currentOption
  for (let index = 0, len = this.options.length; index < len; index++) {
    const element = this.options[index]
    if (element.id === option.componentOptions.propsData.value) {
      currentOption = element
      break
    }
  }
  return currentOption.name.includes(inputValue) || currentOption.spell.includes(inputValue) || currentOption.simpleSpell.includes(inputValue)
}
```

至于多选情况，`filterOption` 方法和上述一致，就是template有点区别：

```html
<a-select
  mode="multiple"
  allowClear
  :filterOption="filterOption"
  optionLabelProp="label"
  placeholder="请选择选项"
  style="width: 100%">
  <a-select-option v-for="item in options" :key="item.code" :value="item.id" :label="item.name" :spell="item.spell" :simpleSpell="item.simpleSpell">
    {{ item.name }}
  </a-select-option>
</a-select>
```
