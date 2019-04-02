import eachPrototypeOf from '../';

describe(`eachPrototypeOf()`, () => {
  it(`should be a function`, () => {
    expect(eachPrototypeOf).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => eachPrototypeOf(null, () => {
    })).toThrow();
    expect(() => eachPrototypeOf(true as any, () => {
    })).toThrow();
  });

  it('should throw if callback is not function', () => {
    expect(() => eachPrototypeOf({}, null)).toThrow();
  });

  it('should iteratee and return target', () => {
    let a = Object.create(null);
    let b = Object.create(a);
    let c = Object.create(b);
    let protoList = [];

    expect(eachPrototypeOf(c, (proto) => {
      protoList.push(proto);
    })).toBe(c);

    expect(protoList).toEqual([c, b, a]);
  });

  it('should stop iteratee if callback invokes return false', () => {
    let protoList = [];
    let object = {};

    expect(eachPrototypeOf(object, (proto) => {
      if (proto === Object.prototype) {
        return false;
      }
      protoList.push(proto);
    })).toBe(object);
    expect(protoList).toEqual([object]);
  });
});
