// Fill form and with data

var completeFormInputs = function() {
	// personal data
	$('#personal-data [value=Name]').parent().next().children('input').val('John Smith');
	$('#personal-data [value=Email]').parent().next().children('input').val('john.smith@email.com');
	$('#personal-data [value=Mobile]').parent().next().children('input').val('+1 500 500 500');
	$('#personal-data [value=Address]').parent().next().children('input').val('Times Square, Manhattan, New York, NY 10036');
	$('#personal-data [value=Birthdate]').parent().next().children('input').val('Jan 1, 1970');

	$('#personal-data button').click();
	$('#personal-data fieldset:last').find('input:first').val('Website');
	$('#personal-data fieldset:last').find('input:last').val('https://www.nasa.gov/');

	// education
	$('#education [name=school]').val('Massachusetts Institute of Technology');
	$('#education [name=location]').val('Cambridge, Massachusetts, United States');
	$('#education [name=from]').val('Oct 1999');
	$('#education [name=to]').val('Jun 2003');
	$('#education [name=description]').val('Master of Science in Engineering');

	// work experience
	$('#work-experience [name=company]').val('National Aeronautics and Space Administration');
	$('#work-experience [name=location]').val('Washington, D.C.');
	$('#work-experience [name=from]').val('Jan 2010');
	$('#work-experience [name=to]').val('present');
	$('#work-experience [name=description]').val('Responsible for the civilian space program as well as aeronautics and aerospace research.');

	// projects
	$('#projects [name=company]').val('National Aeronautics and Space Administration');
	$('#projects [name=from]').val('Jan 2011');
	$('#projects [name=to]').val('Dec 2012');
	$('#projects [name=description]').val('Delivering at least four crew members to the ISS.');

	$('#projects button').click();
	$('#projects [name=company]:last').val('National Aeronautics and Space Administration');
	$('#projects [name=from]:last').val('Jan 2012');
	$('#projects [name=to]:last').val('Dec 2014');
	$('#projects [name=description]:last').val('Research and development into human spaceflight concepts.');

	// skills
	$('#skills [name=group]').val('Telecomunication');
	$('#skills [name=skills]').val('Calling and answering to astronauts.');

	$('#skills button').click();
	$('#skills [name=group]:last').val('Mechanics');
	$('#skills [name=skills]:last').val('Working with jet engines');

	$('#skills button').click();
	$('#skills [name=group]:last').val('Engineering');
	$('#skills [name=skills]:last').val('Understanding solar panels concept');

	$('#skills button').click();
	$('#skills [name=group]:last').val('Physics');
	$('#skills [name=skills]:last').val('Mastering wormholes object for time travels');

	// achievements-and-awards
	$('#achievements-and-awards [name=when]').val('Jun 2012');
	$('#achievements-and-awards [name=description]').val('Flying in balloon over Atlantic Ocean');

	$('#achievements-and-awards button').click();
	$('#achievements-and-awards [name=when]:last').val('Oct 2010');
	$('#achievements-and-awards [name=description]:last').val('Finishing IRONMAN on Hawaii');

	// languages
	$('#languages [name=language]').val('English');
	$('#languages [name=level]').val('Excellent, speaking and writing');

	$('#languages button').click();
	$('#languages [name=language]:last').val('French');
	$('#languages [name=level]:last').val('Basic');

	// $('#languages [name=language]').val('English');
	// $('#languages [name=level]').val('Excellent, speaking and writing');
	
};

