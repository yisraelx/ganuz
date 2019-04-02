import isWritable from '../';

describe(`isWritable()`, () => {
  it(`should be a function`, () => {
    expect(isWritable).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => isWritable(null, 'prop')).toThrow();
    expect(() => isWritable(true as any, 'prop')).toThrow();
  });

  it('should return true', () => {
    expect(isWritable({}, 'foo')).toBeTruthy();
    expect(isWritable({foo: 'bar'}, 'foo')).toBeTruthy();
    expect(isWritable(class {
      static method() {
      }
    }, 'method')).toBeTruthy();
  });

  it('should return false', () => {
    expect(isWritable(Object.freeze({foo: 'bar'}), 'foo')).toBeFalsy();
    expect(isWritable(Object.create(null, {foo: {value: 'bar'}}), 'foo')).toBeFalsy();
    expect(isWritable({
      get foo() {
        return 'bar';
      }
    }, 'foo')).toBeFalsy();
  });
});
