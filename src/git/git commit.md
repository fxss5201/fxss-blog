---
title: git commit
category:
  - git
date: 2020-06-03
---

本文转自[你可能已经忽略的 git commit 规范](https://mp.weixin.qq.com/s/8oWsj_ipp73crD_vg58LeQ)

## Angular 团队的 commit 规范

它的 message 格式如下:

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

分别对应 Commit message 的三个部分：`Header`，`Body` 和 `Footer`。

### commit Header

Header 部分只有一行，包括三个字段：`type`（必需）、`scope`（可选）和`subject`（必需）。

1. `type`: 用于说明 commit 的类型。一般有以下几种:

```
feat: 新增feature
fix: 修复bug
docs: 仅仅修改了文档，如readme.md
style: 仅仅是对格式进行修改，如逗号、缩进、空格等。不改变代码逻辑。
refactor: 代码重构，没有新增功能或修复bug
perf: 优化相关，如提升性能、用户体验等。
test: 测试用例，包括单元测试、集成测试。
chore: 改变构建流程、或者增加依赖库、工具等。
revert: 版本回滚
```

2. `scope`: 用于说明 commit 影响的范围，比如: views, component, utils, test...
3. `subject`: commit 目的的简短描述

### commit Body

对本次 commit 修改内容的具体描述, 可以分为多行。如下图:

```
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
# initial commit
```

### commit Footer

一些备注, 通常是 `BREAKING CHANGE`(当前代码与上一个版本不兼容) 或修复的 bug(关闭 Issue) 的链接。

## gitmoji-cli

[git 表情符号](https://gitmoji.carloscuesta.me/)
