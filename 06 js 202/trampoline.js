function repeat(operation, num){
	if(num <= 0) return;
	operation();
	return repeat.bind(this, operation, --num);
}

function trampoline(fn){
	var result = fn.apply(fn, [].slice.call(arguments).slice(1));

	while(typeof result === 'function'){
		result = result(); 
	}
	
	return result;
}

module.exports = function(operation, num){
	trampoline(repeat(operation, num));
}