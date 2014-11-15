function deepCopy(obj){
	if (obj === null || typeof(obj) !== 'object') {
		return obj;
	};

	var copy = {};
	for(var key in obj) {
		copy[key] = deepCopy(obj[key]);
	};
	return copy;
}