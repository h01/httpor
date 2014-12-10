Httpor::The Http Operator
----
#### 简介
HTTP操作者，意于简化与快捷地进行HTTP网络操作，可适用于各种网络爬虫或者数据提交。

#### 安装
```shell
$ // 第一次安装
$ npm install httpor
$ // 如果已经安装 升级即可
$ npm update httpor
```

#### 使用
```js
var httpor = require("httpor");

// get请求
httpor.get('http://ursb.org', function(err, res){
	if (err) {
		console.log('请求出错:' + err);
	}else{
		console.log('请求成功！状态码=' + res.code);
		console.log('返回头信息:' + res.head);
		console.log('返回数据:' + res.data);
	}
});

// post请求
httpor.post('http://ursb.org/api/posts.json', {
	type: 'posts'
}, function(err, res){
	// 如上操作
});

// 自定义请求
httpor.request({
	host: 'ursb.org',
	port: 80,
	path: '/api/json',
	prot: 'http',
	method: 'POST',
	data: {
		type: 'test'
	},
	encode: 'gbk',
	headers: {
		'User-Agent': 'test!',
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}, function(err, res){
	// 如上
})
```