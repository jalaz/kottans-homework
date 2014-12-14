class ListPage{
	constructor(){
		if (!Auth.isLogined()) 
			Router.go('#login');

		API.getUsers()
		   .done(data => {
		   		var users = ListPage.adaptVM(data);
		   		View.render('list', { users });
		 	});
	}
	static adaptVM(data){
		return data.map(el => {
			el.user.isMale = el.user.gender == 'male'
			return el;
		});
	}
}