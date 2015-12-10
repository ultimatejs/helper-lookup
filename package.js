Package.describe({
	name: "ultimatejs:helper-lookup",
	summary: "Blaze style method lookup & more",
	version: '0.0.3',
	documentation: 'README.md',
	git: 'https://github.com/ultimatejs/helper-lookup'
});

Package.onUse(function (api) {
	api.use('ultimatejs:ultimate-react@0.0.0');

	api.use('underscore@1.0.0');

	api.addFiles([
		'helper-lookup-mixin.jsx',
		'global-helper.jsx',
	]);

	api.export([
		'HelperLookup', 
	]);
});