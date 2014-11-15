module.exports = function countWords(inputWords){
	return inputWords.reduce(function(dict, word){
		dict[word] = isFinite(dict[word]) ? dict[word] + 1 : 1;
		return dict;
	}, {});
}