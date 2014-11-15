module.exports = function getDependencies(tree, result) {
	var result = result || {};

	if (typeof tree.dependencies == 'object') {
		for(var key in tree.dependencies){
			var package = tree.dependencies[key];
			result[key + "@" + package.version] = undefined;
			if (typeof package.dependencies == 'object') {
				getDependencies(package, result);
			};
		}
	};

	return Object.keys(result).sort();
}