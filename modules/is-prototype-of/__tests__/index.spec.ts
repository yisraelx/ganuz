import isPrototypeOf from '../';

class Some {
}

class Other extends Some {
}

let some = new Some();
let other = new Other();

let a = Object.create(null);
let b = Object.create(a);

describe(`isPrototypeOf()`, () => {
  it(`should be a function`, () => {
    expect(isPrototypeOf).toBeFunction();
  });

  it('should throw if proto is primitive', () => {
    expect(() => isPrototypeOf({}, null)).toThrow();
    expect(() => isPrototypeOf({}, 'foo' as any)).toThrow();
  });

  it(`should return true`, () => {
    expect(isPrototypeOf(Object('foo'), String.prototype)).toBeTruthy();
    expect(isPrototypeOf(Object(false), Boolean.prototype)).toBeTruthy();
    expect(isPrototypeOf(Object(1), Number.prototype)).toBeTruthy();
    expect(isPrototypeOf({}, Object.prototype)).toBeTruthy();
    expect(isPrototypeOf(Function.prototype, Object.prototype)).toBeTruthy();
    expect(isPrototypeOf(v => v, Function.prototype)).toBeTruthy();
    expect(isPrototypeOf(class {
    }, Function.prototype)).toBeTruthy();
    expect(isPrototypeOf(Other, Some)).toBeTruthy();
    expect(isPrototypeOf(Other.prototype, Some.prototype)).toBeTruthy();
    expect(isPrototypeOf(some, Some.prototype)).toBeTruthy();
    expect(isPrototypeOf(other, Some.prototype)).toBeTruthy();
    expect(isPrototypeOf(other, Other.prototype)).toBeTruthy();

    expect(isPrototypeOf(b, a)).toBeTruthy();
  });

  it(`should return false`, () => {
    expect(isPrototypeOf(null, Object.create(null))).toBeFalsy();
    expect(isPrototypeOf('foo' as any, String.prototype)).toBeFalsy();
    expect(isPrototypeOf(true as any, Boolean.prototype)).toBeFalsy();
    expect(isPrototypeOf(0 as any, Number.prototype)).toBeFalsy();
    expect(isPrototypeOf(NaN as any, Number.prototype)).toBeFalsy();
    expect(isPrototypeOf(Infinity as any, Number.prototype)).toBeFalsy();
    expect(isPrototypeOf(a, b)).toBeFalsy();
    expect(isPrototypeOf(a, Object.prototype)).toBeFalsy();
    expect(isPrototypeOf(Some, Other)).toBeFalsy();
    expect(isPrototypeOf(Some.prototype, Other.prototype)).toBeFalsy();
    expect(isPrototypeOf(some, other)).toBeFalsy();
  });
});
