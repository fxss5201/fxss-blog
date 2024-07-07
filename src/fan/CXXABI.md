---
title: CXXABI_1.3.8 not found
isOriginal: true
category:
  - 泛积木-低代码
date: 2023-07-15
---

当在 CentOS 7 安装 [sqlite3](https://github.com/TryGhost/node-sqlite3) 时会遇到 `/lib64/libstdc++.so.6: version CXXABI_1.3.8 not found` 报错的问题，下面罗列出我的解决流程：

## 查看 libstdc++.so.6 包含的 CXXABI 版本

``` bash
# 查看本地 CXXABI 所有可用版本
strings /usr/lib64/libstdc++.so.6 | grep CXXABI

# 输出如下，未发现 1.3.8 版本
CXXABI_1.3
CXXABI_1.3.1
CXXABI_1.3.2
CXXABI_1.3.3
CXXABI_1.3.4
CXXABI_1.3.5
CXXABI_1.3.6
CXXABI_1.3.7
CXXABI_TM_1

# 找寻本机其他新版本库
find / -name libstdc++.so.* 

# 输出如下
/usr/share/gdb/auto-load/usr/lib64/libstdc++.so.6.0.19-gdb.pyc
/usr/share/gdb/auto-load/usr/lib64/libstdc++.so.6.0.19-gdb.py
/usr/share/gdb/auto-load/usr/lib64/libstdc++.so.6.0.19-gdb.pyo
/usr/share/gdb/auto-load/usr/lib/libstdc++.so.6.0.19-gdb.pyc
/usr/share/gdb/auto-load/usr/lib/libstdc++.so.6.0.19-gdb.py
/usr/share/gdb/auto-load/usr/lib/libstdc++.so.6.0.19-gdb.pyo
/usr/lib/libstdc++.so.6.0.19
/usr/lib/libstdc++.so.6

# 如果发现有 libstdc++.so.6 高版本，把这个库软连接到 /usr/lib64/ 即可
cd /usr/lib64
mv libstdc++.so.6 libstdc++.so.6.bake   # 备份老库
ln -s /usr/local/gcc-9.3.0/lib64/libstdc++.so.6 ./


# 查看本地 CXXABI 所有可用版本
strings /usr/lib64/libstdc++.so.6 | grep CXXABI
```

如果为发现 libstdc++.so.6 高版本，则接着往下。

## CentOS7 编译升级GCC至9.3.0

### 下载GCC9.3.0源码并解压

由于官网下载速度慢，使用清华大学的镜像站进行下载，代码如下:

``` bash
wget -c /opt/tmp/ https://mirrors.tuna.tsinghua.edu.cn/gnu/gcc/gcc-9.3.0/gcc-9.3.0.tar.gz

# 考虑到安装失败的可能性，创建一个临时文件夹来安装GCC
sudo mkdir /opt/tmp
cd /opt/tmp

# 解压安装包到临时文件夹里
sudo tar -zxvf /home/paul/Downloads/gcc-9.3.0.tar.gz 
```

### 下载依赖文件

``` bash
cd gcc-9.3.0/

# 下载gmp mpfr mpc等供编译需求的依赖项
./contrib/download_prerequisites    
```

执行命令会出现如下的错误，可能原因是从清华大学镜像下的安装包有过改动，不能通过sha512验证

> gmp-6.1.0.tar.bz2: FAILED
>
> sha512sum: WARNING: 1 computed checksum did NOT match
>
> error: Cannot verify integrity of possibly corrupted file gmp-6.1.0.tar.bz2

查看download_prerequisites源码后, 在gcc-9.3.0目录下输入以下命令:

``` bash
# 删除上一命令安装失败产生的gmp压缩包和目录
rm gmp-6.1.0.tar.bz2 
rm gmp-6.1.0

# 加--noverify选项禁止边下边验证
./contrib/download_prerequisites --no-verify
```

### 创建预编译目录

``` bash
mkdir  build  &&  cd build
```

### 设置编译选项并编译

``` bash
../configure --prefix=/usr/local/gcc-9.3.0 --enable-bootstrap --enable-checking=release --enable-languages=c,c++ --disable-multilib

# –-enable-languages表示你要让你的gcc支持哪些编程语言;
# -–disable-multilib表示编译器不编译成其他平台的可执行代码;
# -–disable-checking表示生成的编译器在编译过程中不做额外检查;
# –-enable-checking=xxx 表示编译过程中增加XXX检查;
# –prefix=/usr/local/gcc-9.3.0 指定安装路径;
# –enable-bootstrap 表示用第一次编译生成的程序进行第二次编译，然后用再次生成的程序进行第三次编译，并且检查比较第二次和第三次结果的正确性，也就是进行冗余的编译检查工作。 非交叉编译环境下，默认已经将该值设为 enable，可以不用显示指定；交叉编译环境下，需要显示将其值设为 disable。
```

这个过程会比较长久，我的编译了 3个 多小时。

### 安装

``` bash
# 编译生成makefile文件
make

# 安装GCC
sudo make install
```

### 安装后的设置

``` bash
# 设置环境变量
touch /etc/profile.d/gcc.sh
sudo chmod 777 /etc/profile.d/gcc.sh 
sudo echo -e '\nexport PATH=/usr/local/gcc-9.3.0/bin:$PATH\n' >> /etc/profile.d/gcc.sh && source /etc/profile.d/gcc.sh

# 设置头文件
sudo ln -sv /usr/local/gcc/include/ /usr/include/gcc

# 设置库文件
touch /etc/ld.so.conf.d/gcc.conf
sudo chmod 777 /etc/ld.so.conf.d/gcc.conf 
sudo echo -e "/usr/local/gcc/lib64" >> /etc/ld.so.conf.d/gcc.conf

# 加载动态连接库
sudo ldconfig -v
ldconfig -p |grep gcc
```

### 测试版本号

``` bash
# 测试
gcc -v
```

敲入命令后，终端显示如下文字，说明已成功安装 GCC9.3.0 。

> Using built-in specs.
>
> COLLECT_GCC=gcc
>
> COLLECT_LTO_WRAPPER=/usr/local/gcc-9.3.0/libexec/gcc/x86_64-pc-linux-gnu/9.3.0/lto-wrapper
>
> Target: x86_64-pc-linux-gnu
>
> Configured with: ../configure --prefix=/usr/local/gcc-9.3.0 --enable-bootstrap --enable-checking=release --enable-languages=c,c++ --disable-multilib
>
> Thread model: posix
>
> gcc version 9.3.0 (GCC)


接下来按照 查看 libstdc++.so.6 包含的 CXXABI 版本 执行：

``` bash
# 查看本地 CXXABI 所有可用版本
strings /usr/lib64/libstdc++.so.6 | grep CXXABI

# 输出如下，未发现 1.3.8 版本
CXXABI_1.3
CXXABI_1.3.1
CXXABI_1.3.2
CXXABI_1.3.3
CXXABI_1.3.4
CXXABI_1.3.5
CXXABI_1.3.6
CXXABI_1.3.7
CXXABI_TM_1

# 找寻本机其他新版本库
find / -name libstdc++.so.* 

# 输出如下
/usr/share/gdb/auto-load/usr/lib64/libstdc++.so.6.0.19-gdb.pyc
/usr/share/gdb/auto-load/usr/lib64/libstdc++.so.6.0.19-gdb.py
/usr/share/gdb/auto-load/usr/lib64/libstdc++.so.6.0.19-gdb.pyo
/usr/share/gdb/auto-load/usr/lib/libstdc++.so.6.0.19-gdb.pyc
/usr/share/gdb/auto-load/usr/lib/libstdc++.so.6.0.19-gdb.py
/usr/share/gdb/auto-load/usr/lib/libstdc++.so.6.0.19-gdb.pyo
/usr/lib/libstdc++.so.6.0.19
/usr/lib/libstdc++.so.6

# 如果发现有 libstdc++.so.6 高版本，把这个库软连接到 /usr/lib64/ 即可
cd /usr/lib64
mv libstdc++.so.6 libstdc++.so.6.bake   # 备份老库
ln -s /usr/local/gcc-9.3.0/lib64/libstdc++.so.6 ./

# 查看本地 CXXABI 所有可用版本
strings /usr/lib64/libstdc++.so.6 | grep CXXABI
```

参考：

1. [/lib64/libstdc++.so.6: version `CXXABI_1.3.8‘ not found 解决指南](https://zhuanlan.zhihu.com/p/559881339)
2. [CentOS7 编译升级GCC至9.3.0](https://blog.csdn.net/pauljjf/article/details/105171154)
