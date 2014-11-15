module.exports = function repeat(operation, num){
	if(num <= 0) return;
	operation();

	if (num % 800 === 0) {
		setTimeout(function(){
			repeat(operation, --num);
		}, 1);	
	}
	else
		repeat(operation, --num);
}