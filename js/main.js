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

	$(element).parent().siblings('li').removeClass('active');
	$(element).parent().addClass('active');

	$('#edit-mode section').hide();
	$('#' + name).show();
};
var processFormData = function() {

	var sections = $('section');

	groups = [];

	// console.log(sections.length);

	$.each(sections, function(sec, section) {
		// console.log(section);
		var forms = $(section).find('fieldset'),
			group = new Group();

		group.setName($(section).find('h2').text());
		// console.log($(section).children('form'));

		$.each(forms, function(idx, itm) {
			var fields = $(itm).find(':input'),
				element = new Element();

			$.each(fields, function(i, input) {
				// console.log(group.getName());
				// have to be checked :(
				if (group.getName() == '_Personal Data') {
					element.addTuple(
						new Tuple(
							'label',
							$(input).prev().text()
						)
					);
					element.addTuple(
						new Tuple(
							'value',
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

};

var renderFormData = function() {
	var html, header, row;

	header = Handlebars.compile($('#group-header-preview-template').html()),
	row = Handlebars.compile($("#row-group-template").html());

	$.each(groups, function(i, group) {
		html += header({name: group.getName()});

		$.each(group.elements, function(idx, itm) {
			var object, transform;
				
			transform = Utilities.toCamelCase(Utilities.slugify(group.getName())) + 'Transform';

			object = Transformer.initialize(itm);
			object = (typeof Transformer[transform] == 'function') ? Transformer[transform](object) : Transformer.defaultTransform(object);

			// console.log(Transformer.change(transform));
			html += row(object);
		});
	});

	$('#preview-mode .container').html(html);
};

var copyForm = function(button, selector) {
	$(button).parent().prev().append(
		$(selector).clone()
	);
	// console.log($(button).closest('fieldset'));
	// clear
	$(button).parent().prev().children('fieldset:last').find(':input').each(function(idx, itm) {
		$(itm).val('');
	});
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
	$('section .editor button').click(function() {
		copyForm(this, $(this).closest('section').find('fieldset:first'));
	});


	// temporary start
	startMode();
	editMode();
	// .then(function() {
	setTimeout(function() {
		showFormSection($('.nav-pills li a:first'));
	}, 1000);
	// });
	// previewMode();

	// mocks
	completeFormInputs();
});





