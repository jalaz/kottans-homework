module.exports = function(func, times){
	for(var i = 0; i < times; i++){
		func();
	}
};