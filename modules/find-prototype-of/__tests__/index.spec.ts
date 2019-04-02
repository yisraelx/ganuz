import findPrototypeOf from '../';

describe(`findPrototypeOf()`, () => {
  it(`should be a function`, () => {
    expect(findPrototypeOf).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => findPrototypeOf(null, () => {
    })).toThrow();
    expect(() => findPrototypeOf('foo' as any, () => {
    })).toThrow();
  });

  it('should throw if callback is not function', () => {
    expect(() => findPrototypeOf({}, null)).toThrow();
  });

  it('should return the null', () => {
    expect(findPrototypeOf({}, () => false)).toBeNull();
  });

  it('should return the first proto', () => {
    let proto = {name: 'bob'};
    let object = Object.create(proto, {name: {value: 'alice'}});
    expect(findPrototypeOf(object, (proto) => proto.hasOwnProperty('name'))).toBe(object);
  });

  it('should return the proto if callback invokes return true', () => {
    let a = {num: 1};
    let b = Object.create(a, {foo: {value: 'bar'}});
    let c = Object.create(b, {num: {value: 55}});

    expect(findPrototypeOf(c, (proto) => proto.hasOwnProperty('foo'))).toBe(b);
    expect(findPrototypeOf(c, (proto: any) => proto.num === 1)).toBe(b);
    expect(findPrototypeOf(b, (proto: any) => proto.hasOwnProperty('num'))).toBe(a);
    expect(findPrototypeOf(c, (proto: any) => proto.hasOwnProperty('color'))).toBeNull();
  });
});
