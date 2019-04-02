import toDataDescriptor from '../';

describe(`toDataDescriptor()`, () => {
  it(`should be a function`, () => {
    expect(toDataDescriptor).toBeFunction();
  });

  it('should create descriptor', () => {
    expect(toDataDescriptor()).toMatchObject({configurable: true, enumerable: true, writable: true, value: undefined});
    expect(toDataDescriptor(55, 0)).toMatchObject({configurable: false, enumerable: false, writable: false, value: 55});
    expect(toDataDescriptor('foo', 77)).toMatchObject({
      configurable: true,
      enumerable: true,
      writable: true,
      value: 'foo'
    });
    expect(toDataDescriptor(false, true)).toMatchObject({
      configurable: true,
      enumerable: true,
      writable: true,
      value: false
    });
    expect(toDataDescriptor(Function, 'ce')).toMatchObject({
      configurable: true,
      enumerable: true,
      writable: false,
      value: Function
    });
    expect(toDataDescriptor(null, {enumerable: true, writable: 76})).toMatchObject({
      configurable: false,
      enumerable: true,
      writable: true,
      value: null
    });
    expect(toDataDescriptor(true, {})).toMatchObject({
      configurable: false,
      enumerable: false,
      writable: false,
      value: true
    });
  });
});
