module.exports = function curryN(fn, n) {
	n = n || fn.length;

	return function curried(arg) {
		if (n == 1) 
			return fn.apply(this, arguments);
		else 
			return curryN(fn.bind(this, arg), --n);
	}
}