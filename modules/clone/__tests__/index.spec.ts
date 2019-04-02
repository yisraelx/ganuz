import clone from '../';

describe(`clone()`, () => {
  it(`should be a function`, () => {
    expect(clone).toBeFunction();
  });

  it('should throw if target is not object', () => {
    expect(() => clone(null)).toThrow();
    expect(() => clone(true as any)).toThrow();
  });

  it('should define target properties to the clone target', () => {
    const colorSym: unique symbol = Symbol('color');
    let target = Object.create(null, {
      data: {value: {foo: 'bar'}, enumerable: true},
      num: {value: 67.5, writable: true},
      fn: {
        value() {
        }, configurable: true
      },
      [colorSym]: {
        get() {
          return 'pink';
        }
      }
    });
    let cloneTarget = clone(target);
    expect(target).not.toBe(cloneTarget);
    expect(Object.getPrototypeOf(cloneTarget)).toBeNull();
    expect(Object.prototype.isPrototypeOf.call(target, cloneTarget)).toBeFalsy();
    let targetDescriptors: PropertyDescriptorMap = Object.getOwnPropertyDescriptors(target);
    let cloneDescriptors: PropertyDescriptorMap = Object.getOwnPropertyDescriptors(cloneTarget);
    expect(cloneDescriptors).toEqual(targetDescriptors);
    expect(cloneTarget['data']).toBe(target['data']);
    expect(cloneTarget['fn']).toBe(target['fn']);
    expect(cloneDescriptors[colorSym as any].get).toBe(targetDescriptors[colorSym as any].get);
  });

  it('should set to target proto to the clone target', () => {
    class Some {
      color = 'yellow';

      doSome() {
      }
    }

    class Other extends Some {
      color = 'red';

      doOther() {
      }
    }

    let some = new Some();
    let other = new Other();

    let cloneSome = clone(some);
    let cloneOther = clone(other);

    expect(cloneSome).toBeInstanceOf(Some);
    expect(cloneSome.constructor).toBe(Some);
    expect(cloneSome).not.toBe(some);
    expect(cloneSome).toEqual(some);
    expect(Object.getPrototypeOf(cloneSome)).toBe(Some.prototype);
    expect(Object.getOwnPropertyNames(cloneSome)).toEqual(['color']);

    expect(cloneOther).toBeInstanceOf(Other);
    expect(cloneOther).toBeInstanceOf(Some);
    expect(cloneOther.constructor).toBe(Other);
    expect(cloneOther).not.toBe(other);
    expect(cloneOther).toEqual(other);
    expect(Object.getPrototypeOf(cloneOther)).toBe(Other.prototype);
    expect(Object.getOwnPropertyNames(cloneOther)).toEqual(['color']);
  });
});
