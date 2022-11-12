---
title: 解决VSCode Delete `␍`eslint(prettier)错误
shortTitle: Delete `␍`
date: 2021-06-20
---

事情缘由是`git clone`公司项目，`npm run serve`项目之后，页面中报 `Delete ` ␍ `eslint(prettier/prettier)` 的错误，解决方案如下：

1. `git config --global core.autocrlf false`，然后删除项目，重新`git clone`。
2. vsCode 设置 搜索 `files-eol`，将默认行尾字符设置成 `\n` (`LF`)。

文章参考：

1. [解决VSCode Delete `␍`eslint(prettier/prettier)错误](https://blog.csdn.net/weixin_42752574/article/details/114055598)
2. [git core.autocrlf配置说明](https://blog.csdn.net/xuewuzhijin2012/article/details/50117181)
3. [vscode 解决 换行符冲突 if crif](https://blog.csdn.net/qq_38935512/article/details/115697440)
