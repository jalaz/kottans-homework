class LoginPage {
	constructor(route){
		if (Auth.isLogined()) 
			Router.go('#list');

		View.render(route.templateId, LoginPage.createVM());
		$(document).on("click", '.jsLogin', (e) => {
			e.preventDefault();
			var form = $(e.target).parents('form');
			API.login(form)
			   .done((data)=>{
			   		$(document).trigger('logined', data.token);
			 		Router.go('#list');
			    })
			   .fail((xhr)=>{
			 		var vm = Utils.createErrorModel(LoginPage.createVM(), form, xhr);
					View.render("login", vm);
			 	});
		});
	}

	static createVM(){
		return {
			login : {
				placeholder: 'enter your login',
				name: 'login'
			},
			password : {
				placeholder: 'enter your password',
				name: 'password'
			}
		}
	}
}