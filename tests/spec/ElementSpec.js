describe('Element', function() {
  var element,
      tuple;

  beforeEach(function() {
    element = new Element();
    tuple = new Tuple('label', 'value');
  });

  it('must have tuple after execute addTuple()', function() {
    element.addTuple(tuple);

    expect(element.tuples.length).toEqual(1);
  });
});
