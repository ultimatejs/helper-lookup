React.__helpers = {};

React.registerHelper = function(name, func) {
	React.__helpers[name] = func;
};
