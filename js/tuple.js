'use strict';

function Tuple(label, value) {
	this.label = label;
	this.value = value;
}

Tuple.prototype.getLabel = function() {
	return this.label;
};

Tuple.prototype.getValue = function() {
	return this.value;
};