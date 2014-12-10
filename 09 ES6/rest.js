module.exports = function average(...args) {
	return args.reduce((agr, cur) => agr + cur) / args.length;
};