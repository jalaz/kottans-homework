module.exports = function getShortMessages(messageHolders){
	return messageHolders.filter(function lessThan50(holder){
		return holder.message.length < 50;
	}).map(function getMessage(holder){
		return holder.message;
	});
}