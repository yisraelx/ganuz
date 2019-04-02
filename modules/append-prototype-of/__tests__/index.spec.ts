import appendPrototypeOf from '../';

describe(`appendPrototypeOf()`, () => {
  it(`should be a function`, () => {
    expect(appendPrototypeOf).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => appendPrototypeOf(null, null)).toThrow();
    expect(() => appendPrototypeOf(78 as any, null)).toThrow();
  });

  it('should throw if proto is not object or null', () => {
    expect(() => appendPrototypeOf({}, undefined)).toThrow();
    expect(() => appendPrototypeOf(class {
    }, 45 as any)).toThrow();
  });

  it('should append proto to plain object and return true', () => {
    let object = {};
    expect(appendPrototypeOf(object, null)).toBeTruthy();
    expect(Object.getPrototypeOf(object)).toBeNull();
  });

  it('should append to primitive object return true', () => {
    let str = Object('foo');
    expect(appendPrototypeOf(str, null)).toBeTruthy();
    expect(Object.getPrototypeOf(str)).toBeNull();
  });

  it('should not append proto to freeze object and return false', () => {
    let object = Object.freeze({});
    expect(appendPrototypeOf(object, null)).toBeFalsy();
    expect(Object.getPrototypeOf(object)).toBe(Object.prototype);
  });

  it('should append not replace current null prototype with null', () => {
    let proto = Object.create(null);
    let object = {};
    Object.setPrototypeOf(object, proto);
    expect(Object.getPrototypeOf(object)).toBe(proto);
    expect(Object.getPrototypeOf(proto)).toBeNull();
    expect(appendPrototypeOf(object, null)).toBeTruthy();
    expect(Object.getPrototypeOf(object)).toBe(proto);
  });

  it('should not append to native function or prototype', () => {
    expect(appendPrototypeOf(Object, {})).toBeFalsy();
    expect(appendPrototypeOf(Object.prototype, {})).toBeFalsy();
    expect(appendPrototypeOf(Function, {})).toBeFalsy();
    expect(appendPrototypeOf(Function.prototype, {})).toBeFalsy();
    expect(appendPrototypeOf(String, {})).toBeFalsy();
    expect(appendPrototypeOf(String.prototype, {})).toBeFalsy();
  });

  it('should append proto to class', () => {
    class Some {
    }

    class Other {
    }

    class Anther {
    }

    appendPrototypeOf(Anther, Other);
    appendPrototypeOf(Anther.prototype, Other.prototype);
    expect(Object.getPrototypeOf(Anther)).toBe(Other);
    expect(Object.getPrototypeOf(Anther.prototype)).toBe(Other.prototype);
    expect(Object.getPrototypeOf(Other)).toBe(Function.prototype);
    expect(Object.getPrototypeOf(Other.prototype)).toBe(Object.prototype);

    appendPrototypeOf(Other, Some);
    appendPrototypeOf(Other.prototype, Some.prototype);

    expect(Object.getPrototypeOf(Anther)).toBe(Other);
    expect(Object.getPrototypeOf(Anther.prototype)).toBe(Other.prototype);
    expect(Object.getPrototypeOf(Other)).toBe(Some);
    expect(Object.getPrototypeOf(Other.prototype)).toBe(Some.prototype);
    expect(Object.getPrototypeOf(Some)).toBe(Function.prototype);
    expect(Object.getPrototypeOf(Some.prototype)).toBe(Object.prototype);
  });
});
