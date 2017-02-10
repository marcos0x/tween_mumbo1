(function(global){
	'use strict';

	var namespace = global.app;

	function Module() {}

	if (!namespace) {
		global.app = namespace = new Module();
	}

	function require(path) {
		path = path.replace(/-/g, '_');
		var parts = path.split('.');
		var ns = namespace;
		for (var i = 0; i < parts.length; i++) {
			if (ns[parts[i]] === undefined) {
				ns[parts[i]] = new Module();
			}
			ns = ns[parts[i]];
		}
		return ns;
	}

	var proto = Module.prototype;

	proto.module = function(path, closure) {
		var exports = require(path);
		if (closure) {
			closure(exports, require);
		}
		return exports;
	};

	proto.extend = function(exports) {
		for (var sym in exports) {
			if (exports.hasOwnProperty(sym)) {
				this[sym] = exports[sym];
			}
		}
	};

})(this);

function pr(value){
	console.log(value);
}

function contains(haystack, needle){
	var result = -1;
	if(!Array.prototype.indexOf){
		for (var i = (needle || 0), j = haystack.length; i < j; i++) {
			if (haystack[i] === needle) {
				result = i;
				break;
			}
		}
	} else {
		result = haystack.indexOf(needle);
	}
	return (result !== -1);
}

app.module('modules.main', function(_this, require){
	'use strict';

	_this.localhosts = ['localhost', 'dev.'];
	_this.isDev = _this.localhosts.some(function(localhost) { if (location.host.indexOf(localhost) > -1) return 1; }) ? 1 : 0;

	var __construct = (function(_this){
		$(function(){
			if (_this.isDev) {
				$('body').append('<script src="http://'+location.host.split(':')[0]+':35729/livereload.js?snipver=1"></script>');
			}

			_this.events();
		});
	})(_this);

	_this.events = function(){
	};

});
