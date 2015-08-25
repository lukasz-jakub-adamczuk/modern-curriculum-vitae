console.log('All magic begins here...');

// mcv = mcv || {};

// mvc 

var Utilities = {
	slugify: function(text) {
		return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
	},
	toCamelCase: function(text) {
		return text.replace(/^.|-./g, function(letter, index) {
			return index == 0 ? letter.toLowerCase() : letter.substr(1).toUpperCase();
		});
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

var Transformer = {
	initialize: function(element) {
		item = {};

		$.each(element.tuples, function(idx, itm) {
			item[itm.label] = itm.value;
		});
		return item;
	},
	// this is for next step
	// to execute as Transformer.change(method);
	change: function(method) {
		return (typeof Transformer[method] == 'function') ? Transformer[method](item) : Transformer.defaultTransform(item);
	},

	personalDataTransform: function(item) {
		return {
			label: item.label,
			value: item.value
		};
	},
	educationTransform: function(item) {
		return {
			title: item.school,
			subtitle: item.location,
			label: item.from + ' - ' + item.to,
			value: item.description
		};
	},
	workExperienceTransform: function(item) {
		return {
			title: item.company,
			// subtitle: item.location,
			label: item.from + ' - ' + item.to,
			value: item.description
		};
	},
	projectsTransform: function(item) {
		return {
			title: item.company,
			// subtitle: item.location,
			label: item.from + ' - ' + item.to,
			value: item.description
		};
	},
	skillsTransform: function(item) {
		return {
			label: item.group,
			value: item.skills
		};
	},
	achievementsAndAwardsTransform: function(item) {
		return {
			// title: item.company,
			// subtitle: item.location,
			label: item.when,
			value: item.description
		};
	},
	languagesTransform: function(item) {
		return {
			label: item.language,
			value: item.level
		};
	},
	interestsAndActivitiesTransform: function(item) {
		return {
			value: item.value
		};
	},
	defaultTransform: function(item) {
		return {
			label: item.label,
			value: item.value
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
	var name = Utilities.slugify($(element).html().split('<br>').join(' '));

	console.log($(element).html().replace('<br>', ' '));
	// console.log(Utilities.toCamelCase(Utilities.slugify(group.getName())));

	console.log(name);

	$('#edit-mode section').hide();
	$('#' + name).show();
};
var processFormData = function() {

	var sections = $('section');

	groups = [];

	// console.log(sections.length);

	$.each(sections, function(sec, section) {
		// console.log(section);
		var forms = $(section).find('form'),
			group = new Group();

		group.setName($(section).find('h2').text());
		// console.log($(section).children('form'));

		$.each(forms, function(idx, itm) {
			var fields = $(itm).find(':input'),
				element = new Element();

			$.each(fields, function(i, input) {
				// console.log(group.getName());
				// have to be checked :(
				if (group.getName() == 'Personal Data') {
					element.addTuple(
						new Tuple(
							$(input).prev().text(),
							$(input).val()
						)
					);
				} else {
					element.addTuple(
						new Tuple(
							$(input).attr('name'),
							$(input).val()
						)
					);
				}
			});
			group.addElement(element);
		});
		groups.push(group);
	});
/*
	console.log(groups);

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
	});*/
};

var renderFormData = function() {
	var header = Handlebars.compile($('#group-header-preview-template').html());

	var source   = $("#row-group-template").html();
	var template = Handlebars.compile(source);

	var html = '';

		// console.log(items);

	// html = 
	$.each(groups, function(i, group) {
		var elements = group.elements;

		// console.log(group);

		html += header({name: group.getName()});

		$.each(elements, function(idx, itm) {
			// personalDataTransform(itm)
			// console.log(group.getKey());

			// aya.framework(itm);

			var transform = Utilities.toCamelCase(Utilities.slugify(group.getName())) + 'Transform';
			var object;

			object = Transformer.initialize(itm);

			console.log(transform);

			// var object = (typeof Transformer[group.getKey()] == 'function') ? Transformer[group.getKey()](itm) : Transformer.default(itm);
			object = (typeof Transformer[transform] == 'function') ? Transformer[transform](object) : Transformer.defaultTransform(object);

			console.log(Transformer.change(transform));

			// console.log(Transformer.transformations[group.getKey()] );
			// console.log(Transformer.educationSection(itm))
			// html += template(transform(itm));
			html += template(object);
			// html += template(personalDataTransform(itm));
		});
	});

	$('#preview-mode .container').html(html);

	/*
	
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
	*/
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
		// previewMode();
	// }, 4000);
});



