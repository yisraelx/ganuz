import isEnumerable from '../';

describe(`isEnumerable()`, () => {
  it(`should be a function`, () => {
    expect(isEnumerable).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => isEnumerable(undefined, 'foo')).toThrow();
    expect(() => isEnumerable(56 as any, 'foo')).toThrow();
  });

  it(`should return true`, () => {
    expect(isEnumerable({foo: 'bar'}, 'foo')).toBeTruthy();
    expect(isEnumerable([1], 0)).toBeTruthy();
  });

  it(`should return false`, () => {
    expect(isEnumerable({}, 'foo')).toBeFalsy();
    expect(isEnumerable(Object.create({foo: 'bar'}), 'foo')).toBeFalsy();
    expect(isEnumerable(Object.create({}, {foo: {value: 'bar'}}), 'foo')).toBeFalsy();
  });
});
