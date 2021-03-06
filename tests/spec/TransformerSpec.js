describe('Transformer', function() {
  var element,
      tuple;

  beforeEach(function() {
    element = new Element();
    // tuple = new Tuple('label', 'value');
  });

  it('can transform Personal Data section', function() {
    var result = {label: 'Name', value: 'Joe Doe'};

    element.addTuple(new Tuple('label', 'Name'));
    element.addTuple(new Tuple('value', 'Joe Doe'));

    expect(Transformer.initialize(element)).toEqual(result);
  });

  it('can transform Education section', function() {
    var result = {school: 'MIT', from: 'Oct 1980', to: 'Jun 1984', description: 'Very interesting 5 years'};

    element.addTuple(new Tuple('school', 'MIT'));
    element.addTuple(new Tuple('from', 'Oct 1980'));
    element.addTuple(new Tuple('to', 'Jun 1984'));
    element.addTuple(new Tuple('description', 'Very interesting 5 years'));

    expect(Transformer.initialize(element)).toEqual(result);
  });

  it('can transform Work Experience section', function() {
    var result = {company: 'NASA', from: 'Jan 1990', to: 'Dec 2004', description: 'Responsible for Space Shuttle Program'};

    element.addTuple(new Tuple('company', 'NASA'));
    element.addTuple(new Tuple('from', 'Jan 1990'));
    element.addTuple(new Tuple('to', 'Dec 2004'));
    element.addTuple(new Tuple('description', 'Responsible for Space Shuttle Program'));

    expect(Transformer.initialize(element)).toEqual(result);
  });

  it('can transform Projects section', function() {
    var result = {company: 'NASA', from: 'Apr 2001', to: 'Jun 2004', description: 'Delivering at least four crew members to the ISS.'};
    
    element.addTuple(new Tuple('company', 'NASA'));
    element.addTuple(new Tuple('from', 'Apr 2001'));
    element.addTuple(new Tuple('to', 'Jun 2004'));
    element.addTuple(new Tuple('description', 'Delivering at least four crew members to the ISS.'));

    expect(Transformer.initialize(element)).toEqual(result);
  });

  it('can transform Skills section', function() {
    var result = {group: 'Telecomunication', skills: 'Calling and answering to astronauts'};
    
    element.addTuple(new Tuple('group', 'Telecomunication'));
    element.addTuple(new Tuple('skills', 'Calling and answering to astronauts'));

    console.log(Transformer.initialize(element));

    expect(Transformer.initialize(element)).toEqual(result);
  });

  it('can transform Achievements and Awards section', function() {
    var result = {when: 'Jun 2012', description: 'Flying in balloon over Atlantic Ocean'};
    
    element.addTuple(new Tuple('when', 'Jun 2012'));
    element.addTuple(new Tuple('description', 'Flying in balloon over Atlantic Ocean'));

    expect(Transformer.initialize(element)).toEqual(result);
  });

  it('can transform Languages section', function() {
    var result = {language: 'English', level: 'Excellent, speaking and writing'};
    
    element.addTuple(new Tuple('language', 'English'));
    element.addTuple(new Tuple('level', 'Excellent, speaking and writing'));

    expect(Transformer.initialize(element)).toEqual(result);
  });

  it('can transform Intersts and Activities section', function() {
    var result = {what: 'Swimming', size: '3'};
    
    element.addTuple(new Tuple('what', 'Swimming'));
    element.addTuple(new Tuple('size', '3'));

    expect(Transformer.initialize(element)).toEqual(result);
  });
});
