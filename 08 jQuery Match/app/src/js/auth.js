class Auth{
	static isLogined(){
		var tokenStorage = new Token();
		return !!tokenStorage.get();
	}
}