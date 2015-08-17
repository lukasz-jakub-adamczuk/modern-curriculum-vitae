console.log('All magic begins here...');

// mcv = mcv || {};

// mvc 

var Utilities = {
	slugify: function(text) {
		return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
	}
}


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


function Element() {
	// elements
	this.tuples = [];
}

Element.prototype.addTuple = function(tuple) {
	this.tuples.push(tuple);
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
	this.key = Utilities.slugify(name);
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


var Transformer = {
	personalSection: function(element) {
		var item = {};
		// console.log(element);

		$.each(element.tuples, function(idx, itm) {
			item = itm;
		});
		// console.log(item);		
		return {
			label: item.label,
			value: item.value
		};
	},
	educationSection: function(element) {
		var item = {};

		$.each(element.tuples, function(idx, itm) {
			// item[Utilities.slugify(itm.label)] = itm.value;
			item[itm.label] = itm.value;
		});
		return {
			title: item.school,
			subtitle: item.location,
			label: item.from + ' - ' + item.to,
			value: item.description
		};
	}
};



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
	var name = Utilities.slugify($(element).text());

	console.log($(element).text());

	$('#edit-mode section').hide();
	$('#' + name).show();
};
var processFormData = function() {
	// personal data
	var pd = $('#personaldata form'),
		education = $('#education form');

	// groups = [
	// 	$('#personaldata form'),
	// 	$('#education form')
	// ];

	PersonalData = new Group();
	$.each(pd, function(idx, itm) {
		var forms = $(itm).find(':input');

		element = new Element();
		$.each(forms, function(i, input) {
			element.addTuple(
				new Tuple(
					$(input).prev().text(),
					$(input).val()
				)
			);
		});
		PersonalData.addElement(element);
	});
	

	Education = new Group();
	$.each(education, function(idx, itm) {
		var forms = $(itm).find(':input');

		element = new Element();
		$.each(forms, function(i, input) {
			element.addTuple(
				new Tuple(
					$(input).attr('name'),
					$(input).val()
				)
			);
		});
		Education.addElement(element);
	});
};

var renderFormData = function() {
	var source   = $("#row-group-template").html();
	var template = Handlebars.compile(source);

	var items = PersonalData.elements,
		html = '';

		// console.log(items);
	
	$.each(PersonalData.elements, function(idx, itm) {
		// personalDataTransform(itm)
		html += template(Transformer.personalSection(itm));
		// html += template(personalDataTransform(itm));
	});

	$('#personal-data-preview').html(html);

	items = Education.elements,
	html = '';
	
	$.each(Education.elements, function(idx, itm) {
		// console.log(itm);
		// console.log(Transformer.educationSection(itm));
		html += template(Transformer.educationSection(itm));

	});

	$('#education-preview').html(html);
};

var copyForm = function(button, selector) {
	$(button).parent().before(
		$(selector).clone()
	)
	// $(button).closest('form:last-child').find(':input').each(function(idx, itm) {
	// 	$(this).val('');
	// });
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
		processFormData();
		renderFormData();
	});

	$('.nav-pills li a').click(function() {
		showFormSection(this);
	});

	// education
	$('#education .editor button').click(function() {
		copyForm(this, '#education form:first');
	});


	// temporary start
	startMode();
	editMode();
	// previewMode();

	$('#education .editor button').click();

	// setTimeout(function() {
		previewMode();
	// }, 4000);
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