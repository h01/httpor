Httpor
----
#### 简介
> 一个对http(s)请求的简单封装类   
> 目前`0.0.2`版本只支持`get`和`post`操作。

#### 安装
    $ npm install httpor

#### 使用
```js
var httpor = require("httpor");
httpor.get({
	host: 'ursb.org',
	port: 80,
	path: '/',
	success: function(res){
		console.log('获取成功');
		console.log('状态码:' + res.code);
		console.log('返回头信息:\n' + res.head);
		console.log('返回数据:\n' + res.data);
	},
	error: function(e){
		console.log('获取错误:' + e);
	}
});

httpor.post({
	host: 'ursb.org',
	port: 443,
	path: '/test.login',
	data: {
		user: 'test',
		pass: 'test'
	},
	success: function(res){
		console.log('请求成功，数据:\n' + res.data);
	}
});
```

#### 说明
##### `get`请求需要如下几个必要参数：    
*  host    请求的HOST地址    
*  port    目标端口    
*  path    请求的路径    
*  success    请求成功回调函数，返回一个包含数据(data)，状态码(code)，头信息(head)的对象    

##### 其他可选参数：    
*  headers 请求头信息    
*  encode  页面编码，默认utf8    
*  error   请求错误回调函数    

##### `post`请求需要的参数和`get`一样，还需要如下必选参数：
*  data     要提交的数据，为对象类型

    注意：`post`中的`headers`参数如果要定义，请务必加上`Content-Type`参数