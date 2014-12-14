class Utils{
	static getErrors(xhr){
		var response = JSON.parse(xhr.responseText);
		if (!response.errors) return;
		return response.errors
							 .reduce((agr, cur) => {
						 		var key = Object.keys(cur)[0];
						 		agr[key] = agr[key] || {};
						 		agr[key].error = cur[key];
						 		return agr;
						 	}, {});
	}
	static getError(xhr){
		var response = JSON.parse(xhr.responseText);
		if (!response.error) return;
		return response;
	}

	static formToObject(form){
		return form.find('input[type!=submit]')
				   .toArray()
				   .reduce((agr, cur)=>{
				   		var $el = $(cur);
				   		var key = $el.attr('name');
				   		agr[key] = agr[key] || {};
				   		agr[key].value = $el.val();
				   		return agr;
					}, {});
	}
	static createErrorModel(vm, form, xhr){
		var errors = Utils.getErrors(xhr) || Utils.getError(xhr);
		var enteredData = Utils.formToObject(form);
		return $.extend(true, SignupPage.createVM(), enteredData, errors);
	}
}