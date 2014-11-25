function my_$(selector) {
	return new my_$_wrapper(selector);
}

function my_$_wrapper(selector){
	this.nodes = document.querySelectorAll(selector);
	this.length = this.nodes.length;
}

my_$.fn = my_$_wrapper.prototype;

my_$.fn.setCss = function(propName, value){
	[].forEach.call(this.nodes, function(el){ el.style[propName] = value; })	
}

my_$.fn.getCss = function(propName, defaultVal){
	return [].map.call(this.nodes, function(el) {
				return el.style[propName] ? el.style[propName] : defaultVal
			});
}

my_$.fn.setCssObject = function(obj){
	for(prop in obj){
		this.setCss(prop, obj[prop]);
	}
}

function defineStyleProp(stylePropName, defaultVal){
	return function() {
		switch(arguments.length){
			case 0:
				return this.getCss(stylePropName, defaultVal);
				break;
			case 1:
				this.setCss(stylePropName, arguments[0]);
				break;
		}
		return this;
	}
}

my_$.fn.width = defineStyleProp('width', '0px');
my_$.fn.height = defineStyleProp('height', '0px');

function setTimeoutIfSpecified(func, timeout)
{
	if (typeof timeout === 'number') {
		setTimeout(function(){func();}, timeout);
	}
	else
		func();
}

my_$.fn.css = function(){
	var self = this;
	var args = [].slice.call(arguments);
	if (typeof args[0] === 'object') {
		var timeout = args[1];
		setTimeoutIfSpecified(function(){
			self.setCssObject(args[0]);
		}, timeout);
	}
	if (typeof args[0] === 'string') {
		var timeout = args[2];
		setTimeoutIfSpecified(function(){
			self.setCss(args[0], args[1]);
		}, timeout);
	};

	return this;
}