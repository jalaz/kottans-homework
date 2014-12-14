class RouteMatcher{
	constructor(){
		this.urlVarRegex = new RegExp('/:(\\w+)');

		this.routing = {};
		this.patterns = {};
	}

	addRoute(path, route){
		var list = this.isPattern(path) ? "patterns" : "routing";
		this[list][path] = route;
	}

	isPattern(path){
		return this.urlVarRegex.exec(path) != null;
	}

	match(path){
		return this.routing[path] || this.findInPatterns(path);
	}

	findInPatterns(path){
		for (var pattern in this.patterns) {
			var routeData = this.getPatternValue(path, pattern);
			if (routeData) 
			{
				var match = this.patterns[pattern];
				match.routeData = routeData;
				return match;
			}
		}
	}

	getPatternValue(path, pattern){
		var name = this.urlVarRegex.exec(pattern)[1];
		var value = this.getRegexByPattern(pattern).exec(path);
		if (value != null) 
			return {
				[name] : value[1]
			};
	}

	getRegexByPattern(pattern){
		return new RegExp(pattern.replace(this.urlVarRegex, "\/(\\w+)"), 'g');
	}
}