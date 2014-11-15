module.exports = function logger(namespace){
	return function(){
		var namespaced = [namespace].concat([].slice.call(arguments));
		console.log.apply(console, namespaced);
	}
}