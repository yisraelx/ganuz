import assertWritable from '../';

describe(`assertWritable()`, () => {
  it(`should be a function`, () => {
    expect(assertWritable).toBeFunction();
  });

  it(`should return the given 'value'`, () => {
    expect(assertWritable(Object, 'foo')).toBe(Object);
  });

  it(`should throw error'`, () => {
    expect(() => assertWritable(Object.create({}, {foo: {value: 'bar'}}), 'foo')).toThrow();
  });
});
