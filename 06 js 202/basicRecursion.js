module.exports = function reduce(arr, fn, initial){
	function iteration(index, accumulator){
		if (index >= arr.length) return accumulator;
		accumulator = fn(accumulator, arr[index], index++, arr);
		return iteration(index, accumulator);
	}
	return iteration(0, initial);
}