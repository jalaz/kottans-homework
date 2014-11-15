function deepCopy(obj){
	var copy = {};
	for(var key in obj) {
		copy[key] = obj[key];
	}
}