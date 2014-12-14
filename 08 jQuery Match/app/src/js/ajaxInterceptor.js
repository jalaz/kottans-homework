class AjaxInterceptor {
	static init(){
		var tokenStorage = new Token();
		var token = tokenStorage.get();
		if (token) 
			AjaxInterceptor.addToken(token);

		$(document).on('logined', (e, token) => {
			tokenStorage.set(token);
			AjaxInterceptor.addToken(token);
		});

		$(document).on('logedOut', (e) => {
			tokenStorage.set('');
			if ($.ajaxSettings.headers) 
				delete $.ajaxSettings.headers['SECRET-TOKEN'];
		});
	}

	static addToken(token){
		$.ajaxSetup({
			headers: {
				'SECRET-TOKEN': token	
			}
		});
	}
}