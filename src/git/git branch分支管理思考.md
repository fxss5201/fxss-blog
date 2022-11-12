---
title: git branch分支管理思考
isOriginal: true
category:
  - git
tag:
  - git branch
date: 2021-09-07
---

当前开发代码管理大部分使用的都是 git ，使用 git 一大原因主要就是 git 分支足够灵活，但是当多个开发人员维护同一个项目的时候就需要考虑 git 分支的一些管理规范，下面是我个人对 git 分支管理的一些思考和建议。

项目分支一般包括 master(main)  / test / develop / feature ，各分支的功能如下：

| 分支名称 | 分支功能 |
|--|:--|
| master(main) | 一般用于发布线上环境的代码分支 |
| test | 一般用于测试环境的代码分支 |
| develop | 一般用于开发环境或者是冒烟测试环境的代码开支 |
| feature | 一般用于功能开发的代码分支，并且每次新功能开发的 feature 分支都应该是从 master(main) 上新开分支 |

## 个人开发

常用的个人代码分支管理如下（基于每次迭代的功能都是统一上线发布）：

![个人代码分支管理](https://img.fxss.work/article-163102706100067-production.png)

如果每次迭代的功能并不能保证统一上线的话，就需要在一个迭代中创建多个 单一功能模块的 feature 分支，将 单一功能模块的feature 分支合并到 develop 冒烟测试，合并 test 发布测试，合并 master(main) 发布上线。

## 多人开发

### 多人开发，功能统一上线

当多人开发，并且能保证功能统一上线的话，这个时候依然可以用上面的分支管理方式：
![多人开发，功能统一上线](https://img.fxss.work/article-163102708900061-production.png)

这个时候每个 feature 实际上对应每个人的分支，开发完成后统一合并到 develop 分支进行冒烟测试，再又 develop 合并到 test 分支 发布测试，之后合并 master(main) 分支 发布上线。

### 多人开发，功能独立上线

多人开发，功能独立上线常用的代码分支管理如下：

![多人开发，功能独立上线](https://img.fxss.work/article-16310271920006-production.png)

每个 feature 功能分支独立开发，将独立的 feature 分支合并到 develop 分支进行冒烟测试，将独立的 feature 分支合并到 test 分支进行测试，将独立的 feature 分支合并到 master 分支发布上线。

当然为了防止有些人合错代码，直接发布到线上，可以在 master(main) 分支前加一个 release 分支，将独立的 feature 分支合并到 release 分支发布上线，再由专人将 release 分支合并到 master。

![多人开发，功能独立上线](https://img.fxss.work/article-163102712000093-production.png)

### 多人开发，有的功能相互依赖，有的独立发布

在项目中更多的情况是有的功能相互依赖，有的可以独立发布，这个时候常用的分支管理如下：

![多人开发，有的功能相互依赖，有的独立发布](https://img.fxss.work/article-163102724200068-production.png)

这个时候 feature-c 和 feature-d 都开发完了，要合并代码到 feature-b 分支，feature-c 先合并，再合并 feature-d 就有可能有冲突，那这个时候冲突怎么解决呢？

![多人开发，有的功能相互依赖，有的独立发布，解决冲突](https://img.fxss.work/article-163102726500062-production.png)

**总之遵守如下的思想去进行代码管理：**

 1. 保证代码干净，意思是不能把别人的代码合并到你的分支，你的分支代码可以独立上线
 2. 分支是用来解决问题的，不要嫌分支多

以上是我个人针对项目分支管理的看法，有不同意见的欢迎评论。
