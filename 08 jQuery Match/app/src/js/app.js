(() => {
	'use strict';
	$(() => {
		API.init('http://api.sudodoki.name:8888');
		View.setContainer($('.container'));
		AjaxInterceptor.init();
		Navbar.init($('.jsNav'), $('#nav'));
		Router.init();
		Router.when('#login', { templateId: 'login', init: LoginPage })
			  .when('#signup', { templateId: 'signup', init: SignupPage })
			  .when('#list', { templateId: 'list', init: ListPage })
			  .when('#details/:id', {templateId: 'details', init: DetailsPage })
			  .when('#logout', { init: LogoutPage })
			  .otherwise(() => Auth.isLogined() ? '#list' : '#login');

	  	Router.go(location.hash);
	});
})();