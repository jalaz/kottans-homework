module.exports = function Spy(target, method) {
	var self = this;
	this.count = 0;
	var originalFunc = target[method];
	target[method] = function(){
		self.count++;
		return originalFunc.apply(this, arguments);
	}
	return self;
}