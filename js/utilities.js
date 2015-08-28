'use strict';

var Utilities = {
	slugify: function(text) {
		return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
	},
	toCamelCase: function(text) {
		return text.replace(/^.|-./g, function(letter, index) {
			return index == 0 ? letter.toLowerCase() : letter.substr(1).toUpperCase();
		});
	}
};