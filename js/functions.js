'use strict';

var groups;

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
				element.addTuple(
					new Tuple(
						$(input).attr('name'),
						$(input).val()
					)
				);
			});
			group.addElement(element);
		});
		groups.push(group);
	});

};

var renderFormData = function() {
	var html, header, row;

	html = '';
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
			console.log(itm)
			if (itm.hasTuple('Name')) {
				$('#preview-mode h1').text(itm.getTupleValue('value'));
				// console.log(itm.getTupleValue('value'));
			} else {
				html += row(object);
			}
		});
	});

	$('#preview-mode .content').html(html);
};

var copyForm = function(button, selector) {
	$(button).parent().prev().append(
		$(selector).clone()
	);
	// clear cloned fieldset
	$(button).parent().prev().children('fieldset:last').find(':input').each(function(idx, itm) {
		$(itm).val('');
	});
};