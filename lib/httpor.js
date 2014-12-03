//	@name	HTTPOR::http(s)操作类
//	@author	Holger
//	@modify	2014/12/03
//	@myblog	http://ursb.org
//	@github	https://github.com/h01/httpor

var http  = require('http'),
	iconv = require('iconv-lite'),
	https = require('https'),
	querystring = require('querystring');

exports.get = function(opt){
	opt.method  = 'GET';
	opt.headers = opt.headers || {
		'User-Agent': 'httpor/1.0'
	};
	var _protocol = (opt.port == 443) ? https : http;
	_protocol.request(opt, function(res){
		var _html = '';
		res.setEncoding('binary');
		res.on('data', function(c){
			_html += c;
		}).on('end', function(){
			opt.success({
				data: iconv.decode(new Buffer(_html, 'binary'), opt.encode || 'utf8'), 
				code: res.statusCode, 
				head: res.headers
			});
		})
	}).on('error', function(e){
		if (typeof(opt.error) !== 'undefined') {
			opt.error(e);
		};
	}).end();
}

exports.post = function(opt){
	opt.method  = 'POST';
	opt.headers = opt.headers || {
		'User-Agent': 'httpor/1.0',
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	var _protocol = (opt.port == 443) ? https : http;
	var _request  = _protocol.request(opt, function(res){
		var _html = '';
		res.setEncoding('binary');
		res.on('data', function(c){
			_html += c;
		}).on('end', function(){
			opt.success({
				data: iconv.decode(new Buffer(_html, 'binary'), opt.encode || 'utf8'),
				code: res.statusCode,
				head: res.headers
			});
		})
	}).on('error', function(e){
		if (typeof(opt.error) !== 'undefined') {
			opt.error(e);
		};
	});
	_request.write(querystring.stringify(opt.data));
	_request.end();
}