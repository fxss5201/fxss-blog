---
title: vue watch表单修改提醒
isOriginal: true
category:
  - Vue
date: 2020-02-06
---

在大表单如果内容有修改，在返回其他页面的时候可以提醒 “是否需要保存您所做的更改？” ，在vue中，一个一个字段监听改变太麻烦，那么有没有简单一点的方案呢？答案是有的：我们可以使用 [watch](https://cn.vuejs.org/v2/api/#vm-watch) 。

`watch` 中有个 `deep` 选项，为了发现对象内部值的变化，可以在选项参数中指定 `deep: true` 。

例如：

```javascript

export default {
  data() {
    return {
      formChange: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  watch: {
    'form': {
      handler () {
        // form 对象内部的值变化时，设置 formChange
        this.formChange = true
      },
      deep: true
    }
  },
  methods: {
    pageBack () {
      // 页面跳转前检查 formChange
      if (this.formChange) {
        this.$confirm('是否需要保存您所做的更改？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pageSave()
        }).catch(() => {
          this.$router.go(-1)
        })
      } else {
        this.$router.go(-1)
      }
    },
    pageSave () {
      // 保存表单内容
      ...
      // 表单内容保存之后，重新设置 formChange 
      this.formChange = false
    }
  }
}
```
