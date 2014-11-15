module.exports = function arrayMap(arr, fn){
	return arr.reduce(function(prev, current){
		return prev.concat([fn(current)]);
	}, []);
}