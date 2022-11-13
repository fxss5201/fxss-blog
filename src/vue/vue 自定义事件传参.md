---
title: vue 自定义事件传参
isOriginal: true
category:
  - Vue
date: 2020-02-28
---

先来简单看个例子：

TodoList.vue :

```html
<template>
  <ul>
    <li>
      <todo-item
        v-for="item in list" :key="item.id"
        :status="doneList.includes(item.id)"
        :info="item"
        @click="changeStatus0"
      ></todo-item>
    </li>
    <li>
      <todo-item
        v-for="item in list" :key="item.id"
        :status="doneList.includes(item.id)"
        :info="item"
        @click="changeStatus1()"
      ></todo-item>
    </li>
    <li>
      <todo-item
        v-for="item in list" :key="item.id"
        :status="doneList.includes(item.id)"
        :info="item"
        @click="changeStatus2(item)"
      ></todo-item>
    </li>
    <li>
      <todo-item
        v-for="item in list" :key="item.id"
        :status="doneList.includes(item.id)"
        :info="item"
        @click="changeStatus3(arguments, item)"
      ></todo-item>
    </li>
  </ul>
</template>

<script>
import TodoItem from './TodoItem'
export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  data () {
    return {
      list: [
        {
          id: 0,
          name: 'zero',
          desc: 'zerozerozero'
        },
        {
          id: 1,
          name: 'one',
          desc: 'oneoneone'
        },
        {
          id: 2,
          name: 'two',
          desc: 'twotwotwo'
        }
      ],
      doneList: [1]
    }
  },
  methods: {
    changeStatus0 (val, obj) {
      console.log(val)
      console.log(obj)
    },
    changeStatus1 (val) {
      console.log(val)
    },
    changeStatus2 (obj) {
      console.log(obj)
    },
    changeStatus3 (arr, obj) {
      console.log(arr)
      const val = arr[0]
      if (val) {
        const index = this.doneList.indexOf(obj.id)
        this.doneList.splice(index, 1)
      } else {
        this.doneList.push(obj.id)
      }
    }
  }
}
</script>

```

TodoItem.vue :

```html
<template>
  <label @click="changeStatus">
    <span>{{ info.name }}: {{ status }}</span>
  </label>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    changeStatus () {
      this.$emit('click', this.status, this.info)
    }
  }
}
</script>
```

1. `changeStatus0` 打印的是TodoItem.vue中 `$emit` 后跟的两个参数。
2. `changeStatus1` 打印的是 `undefined`。
3. `changeStatus2` 打印的是 `v-for` 循环中的当前 `item` 对象。
4. `changeStatus3` 中 `arr` 参数对应 `$emit` 后跟的两个参数，`item` 参数对应 `v-for` 循环中的当前 `item` 对象，注意 template 中的写法 `@click="changeStatus3(arguments, item)"`，按照 `changeStatus3` 的方式可以实现多种方式的混合传参。
