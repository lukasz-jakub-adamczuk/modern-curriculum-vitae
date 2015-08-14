console.log('All magic begins here...');

// mcv = mcv || {};

// mvc 

function Utils() {

}

Utils.prototype.slugify = function(text) {
	// this.text = text;
	return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
};


function Element(label, value) {
	this.label = label;
	this.value = value;
}

// not need
Element.prototype.create = function(label, value) {
	this.label = label;
	this.value = value;
};

Element.prototype.getLabel = function() {
	return this.label;
};

Element.prototype.getValue = function() {
	return this.value;
};


function Group(type) {
	// this.name = name;
	if (type) {
		this.type = type;
	} else {
		this.type = 'default';
	}
	// elements
	this.elements = [];
}

Group.prototype.setName = function(name) {
	// name
	this.name = name;
	// key
	this.key = utils.slugify(name);
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



utils = new Utils();

PersonalData = new Group();

PersonalData.setName('PersonalData');

Address = new Element('Address', 'al. I. Daszynskiego 28/18, 31-534 Krakow');
Mobile = new Element('Mobile', '+48 509 271 306');
Email = new Element('Email', 'lukasz.jakub.adamczuk@gmail.com');
Website = new Element('Website', 'adamczuk.net.pl');
Birthdate = new Element('Birthdate', 'February 10, 1983');

PersonalData.addElement(Address);
PersonalData.addElement(Mobile);
PersonalData.addElement(Email);
PersonalData.addElement(Website);
PersonalData.addElement(Birthdate);




$(document).ready(function() {
	setTimeout(function() {
		var source   = $("#form-group-template").html();
		var template = Handlebars.compile(source);

		var group   = {name: "My New Post", description: "This is my first post!"};
		var html    = template(group);

		$('#editor').append(html);
	}, 3000);
});



