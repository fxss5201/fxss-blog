---
title: GitHub配置SSH Key
isOriginal: true
category:
  - git
date: 2020-04-01
---

首先下载 [git](https://git-scm.com/downloads) ，安装之后打开 Git Bash ，尽量以管理员身份运行。

## 全局设置git的user.name和user.email

```sh
git config --global user.name "user.name（你的name）"
git config --global user.email  "user.email（你的邮箱）"

// 可查看当前Git的环境配置
git config --list
```

## SSH key

如果第一次使用则直接调到第2步。

1. 查看是否存在 id_rsa 和 id_rsa.pub文件，如果存在，说明已经有 SSH key。

   ```sh
   cd ~/.ssh
   ls
   ```

1. 设置 SSH key

   ```sh
   ssh-keygen -t rsa -C "user.email（你的邮箱）"
   ```

   在这里会让输入 pass... ，不要输入，直接 Enter ，不然以后每次都必须输入。
   使用第1步查看生成的 SSH key。

1. 获取 SSH key

   ```sh
   cat id_rsa.pub
   ```

## Github 设置 SSH key

登录 Github ，点击右上角个人头像 => 下拉框 Settings => SSH and GPG keys => New SSH key，将上文中获取到的 SSH key 填入到 Key ，在填入 Title ，点击 Add SSH key 。

## 验证 SSH key

```sh
ssh -T git@github.com
```
