class LogoutPage{
	constructor(){
		if (!Auth.isLogined()) 
			Router.go('#login');

		$(document).trigger('logedOut');
		Router.go('#login');
	}
}