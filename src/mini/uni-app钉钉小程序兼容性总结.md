---
title: uni-app钉钉小程序兼容性总结
isOriginal: true
category:
  - 小程序
tag:
  - uni-app
date: 2021-01-14
---

## uni-app钉钉小程序兼容性总结

本总结基于最开始使用 uni-app 开发的微信小程序，后续又需要开发钉钉小程序。

首先钉钉小程序需要自定义条件编译平台，在 `package.json` 文件中增加 `uni-app` 扩展节点，如下：

```js
{
  ...
  "uni-app": {
    "scripts": {
      "mp-dingtalk": { 
        "title":"钉钉小程序", 
        "env": { 
          "UNI_PLATFORM": "mp-alipay" 
        },
        "define": { 
          "MP-DINGTALK": true 
        }
      }
    }
  }
  ...
}
```

添加扩展节点之后，在 Hbuilder X 的操作栏运行和发行下可以找到 钉钉小程序 。

## showModal

钉钉小程序 不支持设置按钮颜色，且必须设置 `confirmText` 和 `cancelText` ，否则按钮文字为英文，而且必须设置 `title` 。

[`uni.showModal`](https://uniapp.dcloud.io/api/ui/prompt?id=showmodal)

```js
uni.showModal({
  title: '提示',
  content: '获取设置失败，将重启小程序',
  showCancel: false,
  // #ifndef MP-DINGTALK
  confirmColor: theme.showModalConfirmColor,
  // #endif
  confirmText: '确定',
  cancelText: '取消',
  success: function (res) {}
})
```

## 组件样式

组件上不要使用 `class` 增加样式，在组件外包一层设置样式。

```html
<view class="custom-components-box">
  <custom-components></custom-components>
</view>
```

## 下拉刷新

为防止某些页面莫名其妙可以下拉刷新，在 `pages.json` 的 `globalStyle` 设置 `"enablePullDownRefresh": false` ，在对需要下来刷新的页面单独设置 `"enablePullDownRefresh": true` 。

## 页面背景色

微信小程序页面背景色默认为白色，钉钉小程序默认为灰色。

## 图片上传

钉钉小程序上传图片必须传 `fileType` 参数。

[`uni.uploadFile(OBJECT)`](https://uniapp.dcloud.io/api/request/network-file)

```js
this.$upload({
  url: '',
  filePath: '',
  name: '',
  // #ifdef MP-DINGTALK
  fileType: "image",
  // #endif
  formData: {
    ...
  }
})
```

## chooseImage

[`uni.chooseImage(OBJECT)`](https://uniapp.dcloud.io/api/media/image?id=chooseimage)

`chooseImage` 返回的数据不一致，需要做兼容性处理

```js
uni.chooseImage({
  count:1,
  sourceType: res.tapIndex === 0 ? ['camera']: ['album'],
  success: (res2) => {
    console.log(res)
    // #ifndef MP-DINGTALK
    const file = res.tempFiles[0]
    // #endif
    // #ifdef MP-DINGTALK
    const file = res.filePaths[0]
    // #endif
  }
})
```

## 文件查看

关于文件查看，在钉钉里需要使用钉盘进行查看。

转存文件到钉盘：[`dd.saveFileToDingTalk`](https://ding-doc.dingtalk.com/document/app/transfer-files-to-a-nail-drive)

钉盘文件预览：[`dd.previewFileInDingTalk`](https://ding-doc.dingtalk.com/document/app/nail-plate-file-preview)

```js
// 钉钉采用钉盘处理文件
dd.saveFileToDingTalk({
  url: fileUrl,  // 文件在第三方服务器地址
  name: fileName,
  success: (res) => {
    console.log(res)
    if (res.data.length) {
      dd.confirm({
        title: '提示',
        content: '文件已保存到钉盘中，是否需要现在查看？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            dd.previewFileInDingTalk({
              spaceId: res.data[0].spaceId,
              fileId: res.data[0].fileId,
              fileName: fileName,
              fileType: fileType,
            })
          }
        },
      });
    }
  },
  fail: (err) =>{
    console.log(err)
    dd.alert({
      content:JSON.stringify(err)
    })
  }
})
```

## 时间选择器

钉钉小程序的 `picker` 尽量不要用做时间选择，要用 [`dd.datePicker`](https://ding-doc.dingtalk.com/document/app/dd-datepicker#topic-2024826) 实现。

## 拨打电话

```js
// #ifndef MP-DINGTALK
uni.makePhoneCall({
  phoneNumber: self.serviceMobile
})
// #endif
// #ifdef MP-DINGTALK
dd.showCallMenu({
  phoneNumber: self.serviceMobile, // 期望拨打的电话号码
  code: '+86', // 国家代号，中国是+86
  showDingCall: false, // 是否显示钉钉电话
});
// #endif
```

## showToast

[`uni.showToast(OBJECT)`](https://uniapp.dcloud.io/api/ui/prompt)
[`dd.showToast`](https://ding-doc.dingtalk.com/document/app/dd-showtoast#topic-2024807)

`showToast` 在模拟器中有时候显示不了，需要真机测试。

## picker

`picker` 选择器内最好包裹一层 `view` 。

## picker 单选

`picker` 单选需要使用 `value` 指定选择了 range 中的第几个（下标从 0 开始）。

## cover-view 不支持

钉钉小程序不支持 `cover-view` ，需要用 `view` 去做替代。

```html
<!-- #ifndef MP-DINGTALK -->
<cover-view class="page-footer">
  <button type="default">提交</button>
</cover-view>
<!-- #endif -->
<!-- #ifdef MP-DINGTALK -->
<view class="page-footer page-footer-ding">
  <button type="default">提交</button>
</view>
<!-- #endif -->
```

```less
.page-footer {
  width: 100%;
  position: fixed;
  bottom: 0rpx;
  z-index: 10;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  &.page-footer-ding {
    ...
  }
}
```
