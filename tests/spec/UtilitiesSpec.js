describe('Utilities', function() {
  it('can slugify strings', function() {
    expect(Utilities.slugify('This is a simple text')).toEqual('this-is-a-simple-text');
  });

  xit('should transform text to camel case', function() {
    expect(Utilities.toCamelCase('This is a simple text')).toEqual('thisIsASimpleText');
  });
});
