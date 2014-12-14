class View {
	static setContainer($container) {
		this.$container = $container;	
	}
	static render(templateId, model) {
		var template = Handlebars.compile($(`#${templateId}`).html())
		this.$container.html(template(model || {}));
	}
}