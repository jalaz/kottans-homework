class API {
	static init(api_base){
		this.ACTIONS = {
			SIGN_UP : `${api_base}/signup`,
			LOGIN : `${api_base}/login`,
			USERS : `${api_base}/users`,
			USER : `${api_base}/user/:id`
		}
	}

	static post(url, form){
		return $.ajax({
				  type: "POST",
				  url: url,
				  data: form.serialize(),
				  dataType: 'json'
				});
	}

	static get(url){
		return $.ajax({
				  type: "GET",
				  url: url,
				  dataType: 'json'
				});
	}

	static getUsers() {
		return API.get(this.ACTIONS.USERS);
	}
	static signUp(form){
		return API.post(this.ACTIONS.SIGN_UP, form);
	}
	static login(form){
		return API.post(this.ACTIONS.LOGIN, form);
	}
	static getUser(id) {
		var url = this.ACTIONS.USER.replace(/:id/g, id);
		return API.get(url);
	}
}