import { describeGlobalPatch } from '../../../config/utils/jest';
import setPrototypeOf from '@ganuz/set-prototype-of';

describeGlobalPatch<typeof setPrototypeOf>('setPrototypeOf()', 'Reflect.setPrototypeOf', '@ganuz/set-prototype-of', (setPrototypeOf) => {
  it('should throw if target is primitive', () => {
    expect(() => setPrototypeOf(null, {})).toThrow();
    expect(() => setPrototypeOf(55 as any, {})).toThrow();
  });

  it('should throw if proto is not object or null or proto', () => {
    expect(() => setPrototypeOf({}, undefined)).toThrow();
    expect(() => setPrototypeOf(class {
    }, 'foo' as any)).toThrow();
  });

  it('should not set proto on freeze object', () => {
    let object = Object.freeze({});
    expect(setPrototypeOf(object, null)).toBeFalsy();
    expect(Object.getPrototypeOf(object)).toBe(Object.prototype);
  });

  it('should set proto to plain object and return true', () => {
    let object = {};
    expect(setPrototypeOf(object, null)).toBeTruthy();
    expect(Object.getPrototypeOf(object)).toBeNull();
  });

  it('should set to class and instance proto and return true', () => {
    class Some {
    }

    class Other {
    }

    let instance = new Other();
    expect(setPrototypeOf(Other, Some)).toBeTruthy();
    expect(setPrototypeOf(instance, null)).toBeTruthy();

    expect(Object.getPrototypeOf(Some)).toBe(Function.prototype);
    expect(Object.getPrototypeOf(Other)).toBe(Some);
    expect(Object.getPrototypeOf(Other.prototype)).toBe(Object.prototype);
    expect(Object.getPrototypeOf(instance)).toBeNull();
  });
});
