'use strict';

function Group(type) {
	if (type) {
		this.type = type;
	} else {
		this.type = 'default';
	}
	// elements
	this.elements = [];
}

Group.prototype.setName = function(name) {
	this.name = name;
	this.key = Utilities.slugify(name);
};

Group.prototype.getName = function() {
	return this.name;
};

Group.prototype.getKey = function() {
	return this.key;
};

Group.prototype.addElement = function(element) {
	this.elements.push(element);
};

Group.prototype.save = function() {
	var value = JSON.stringify(this);
	localStorage.setItem(this.key, value);
};

Group.prototype.load = function() {
	var value = localStorage.getItem(this.key);
	// this = JSON.parse(value);
};

Group.prototype.render = function() {
	// for (var i = 0, len = )
};