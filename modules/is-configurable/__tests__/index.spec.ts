import isConfigurable from '../';

describe(`isConfigurable()`, () => {
  it(`should be a function`, () => {
    expect(isConfigurable).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => isConfigurable(null, 'foo')).toThrow();
    expect(() => isConfigurable('foo' as any, 'foo')).toThrow();
  });

  it('should return true', () => {
    expect(isConfigurable({}, 'foo')).toBeTruthy();
    expect(isConfigurable([1], 0)).toBeTruthy();
    expect(isConfigurable(class {
      static method() {
      }
    }, 'method')).toBeTruthy();
    expect(isConfigurable({foo: 'bar'}, 'foo')).toBeTruthy();
    expect(isConfigurable(Object.create(Object.create({}, {foo: {value: 'bar'}})), 'foo')).toBeTruthy();
  });

  it('should return false', () => {
    expect(isConfigurable(Object.create({}, {foo: {value: 'bar'}}), 'foo')).toBeFalsy();
    expect(isConfigurable([], 'length')).toBeFalsy();
    expect(isConfigurable(Object.freeze({foo: 'bar'}), 'foo')).toBeFalsy();
  });
});
