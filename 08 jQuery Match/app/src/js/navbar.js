class Navbar{
	static init(navbar, template){
		this.navBar = navbar;
		this.template = Handlebars.compile(template.html());
		Navbar.render(Navbar.createVm());
	}

	static render(model){
		this.navBar.html(this.template(model));
	}

	static setActive(path){
		var model = Navbar.createVm();
		model.items.forEach(i=> {
			i.active = i.path == path;
		});
		Navbar.render(model);
	}

	static createVm(){
		return {
			items: [
				{path: '#login', title: 'Login', show: !Auth.isLogined()},
				{path: '#signup', title: 'Signup', show: !Auth.isLogined()},
				{path: '#list', title: 'List my dates!', show: Auth.isLogined()},
				{path: '#logout', title: 'Logout', show: Auth.isLogined()}
			]
		}
	}
}