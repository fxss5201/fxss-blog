---
title: git tag
isOriginal: true
category:
  - git
date: 2020-07-17
---

## 查看tag列表

```git
git tag
```

## 新建tag

```git
git tag v1.0
```

## 将tag同步到远程库

```git
git push origin v1.0
```

## 删除tag

```git
git tag -d v1.0
```

## 删除远程库tag

```git
git push origin :refs/tags/v1.0
```
