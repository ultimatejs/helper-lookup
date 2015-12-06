Package.describe({
	name: "ultimatejs:helper-lookup",
	summary: "Blaze style method lookup & more",
	version: '0.0.1',
	documentation: 'README.md',
	git: 'https://github.com/ultimatejs/helper-lookup'
});

Package.onUse(function (api) {
	api.versionsFrom('METEOR@1.2.1');
	api.use('underscore');
	api.use('ecmascript@0.1.5');
	
	
	api.addFiles([
		'helper-lookup-mixin.js',
		'template-register-helper.js',
	]);

	api.export([
		'HelperLookup', 
		'Template'
	]);
	
  api.imply([
    'babel-runtime@0.1.4-rc.0',
    'react-runtime@0.14.1_1'
  ]);
	
  api.use('isobuild:compiler-plugin@1.0.0');
});


Package.registerBuildPlugin({
  name: 'compile-jsx',
  use: ['babel-compiler@5.8.22-rc.1'],
  sources: [
    'jsx-plugin.js'
  ]
});