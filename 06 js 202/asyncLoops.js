module.exports = function loadUsers(userIds, load, done){
	var users = [];
	var loaded = 0;
	userIds.forEach(function(id, index){
		load(id, function(user){
			users[index] = user;
			if (++loaded >= userIds.length) done(users);
		});
	});
}