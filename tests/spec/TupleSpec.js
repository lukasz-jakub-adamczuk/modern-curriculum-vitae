describe('Tuple', function() {
  var tuple;

  beforeEach(function() {
    tuple = new Tuple('test', 'tuple');
  });

  it('must have label', function() {
    expect(tuple.getLabel()).toEqual('test');
  });

  it('must have value', function() {
    expect(tuple.getValue()).toEqual('tuple');
  });
});
