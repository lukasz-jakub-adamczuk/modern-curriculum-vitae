'use strict';

function Element() {
	// elements
	this.tuples = [];
}

Element.prototype.addTuple = function(tuple) {
	this.tuples.push(tuple);
};