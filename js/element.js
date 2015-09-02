'use strict';

function Element() {
	// elements
	this.tuples = [];
}

Element.prototype.addTuple = function(tuple) {
	this.tuples.push(tuple);
};

Element.prototype.hasTupleValue = function(label) {
	for (var tuple in this.tuples) {
		if (this.tuples[tuple].label === label) {
			return true;
		}
	}
	return false;
};

Element.prototype.getTupleValue = function(label) {
	for (var tuple in this.tuples) {
		if (this.tuples[tuple].label === label) {
			return this.tuples[tuple].value;
		}
	}
};