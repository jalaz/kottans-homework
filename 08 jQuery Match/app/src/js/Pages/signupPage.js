class SignupPage {
	constructor(route){
		if (Auth.isLogined()) 
			Router.go('#list');

		View.render(route.templateId, SignupPage.createVM());
		$(document).on("click", '.jsSignup', (e) => {
			e.preventDefault();
			var form = $(e.target).parents('form');
			API.signUp(form)
			   .done((data)=> {
			   		$(document).trigger('logined', data.token);
			 		Router.go('#list');
			    })
			 	.fail((xhr)=>{
			 		var vm = Utils.createErrorModel(SignupPage.createVM(), form, xhr);
					View.render("signup", vm);
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
				placeholder: 'enter your new password',
				name: 'password'
			},
			passwordConfirmation : {
				placeholder: 'retype it',
				name: 'passwordConfirmation'
			}
		}
	}
}