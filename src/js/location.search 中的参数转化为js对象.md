---
title: location.search 中的参数转化为js对象
shortTitle: location.search参数对象
isOriginal: true
category:
  - javascript
date: 2020-06-18
---

## `substring`方法

```js
function getSearchArgs(){
    var args = {};
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for(var i = 0;i < pairs.length; i++){
        var pos = pairs[i].indexOf("=");
        if(pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }
    return args;
}
/*
 * 使用方法
 * var searchArgs = getSearchArgs();
 */
```

## `URLSearchParams`方法

```js
function getSearchArgs(){
    var args = {};
    var params = new URLSearchParams(location.search);
    for (var [key, value] of params) {
        args[key] = value
    }
    return args;
}
/*
 * 使用方法
 * var searchArgs = getSearchArgs();
 */
```

## `qs`库方法

此方法借助第三方库[https://github.com/ljharb/qs](https://github.com/ljharb/qs)

```js
var searchArgs = qs.parse(location.search, { ignoreQueryPrefix: true })

// 例如：
var prefixed = qs.parse('?a=b&c=d', { ignoreQueryPrefix: true });
assert.deepEqual(prefixed, { a: 'b', c: 'd' })
```
