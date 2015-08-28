describe('Group', function() {
  var group,
      element,
      tuple;

  beforeEach(function() {
    group = new Group();
    element = new Element();
    tuple = new Tuple('label', 'value');
  });

  // if ()

  it('must have one element after execute addElement()', function() {
    element.addTuple(tuple);
    group.addElement(element);

    expect(group.elements.length).toEqual(1);
  });
});
