import cloneWith from '../';

describe(`cloneWith()`, () => {
  it(`should be a function`, () => {
    expect(cloneWith).toBeFunction();
  });

  it('should throw if target is not object', () => {
    expect(() => cloneWith(null, () => {
    })).toThrow();
    expect(() => cloneWith(1.5 as any, () => {
    })).toThrow();
  });

  it('should throw if callback is not function', () => {
    expect(() => cloneWith({}, undefined)).toThrow();
    expect(() => cloneWith({}, NaN as any)).toThrow();
  });

  it('should clone target and return the clone', () => {
    let target = {
      get color() {
        return 'green';
      },
      [Symbol('foo')]: 'bar',
      fn() {
      }
    };
    let cloneTarget = cloneWith(target, (descriptor => descriptor));
    expect(cloneTarget).not.toBe(target);
    expect(cloneTarget).toBeInstanceOf(Object);
    expect(Object.getPrototypeOf(cloneTarget)).toBe(Object.prototype);
    expect(Object.getOwnPropertyDescriptors(cloneTarget)).toEqual(Object.getOwnPropertyDescriptors(target));
    expect(cloneTarget).toEqual(target);
  });

  it('should define the target descriptor if callback invokes return void', () => {
    let target = Object.create(null, {[Symbol('foo')]: {value: 'bar', writable: true}});
    let cloneTarget = cloneWith(target, () => {
    });

    expect(cloneTarget).not.toBe(target);
    expect(Object.getPrototypeOf(cloneTarget)).toBeNull();
    expect(Object.getOwnPropertyDescriptors(cloneTarget)).toEqual(Object.getOwnPropertyDescriptors(target));
    expect(cloneTarget).toEqual(target);
  });

  it('should throw if callback invokes not return void or valid property descriptor', () => {
    expect(() => cloneWith({foo: 'bar'}, () => 55 as any)).toThrow();
    expect(() => cloneWith({foo: 'bar'}, () => null)).toThrow();
    expect(() => cloneWith({foo: 'bar'}, () => ({
      value: 'bob', get() {
      }
    }))).toThrow();
  });

  it('should clone only own properties', () => {
    let proto = {foo: 'bar'};
    let target = Object.setPrototypeOf({prop: 'some'}, proto);
    let cloneTarget = cloneWith(target, descriptor => descriptor);

    expect(cloneTarget).not.toBe(target);
    expect(Object.getPrototypeOf(cloneTarget)).toBe(proto);
    expect(Object.getOwnPropertyDescriptors(cloneTarget)).toEqual(Object.getOwnPropertyDescriptors(target));
    expect(cloneTarget).toEqual(target);
  });
});
