module.exports = function duckCount(){
	return [].slice.call(arguments)
			 .filter(function(item){
		 		return Object.prototype.hasOwnProperty.call(item, "quack");
			 }).length;
}