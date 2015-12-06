Plugin.registerCompiler({
  extensions: ['jsx'],
}, function () {
  return new BabelCompiler({
    react: true
  });
});


var oldProcessFilesForTarget = BabelCompiler.prototype.processFilesForTarget;

var parentReg = /(<([A-Z][a-z0-9]+[\s\S]*?)(\/>|>))/g;
var lookupReg = /(?:this\.(\w+)\(([\s\S]*?)\))/g;

var parentReplace = "<$2 __parent={this} $3"; //allow for climbing component tree backwards via `__parent`
var lookupReplace = "this.__lookup('$1', [$2])"; //`this.__lookup` will perform method search utilizing `__parent`


BabelCompiler.prototype.processFilesForTarget = function (inputFiles) {
	var proto = Object.getPrototypeOf(inputFiles[0]); 
	
	if(!proto.__modified) {
		this.assignNewGetContentsAsString(proto); //streamline modified transpilation
	}
	
	return oldProcessFilesForTarget.apply(this, arguments);
};


BabelCompiler.prototype.assignNewGetContentsAsString = function(proto) {
	var oldGetContentsAsString = proto.getContentsAsString;
	var self = this;
	
	proto.getContentsAsString = function() {
		var code = oldGetContentsAsString.apply(this, arguments);
		var isJsx = this.getExtension && this.getExtension() === 'jsx'; //css files dont have `getExtension`
		
		return isJsx ? self.meteorizeJsx(code) : code; //apply regex/replace
	};
	
	proto.__modified = true; //same prototype used between builds; this is how we check if its modified
};

BabelCompiler.prototype.meteorizeJsx = function(code) {
	return code.replace(parentReg, parentReplace).replace(lookupReg, lookupReplace);
};

