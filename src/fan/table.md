---
title: 增删改查
isOriginal: true
category:
  - 泛积木-低代码
date: 2023-07-15
---

这里我们以增删改查作为示例，演示下从页面创建到各个功能齐全。创建页面的时候，建议接口先写好，当然也可以一边联调一边写接口，当前对增删改查提供以下测试接口：

## 测试接口

### `/contactsList` 列表接口

可选参数 `name, phone, page, perPage` ，返回数据 `{ data: { rows: [], count: 1 }, status: 0 }` 。

### `/contactsList/add` 新增接口

必填参数 `name, phone, address, cityInfo`, 返回数据 `{ msg: '新增成功', status: 0 }` 。

### `/contactsList/update` 更新接口

必填参数 `id, name, phone, address, newCityInfo`, 返回数据 `{ msg: '更新成功', status: 0 }` 。

### `/contactsList/delete` 删除接口

必填参数 `id`, 返回数据 `{ msg: '删除成功', status: 0 }` 。

## 页面创建

首先进入编辑页面，我们点击 **菜单编辑** 的右侧 <HopeIcon icon="plus" /> 按钮:

![+ 菜单](https://img.fxss.work/react-amis-docs-img/sideMenuRightAdd.png)

菜单配置如下：

![菜单配置](https://img.fxss.work/react-amis-docs-img/addDemoFolder.png)

然后在 演示示例 菜单下新增增删改查页面：

![增加增删改查页面](https://img.fxss.work/react-amis-docs-img/sideAddTablePage.png)

增删改查页面配置如下：

![增删改查页面配置](https://img.fxss.work/react-amis-docs-img/addTablePage.png)

## 编辑页面内容

![编辑页面](https://img.fxss.work/react-amis-docs-img/tableDemo-tableEditorMenu.png)

进入页面之后，在组建内选择 增删改查 ：

![增删改查组件](https://img.fxss.work/react-amis-docs-img/add-crud.png)

先配置接口：

![配置接口](https://img.fxss.work/react-amis-docs-img/tableDemo-apiConfig.png)

![接口链接](https://img.fxss.work/react-amis-docs-img/tableDemo-apiUrl.png)

**注意：如果未在前端项目的 `config.js -> axiosBaseURL` 接口基础链接中配置 `/codeDemo: ...` 增需要以 `http/https` 开头。**

配置好链接之后点击 **格式校验并自动生成列配置** 按钮：

![格式校验并自动生成列配置](https://img.fxss.work/react-amis-docs-img/tableDemo-crudAdd.png)

会自动根据返回的数据生成列配置（一列就是根据一行数据配置生成），此时可以选择 **启用功能 -> 新增、查询、操作栏编辑、操作栏删除** :

1. 新增会以弹窗的方式，根据列生成form表单进行配置；
2. 选择启用 查询 ，可以选择 启用的查询字段 ；
3. 操作栏编辑会默认生成以弹窗的方式编辑内容；
4. 操作栏删除可以增加二次确认。

![启用的查询字段](https://img.fxss.work/react-amis-docs-img/tableDemo-crudAddSearch.png)

更改列配置，点击确认之后就可以生成如下的页面：

![表格](https://img.fxss.work/react-amis-docs-img/tableDemo-crudTable.png)

调整 搜索表单外观，在大纲里选择 表单：

![表单](https://img.fxss.work/react-amis-docs-img/tableDemo-dagang.png)

![修改搜索名称](https://img.fxss.work/react-amis-docs-img/tableDemo-searchFormTitle.png)

![修改搜索样式](https://img.fxss.work/react-amis-docs-img/tableDemo-searchFormLayout.png)

代码如下：

``` json
{
  "title": "查询条件",
  "mode": "inline",
  "body": [
    {
      "type": "input-text",
      "label": "姓名",
      "name": "name",
      "id": "u:6ee0718d2a02",
      "size": "md"
    },
    {
      "type": "input-text",
      "label": "手机号",
      "name": "phone",
      "id": "u:66ae96d9d539",
      "size": "md"
    }
  ],
  "id": "u:9d8669d8f703",
  "actions": [
    {
      "type": "reset",
      "label": "重置",
      "id": "u:049fba79f297"
    },
    {
      "type": "submit",
      "label": "搜索",
      "id": "u:c24e49ef0ae2",
      "level": "primary"
    }
  ]
}
```

### 新增弹窗内容配置

![新增弹窗内容配置](https://img.fxss.work/react-amis-docs-img/tableDemo-addDialogConfig.png)

![弹窗内容自动生成的配置](https://img.fxss.work/react-amis-docs-img/tableDemo-addDialogConfigDefault.png)

我们调整弹窗内容如下：

![弹窗内容](https://img.fxss.work/react-amis-docs-img/tableDemo-addDialogConfigNew1.png)

代码如下：

``` json
{
  "type": "dialog",
  "title": "新增",
  "body": [
    {
      "type": "form",
      "api": {
        "method": "post",
        "url": "/codeDemo/contactsList/add",
        "messages": {
        }
      },
      "body": [
        {
          "type": "input-text",
          "name": "name",
          "label": "名称",
          "id": "u:3be2aaff573c",
          "placeholder": "请输入名称",
          "required": true,
          "clearable": true
        },
        {
          "type": "input-text",
          "name": "phone",
          "label": "手机号",
          "id": "u:7382b1794385",
          "clearable": true,
          "placeholder": "请输入手机号",
          "required": true,
          "validations": {
            "isPhoneNumber": true
          }
        },
        {
          "type": "input-city",
          "name": "cityInfo",
          "label": "选择城市",
          "id": "u:1f3a3a0c0af6",
          "searchable": true,
          "required": true,
          "allowCity": true,
          "extractValue": false
        },
        {
          "type": "input-text",
          "name": "address",
          "label": "地址",
          "id": "u:8e07e9cb1a86",
          "placeholder": "请输入详细地址",
          "clearable": true,
          "required": true
        },
        {
          "type": "textarea",
          "name": "remark",
          "label": "备注",
          "id": "u:190772c3d06a",
          "minRows": 3,
          "maxRows": 20,
          "placeholder": "请输入备注信息"
        }
      ],
      "id": "u:0deafa809457"
    }
  ],
  "id": "u:2e94f9d7e9a8",
  "showCloseButton": true,
  "closeOnEsc": false,
  "showErrorMsg": true,
  "showLoading": true,
  "size": "md"
}
```

**注意：修改完弹窗内容要记得点击确认，否则不会更新代码。**

### 编辑弹窗内容

![编辑弹窗内容](https://img.fxss.work/react-amis-docs-img/tableDemo-addDialogConfigEditor.png)

代码如下：

``` json
{
  "type": "dialog",
  "title": "编辑",
  "body": [
    {
      "type": "form",
      "api": {
        "method": "post",
        "url": "/codeDemo/contactsList/update",
        "messages": {
        },
        "data": {
          "&": "$$",
          "id": "${id}"
        }
      },
      "body": [
        {
          "label": "名称",
          "name": "name",
          "type": "input-text",
          "placeholder": "请输入名称",
          "required": true,
          "clearable": true,
          "id": "u:60913603ba5b"
        },
        {
          "label": "手机号",
          "name": "phone",
          "type": "input-text",
          "clearable": true,
          "placeholder": "请输入手机号",
          "required": true,
          "validations": {
            "isPhoneNumber": true
          },
          "id": "u:98fc0aea34f0"
        },
        {
          "label": "选择城市",
          "name": "newCityInfo",
          "type": "input-city",
          "searchable": true,
          "required": true,
          "allowCity": true,
          "extractValue": false,
          "id": "u:163f5d170601",
          "value": "${cityInfo.districtCode}"
        },
        {
          "label": "地址",
          "name": "address",
          "type": "input-text",
          "placeholder": "请输入详细地址",
          "clearable": true,
          "required": true,
          "id": "u:fff0f416d165"
        },
        {
          "label": "备注",
          "name": "remark",
          "type": "textarea",
          "minRows": 3,
          "maxRows": 20,
          "placeholder": "请输入备注信息",
          "id": "u:14a394b62a09"
        }
      ],
      "id": "u:5c5a1a1bf0c4"
    }
  ],
  "id": "u:92d55f353a9a",
  "showCloseButton": true,
  "closeOnEsc": false,
  "showErrorMsg": true,
  "showLoading": true,
  "size": "md"
}
```

### 删除按钮

``` json
{
  "type": "button",
  "label": "删除",
  "actionType": "ajax",
  "level": "link",
  "className": "text-danger",
  "confirmText": "确定要删除？",
  "api": {
    "method": "post",
    "url": "/codeDemo/contactsList/delete",
    "data": {
      "id": "${id}"
    },
    "messages": {
    }
  },
  "id": "u:a551bb1dc0bd"
}
```

到此一个完整的增删改查就完成了。

## 完整代码

::: details 完整代码如下

``` json
{
  "type": "page",
  "title": "增删改查",
  "body": [
    {
      "type": "service",
      "api": {
        "method": "post",
        "url": "/codeApi/usersAllList",
        "messages": {
        },
        "responseData": {
          "usersList": "$$"
        }
      },
      "id": "u:d553fdf824a0",
      "body": [
        {
          "type": "crud",
          "id": "u:9b82c2a2dae3",
          "syncLocation": false,
          "api": {
            "method": "post",
            "url": "/codeDemo/contactsList",
            "messages": {
            }
          },
          "columns": [
            {
              "label": "ID",
              "type": "text",
              "name": "id",
              "id": "u:4482295c18f2"
            },
            {
              "label": "姓名",
              "type": "text",
              "name": "name",
              "id": "u:a0b3ae5acc59",
              "placeholder": "-",
              "copyable": false
            },
            {
              "label": "手机号",
              "type": "text",
              "name": "phone",
              "id": "u:74dfeafc538d"
            },
            {
              "label": "省份",
              "type": "text",
              "name": "province",
              "id": "u:cad82b2a55ff"
            },
            {
              "label": "省份code",
              "type": "text",
              "name": "provinceCode",
              "id": "u:b4a52c8810f5"
            },
            {
              "label": "城市",
              "type": "text",
              "name": "city",
              "id": "u:f042b81eca79"
            },
            {
              "label": "城市code",
              "type": "text",
              "name": "cityCode",
              "id": "u:e8bd8da0dd68"
            },
            {
              "label": "区域",
              "type": "text",
              "name": "district",
              "id": "u:71e061c2fc41"
            },
            {
              "label": "区域code",
              "type": "text",
              "name": "districtCode",
              "id": "u:1b2e481a10d5"
            },
            {
              "label": "地址",
              "type": "text",
              "name": "address",
              "id": "u:02c6b2d8b8e8"
            },
            {
              "label": "备注",
              "type": "text",
              "name": "remark",
              "id": "u:ae1c17a9f317"
            },
            {
              "label": "创建者",
              "type": "mapping",
              "name": "creatorId",
              "id": "u:ff5b03e95527",
              "source": "${usersList.items}"
            },
            {
              "label": "创建时间",
              "type": "text",
              "name": "createTime",
              "id": "u:b09036c3085a"
            },
            {
              "type": "mapping",
              "label": "更新者",
              "id": "u:ff5b03e95527",
              "name": "updaterId",
              "source": "${usersList.items}"
            },
            {
              "label": "更新时间",
              "type": "text",
              "name": "updateTime",
              "id": "u:b09036c3085a"
            },
            {
              "type": "operation",
              "label": "操作",
              "buttons": [
                {
                  "label": "编辑",
                  "type": "button",
                  "actionType": "dialog",
                  "level": "link",
                  "dialog": {
                    "type": "dialog",
                    "title": "编辑",
                    "body": [
                      {
                        "type": "form",
                        "api": {
                          "method": "post",
                          "url": "/codeDemo/contactsList/update",
                          "messages": {
                          },
                          "data": {
                            "&": "$$",
                            "id": "${id}"
                          }
                        },
                        "body": [
                          {
                            "label": "名称",
                            "name": "name",
                            "type": "input-text",
                            "placeholder": "请输入名称",
                            "required": true,
                            "clearable": true,
                            "id": "u:60913603ba5b"
                          },
                          {
                            "label": "手机号",
                            "name": "phone",
                            "type": "input-text",
                            "clearable": true,
                            "placeholder": "请输入手机号",
                            "required": true,
                            "validations": {
                              "isPhoneNumber": true
                            },
                            "id": "u:98fc0aea34f0"
                          },
                          {
                            "label": "选择城市",
                            "name": "newCityInfo",
                            "type": "input-city",
                            "searchable": true,
                            "required": true,
                            "allowCity": true,
                            "extractValue": false,
                            "id": "u:163f5d170601",
                            "value": "${cityInfo.districtCode}"
                          },
                          {
                            "label": "地址",
                            "name": "address",
                            "type": "input-text",
                            "placeholder": "请输入详细地址",
                            "clearable": true,
                            "required": true,
                            "id": "u:fff0f416d165"
                          },
                          {
                            "label": "备注",
                            "name": "remark",
                            "type": "textarea",
                            "minRows": 3,
                            "maxRows": 20,
                            "placeholder": "请输入备注信息",
                            "id": "u:14a394b62a09"
                          }
                        ],
                        "id": "u:5c5a1a1bf0c4"
                      }
                    ],
                    "id": "u:92d55f353a9a",
                    "showCloseButton": true,
                    "closeOnEsc": false,
                    "showErrorMsg": true,
                    "showLoading": true,
                    "size": "md"
                  },
                  "id": "u:a8bdcd1bd446"
                },
                {
                  "type": "button",
                  "label": "删除",
                  "actionType": "ajax",
                  "level": "link",
                  "className": "text-danger",
                  "confirmText": "确定要删除？",
                  "api": {
                    "method": "post",
                    "url": "/codeDemo/contactsList/delete",
                    "data": {
                      "id": "${id}"
                    },
                    "messages": {
                    }
                  },
                  "id": "u:a551bb1dc0bd"
                }
              ],
              "id": "u:14f45b2881bb"
            }
          ],
          "bulkActions": [
          ],
          "itemActions": [
          ],
          "filterSettingSource": [
            "id",
            "name",
            "phone",
            "province",
            "provinceCode",
            "city",
            "cityCode",
            "district",
            "districtCode",
            "addres",
            "remark",
            "creatorId",
            "createTime"
          ],
          "features": [
            "create",
            "filter",
            "update",
            "delete"
          ],
          "filterColumnCount": 3,
          "filterEnabledList": [
            {
              "label": "name",
              "value": "name"
            },
            {
              "label": "phone",
              "value": "phone"
            }
          ],
          "headerToolbar": [
            {
              "label": "新增",
              "type": "button",
              "actionType": "dialog",
              "level": "primary",
              "dialog": {
                "type": "dialog",
                "title": "新增",
                "body": [
                  {
                    "type": "form",
                    "api": {
                      "method": "post",
                      "url": "/codeDemo/contactsList/add",
                      "messages": {
                      }
                    },
                    "body": [
                      {
                        "type": "input-text",
                        "name": "name",
                        "label": "名称",
                        "id": "u:3be2aaff573c",
                        "placeholder": "请输入名称",
                        "required": true,
                        "clearable": true
                      },
                      {
                        "type": "input-text",
                        "name": "phone",
                        "label": "手机号",
                        "id": "u:7382b1794385",
                        "clearable": true,
                        "placeholder": "请输入手机号",
                        "required": true,
                        "validations": {
                          "isPhoneNumber": true
                        }
                      },
                      {
                        "type": "input-city",
                        "name": "cityInfo",
                        "label": "选择城市",
                        "id": "u:1f3a3a0c0af6",
                        "searchable": true,
                        "required": true,
                        "allowCity": true,
                        "extractValue": false
                      },
                      {
                        "type": "input-text",
                        "name": "address",
                        "label": "地址",
                        "id": "u:8e07e9cb1a86",
                        "placeholder": "请输入详细地址",
                        "clearable": true,
                        "required": true
                      },
                      {
                        "type": "textarea",
                        "name": "remark",
                        "label": "备注",
                        "id": "u:190772c3d06a",
                        "minRows": 3,
                        "maxRows": 20,
                        "placeholder": "请输入备注信息"
                      }
                    ],
                    "id": "u:0deafa809457"
                  }
                ],
                "id": "u:2e94f9d7e9a8",
                "showCloseButton": true,
                "closeOnEsc": false,
                "showErrorMsg": true,
                "showLoading": true,
                "size": "md"
              },
              "id": "u:157a6011cfe6"
            },
            "bulkActions"
          ],
          "filter": {
            "title": "查询条件",
            "mode": "inline",
            "body": [
              {
                "type": "input-text",
                "label": "姓名",
                "name": "name",
                "id": "u:6ee0718d2a02",
                "size": "md",
                "clearable": true
              },
              {
                "type": "input-text",
                "label": "手机号",
                "name": "phone",
                "id": "u:66ae96d9d539",
                "size": "md",
                "clearable": true
              }
            ],
            "id": "u:9d8669d8f703",
            "actions": [
              {
                "type": "reset",
                "label": "重置",
                "id": "u:049fba79f297"
              },
              {
                "type": "submit",
                "label": "搜索",
                "id": "u:c24e49ef0ae2",
                "level": "primary"
              }
            ]
          }
        }
      ]
    }
  ],
  "id": "u:b3abad984d9e",
  "asideResizor": false,
  "style": {
    "boxShadow": " 0px 0px 0px 0px transparent"
  },
  "pullRefresh": {
    "disabled": true
  }
}
```

:::
