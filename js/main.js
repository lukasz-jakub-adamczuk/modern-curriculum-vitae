console.log('All magic begins here...');


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

	// copying forms fieldsets
	$('section .editor button').click(function() {
		copyForm(this, $(this).closest('section').find('fieldset:first'));
	});


	$('.dropdown-menu li').click(function(e){
		e.preventDefault();
		var selected = $(this).text();
		$('.category').val(selected);  
	});

	// temporary start
	startMode();
	editMode();
	// .then(function() {
	setTimeout(function() {
		showFormSection($('.nav-pills li a:last'));
	}, 1000);
	// });
	


	// sortable forms
	// var forms = [];
	$.each($('form'), function(idx, itm) {
		// var element = document.getElementById('personal-data-form');

		Sortable.create(document.getElementById(itm.id), {
			handle: 'fieldset',
			animation: 150
		});
	});



	// mocks
	completeFormInputs();

	// previewMode();
});


