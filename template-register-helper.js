Template = {
	__helpers: {},
	registerHelper(name, func) {
		Template.__helpers[name] = func;
	}
}