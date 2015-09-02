describe('Element', function() {
  var element,
      tuple;

  beforeEach(function() {
    element = new Element();
    tuple = new Tuple('label', 'value');
  });

  it('must have tuple after execute addTuple()', function() {
    element.addTuple(tuple);

    console.log(element);

    expect(element.tuples.length).toEqual(1);
  });

  it('can check Tuple existance', function() {
    element.addTuple(tuple);

    console.log(element);

    expect(element.hasTuple('label')).toBe(true);
  });

  it('can get Tuple value', function() {
    element.addTuple(tuple);

    expect(element.getTupleValue('label')).toEqual('value');
  });
});
