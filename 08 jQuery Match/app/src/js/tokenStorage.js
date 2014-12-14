class Token {
	constructor(){
		this.TOKEN_KEY = "user.token";
	}

	get(){
		return localStorage[this.TOKEN_KEY];
	}
	set(token){
		localStorage[this.TOKEN_KEY] = token;
	}
}