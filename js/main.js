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

Group.prototype.render = function() {
	// for (var i = 0, len = )
};



utils = new Utils();

// PersonalData = new Group();

// PersonalData.setName('PersonalData');

// Address = new Element('Address', 'al. I. Daszynskiego 28/18, 31-534 Krakow');
// Mobile = new Element('Mobile', '+48 509 271 306');
// Email = new Element('Email', 'lukasz.jakub.adamczuk@gmail.com');
// Website = new Element('Website', 'adamczuk.net.pl');
// Birthdate = new Element('Birthdate', 'February 10, 1983');

// PersonalData.addElement(Address);
// PersonalData.addElement(Mobile);
// PersonalData.addElement(Email);
// PersonalData.addElement(Website);
// PersonalData.addElement(Birthdate);


var startMode = function() {
	$('#starter').fadeOut(500);
	setTimeout(function() {
		$('#modes').fadeIn(500)
	}, 500);
};
var editMode = function() {
	if ($('#edit-mode').is(':hidden')) {
		$('#edit-mode-tgr').addClass('btn-primary').removeClass('btn-default');
		$('#preview-mode-tgr').addClass('btn-default').removeClass('btn-primary');

		$('#edit-mode').show();
		$('#preview-mode').hide();
	}
};
var previewMode = function() {
	if ($('#preview-mode').is(':hidden')) {
		$('#preview-mode-tgr').addClass('btn-primary').removeClass('btn-default');
		$('#edit-mode-tgr').addClass('btn-default').removeClass('btn-primary');

		$('#preview-mode').show();
		$('#edit-mode').hide();
	}
};
var showFormSection = function(element) {
	var name = utils.slugify($(element).text());

	$('#edit-mode section').hide();
	$('#' + name).show();
};
var saveFormData = function() {
	// personal data
	var pd = $('#personal-data form :input'),
		education = $('#education form :input');

	PersonalData = new Group();
	$.each(pd, function(idx, itm) {
		PersonalData.addElement(
			new Element(
				$(itm).prev().text(),
				$(itm).val()
			)
		);
		// console.log($(itm).val());
	});

	Education = new Group();
	$.each(education, function(idx, itm) {
		Education.addElement(
			new Element(
				$(itm).attr('name'),
				$(itm).val()
			)
		);
		// console.log($(itm).val());
	});
};

var personalDataTransform = function(item) {
	return {
		label: item.label,
		value: item.value
	};
};

var educationTransform = function(obj) {
	var item = {};

	$.each(obj, function(idx, itm) {
		item[utils.slugify(itm.label)] = itm.value;
	});

	return {
		title: item.school,
		subtitle: item.location,
		label: item.from + ' - ' + item.to,
		value: item.description
	};
};

var renderFormData = function() {
	var source   = $("#row-group-template").html();
	var template = Handlebars.compile(source);

	var items = PersonalData.elements,
		html = '';
	
	$.each(items, function(idx, itm) {
		// personalDataTransform(itm)
		html += template(itm);
	});

	$('#personal-data-preview').html(html);

	items = Education.elements,
	html = '';
	
	// $.each(items, function(idx, itm) {
		// console.log(items);
		// console.log();
		// educationTransform(items)
		html += template(educationTransform(items));
	// });

	$('#education-preview').html(html);
};

var copyForm = function(button, selector) {
	$(button).parent().before(
		$(selector).clone()
	);
};







$(document).ready(function() {
	// intro
	$('#start-mode-tgr').click(function() {
		startMode();
	});

	// navigation
	$('#edit-mode-tgr').click(function() {
		editMode();
	});

	$('#preview-mode-tgr').click(function() {
		previewMode();
		saveFormData();
		renderFormData();
	});

	$('.nav-pills li a').click(function() {
		showFormSection(this);
	});

	// education
	$('#education .editor button').click(function() {
		copyForm(this, '#education form');
	});


	// temporary start
	startMode();
	editMode();
	// previewMode();
});




compileTemplate = function() {
	setTimeout(function() {
		var source   = $("#form-group-template").html();
		var template = Handlebars.compile(source);

		var group   = {name: "My New Post", description: "This is my first post!"};
		var html    = template(group);

		$('#editor').append(html);
	}, 3000);
};