module.exports = function checkUsersValid(goodUsers){
	return function(usersToCheck){
		return usersToCheck.every(function isValid(userToCheck){
			return goodUsers.some(function contains(goodUser){
				return goodUser.id === userToCheck.id;
			});
		});
	}
}