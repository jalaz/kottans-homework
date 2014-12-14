class Router {
	static init(){
		this.matcher = new RouteMatcher();

		window.onpopstate = (event) => {
			this.go(document.location.hash, false);
		}
	}

	static when(path, route){ 
		this.matcher.addRoute(path, route);
		return this;
	}
	static otherwise(routeName){
		this.defaultRoute = routeName;
		return this;
	}
	static canGo(path){
		return !!this.matcher.match(path);
	}
	static go(path, pushState = true) {
		var match = this.matcher.match(path);
		if (!match) 
			match = this.matcher.match(this.defaultRoute());
		if (pushState)
			window.history.pushState({path}, location.title, path);
		Navbar.setActive(path);
		match.init(match);
	}
}