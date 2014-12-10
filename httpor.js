//	@name	HTTPOR::The HTTP Operator 
//	@author	Holger
//	@modify	2014/12/11
//	@myblog	http://ursb.org
//	@github	https://github.com/h01/httpor

var http  = require('http');
var https = require('https');
var iconv = require('iconv-lite');
var querystring = require('querystring');


module.exports = {
	// Url to Options: 'http://ursb.org/'->{host: 'ursb.org', port: 80, path: '/', prot: 'http'}
	// @param {String} url
	url2opt: function (url) {
		var _temp = url.match(/(\w+):\/\/([\w\.\-]+)[:]?([\d]*)([\s\S]*)/i);
		return {
			host: _temp[2],
			port: parseInt(_temp[3]),
			path: _temp[4] || '/',
			prot: _temp[1]
		}
	},
	// Send request
	// @param {Object} options
	// @param {Function} callback
	request: function (opt, callback) {
		var _protocol = opt.prot === 'https' ? https : http;
		if (!opt.port) {
			opt.port = opt.prot === 'https' ? 443 : 80;
		};
		var _req = _protocol.request(opt, function(res){
			var _htm = '';
			res.setEncoding('binary');
			res.on('data', function(c){
				_htm += c;
			}).on('end', function(){
				callback(null, {
					data: iconv.decode(new Buffer(_htm, 'binary'), opt.encode || 'utf8'),
					code: res.statusCode,
					head: res.headers
				});
			})
		}).on('error', function(e){
			callback(e, null);
		});
		if (opt.method == 'POST') {
			_req.write(opt.data);
		};
		_req.end();
	},
	// Get Url 
	// @param {String} url
	// @param {Function} callback(err, res)
	get: function(url, callback){
		var opt = this.url2opt(url);
		opt.method = 'GET';
		opt.headers = {
			'User-Agent': 'httpor.get/0.0.4'
		};
		this.request(opt, callback);
	},
	// Post Data 2 Url
	// @param {String} url
	// @param {Object} data
	// @param {Function} callback(err, res)
	post: function(url, data, callback){
		var opt = this.url2opt(url);
		opt.data = querystring.stringify(data);
		opt.method = 'POST';
		opt.headers = {
			'User-Agent': 'httpor.post/0.0.4',
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		this.request(opt, callback);
	}
}