---
title: Docker 部署 Sentry
isOriginal: true
category:
  - Sentry
date: 2020-07-05
---

## 部署 Sentry 要求

1. Docker 17.05.0+
2. Compose 1.23.0+
3. 至少需要2400MB RAM

## Docker 及 Sentry 依赖安装

如果 Docker 版本太低，需要卸载旧版本。

### 卸载Docker旧版本

较旧的Docker版本称为`docker`或`docker-engine`。如果已安装这些程序，请卸载它们以及相关的依赖项。

```
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

如果`yum`报告未安装这些软件包，则可以。Docker Engine软件包现在称为`docker-ce`。

### 安装Docker

```
sudo yum install -y yum-utils

sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

yum-config-manager --enable docker-ce-edge

yum -y install docker-ce

systemctl start docker

docker --version
```

### 安装 Sentry 其他依赖包

```
yum install -y device-mapper-persistent-data lvm2

yum install epel-release

yum install -y python-pip

pip install docker-compose

yum install git
```

### 克隆 [Sentry](https://github.com/getsentry/onpremise) 及安装

``` git
git clone https://github.com/getsentry/onpremise.git
```

进入目录 `cd onpremise/` ，执行安装 `./install.sh` 。

不过安装的时候超级慢，所以改成阿里云的镜像执行

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://hkoa9dfz.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

然后重新执行 `./install.sh` 。

### 创建初始帐号

安装成功之后会询问是否立即创建用户，`y` 输入初始账号及密码。如果一不小心写了 `n` ，则重新执行 `docker-compose run --rm web upgrade` 可以创建用户。

## 运行 Sentry

```
docker-compose up -d
```

然后在浏览器中进行访问 `http://{ip}:9000` ，IP 改成自己服务器的 ip 地址。默认是 9000 端口。
