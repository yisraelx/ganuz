import hasOwn from '../';

describe(`hasOwn()`, () => {
  it(`should be a function`, () => {
    expect(hasOwn).toBeFunction();
  });

  it(`should throw if target is primitive`, () => {
    expect(() => hasOwn(null, 'foo')).toThrow();
    expect(() => hasOwn('foo' as any, 'toString')).toThrow();
  });

  it(`should return true`, () => {
    expect(hasOwn([], 'length')).toBeTruthy();
    expect(hasOwn([1], 0)).toBeTruthy();
    expect(hasOwn({foo: 'bar'}, 'foo')).toBeTruthy();
    expect(hasOwn(Object, 'create')).toBeTruthy();
  });

  it(`should return false`, () => {
    expect(hasOwn({}, 'foo')).toBeFalsy();
    expect(hasOwn(Object, 'hasOwnProperty')).toBeFalsy();
    expect(hasOwn(Object.create({foo: 'bar'}), 'foo')).toBeFalsy();
  });
});
