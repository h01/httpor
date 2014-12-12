//	@name	HTTPOR::The HTTP Operator 
//	@author	Holger
//	@modify	2014/12/12
//	@myblog	http://ursb.org
//	@github	https://github.com/h01/httpor

var http  = require('http');
var https = require('https');
var iconv = require('iconv-lite');
var querystring = require('querystring');


module.exports = {
	// =Url to Options: 'http://ursb.org/'->{host: 'ursb.org', port: 80, path: '/', prot: 'http'}
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
	// =Send request
	// @param {Object} options
	// @param {Function} callback(err, res)
	request: function (opt, callback) {
		var _protocol = opt.prot === 'https' ? https : http;
		opt.port = opt.port || (opt.prot === 'https' ? 443 : 80);
		opt.headers = opt.headers || {
			'User-Agent': 'httpor/0.0.5'
		};
		if (['POST', 'post'].indexOf(opt.method) !== -1 && !opt.headers['Content-Type']) {
			opt.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		};
		var _req = _protocol.request(opt, function(res){
			var _temp = '';
			res.setEncoding('binary');
			res.on('data', function(c){
				_temp += c;
			}).on('end', function(){
				callback(null, {
					data: iconv.decode(new Buffer(_temp, 'binary'), opt.encode || 'utf8'),
					code: res.statusCode,
					head: res.headers
				});
			});
		}).on('error', function (e) {
			callback(e, null);
		});
		if (opt.method == 'POST') {
			_req.write(querystring.stringify(opt.data));
		};
		_req.end();
	},
	// =Send get method
	// @param {String} url
	// @param {Function} callback(err, res)
	get: function (url, callback) {
		var opt = this.url2opt(url);
		opt.method = 'GET';
		this.request(opt, callback);
	},
	// =Send post method
	// @param {String} url
	// @param {Object} data
	// @param {Function} callback(err, res)
	post: function (url, data, callback) {
		var opt = this.url2opt(url);
		opt.data = data;
		opt.method = 'POST';
		this.request(opt, callback);
	}
}