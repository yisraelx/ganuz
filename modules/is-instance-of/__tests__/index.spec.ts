import isInstanceOf from '../';

describe(`isInstanceOf()`, () => {
  it(`should be a function`, () => {
    expect(isInstanceOf).toBeFunction();
  });

  it(`should throw if constructor is not function`, () => {
    expect(() => isInstanceOf({}, null)).toThrow();
    expect(() => isInstanceOf({}, {} as any)).toThrow();
    expect(() => isInstanceOf({}, {[Symbol.hasInstance]: 'foo'} as any)).toThrow();
    expect(() => isInstanceOf({}, Infinity as any)).toThrow();
  });

  it(`should return true`, () => {
    expect(isInstanceOf({}, Object)).toBeTruthy();
    expect(isInstanceOf(Object('foo'), String)).toBeTruthy();
    expect(isInstanceOf(() => {
    }, Function)).toBeTruthy();

    class Some {
    }

    expect(isInstanceOf(new Some, Some)).toBeTruthy();
    expect(isInstanceOf('a', {[Symbol.hasInstance]: (v) => v === 'a'})).toBeTruthy();
  });

  it(`should return false`, () => {
    expect(isInstanceOf('foo', String)).toBeFalsy();
    expect(isInstanceOf(true, Boolean)).toBeFalsy();
    expect(isInstanceOf(NaN, Number)).toBeFalsy();
    expect(isInstanceOf({}, String)).toBeFalsy();
    expect(isInstanceOf(undefined, Object)).toBeFalsy();
    expect(isInstanceOf(Object.create(null), Object)).toBeFalsy();
  });
});
