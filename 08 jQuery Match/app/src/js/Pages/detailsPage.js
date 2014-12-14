class DetailsPage{
	constructor(route){
		if (!Auth.isLogined()) 
			Router.go('#login');
		
		API.getUser(route.routeData.id)
		   .done(data => {
		   		var vm = data[0].user;
		   		View.render('details', vm);
		   })
		   .fail((...args)=>{
		   		console.log('fail', args);
		   });
	}
}