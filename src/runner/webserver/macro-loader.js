
var loaderUtils = require('loader-utils');

module.exports = function(source, map) {
	var macros = loaderUtils.getOptions(this);
	Object.keys(macros).forEach((macro) => {
		source = source.replace(new RegExp(macro, 'g'), macros[macro]);
	});
	return this.callback(null, source, map);
};
