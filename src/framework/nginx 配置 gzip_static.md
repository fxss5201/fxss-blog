---
title: nginx 配置 gzip_static
isOriginal: true
category:
  - nginx
date: 2020-06-03
---

关于 nginx 的 gzip ，可以分为两种：

1. nginx 动态压缩，对每个请求先压缩再输出。
2. nginx 静态压缩，使用现成的扩展名为 .gz 的预压缩文件。

## nginx 动态压缩

开启 nginx 动态压缩只需要在 nginx.conf 文件中做如下修改即可：

```nginx
# 开启和关闭gzip模式
gzip on;
# gizp压缩起点，文件大于1k才进行压缩
gzip_min_length 1k;
# 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区 
gzip_buffers 4 16k;
# 设置gzip压缩针对的HTTP协议版本
gzip_http_version 1.0;
# gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
gzip_comp_level 2;
# 进行压缩的文件类型
gzip_types text/plain application/javascript text/css application/xml;
# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;
```

## nginx 静态压缩

nginx 静态压缩需要使用 [ngx_http_gzip_static_module](http://nginx.org/en/docs/http/ngx_http_gzip_static_module.html#gzip_static) 模块，先简单看一下介绍：

ngx_http_gzip_static_module 模块允许发送扩展名为 .gz 的预压缩文件，而不是常规文件。

默认情况下未构建此模块，应使用 `--with-http_gzip_static_module` 配置参数启用它 。

在安装包目录编译安装：

```nginx
./configure --with-http_gzip_static_module
```

例如 [Nginx 安装配置](https://www.runoob.com/linux/nginx-install-setup.html) 安装 Nginx 第4步编译安装，在第一步`./configure --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.35` 之后加上 `--with-http_gzip_static_module`。

然后修改 nginx.conf 配置文件：

```nginx
gzip_static  on;
gzip_proxied expired no-cache no-store private auth;
```

nginx 动态压缩 和 静态压缩结合使用会更好：

```nginx
gzip_static  on;
gzip_proxied expired no-cache no-store private auth;
gzip on; 
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_http_version 1.0;
gzip_comp_level 2;
gzip_types text/plain application/javascript text/css application/xml;
gzip_vary on;
```

首先尝试使用静态压缩，如果有则返回 .gz 的预压缩文件，否则尝试动态压缩。
