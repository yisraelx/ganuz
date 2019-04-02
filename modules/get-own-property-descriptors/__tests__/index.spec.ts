import getOwnPropertyDescriptors from '@ganuz/get-own-property-descriptors';
import { describeGlobalPatch } from '../../../config/utils/jest';

describeGlobalPatch<typeof getOwnPropertyDescriptors>('getOwnPropertyDescriptors()', 'Object.getOwnPropertyDescriptors', '@ganuz/get-own-property-descriptors', (getOwnPropertyDescriptors) => {
  it(`should be a function`, () => {
    expect(getOwnPropertyDescriptors).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => getOwnPropertyDescriptors(null)).toThrow();
    expect(() => getOwnPropertyDescriptors('foo' as any)).toThrow();
  });

  it('should return empty object for empty object', () => {
    expect(getOwnPropertyDescriptors({})).toEqual({});
  });

  it('should return target enumerable properties descriptors', () => {
    expect(getOwnPropertyDescriptors(Object.create(null, {
      foo: {value: 'bar', enumerable: false}
    }))).toEqual({
      foo: {value: 'bar', writable: false, enumerable: false, configurable: false},
    });
  });

  it('should return target symbols properties descriptors', () => {
    let fooSym = Symbol('foo');
    expect(getOwnPropertyDescriptors(Object.create(null, {
      [fooSym]: {value: 'bar', writable: true}
    }))).toEqual({
      [fooSym]: {value: 'bar', writable: true, enumerable: false, configurable: false}
    });
  });

  it('should return target properties descriptors', () => {
    expect(getOwnPropertyDescriptors(['a', 'b'])).toEqual({
      0: {value: 'a', writable: true, enumerable: true, configurable: true},
      1: {value: 'b', writable: true, enumerable: true, configurable: true},
      length: {value: 2, writable: true, enumerable: false, configurable: false}
    });

    expect(getOwnPropertyDescriptors({
      num: 34, name: 'moshe', age: 120
    })).toEqual({
      num: {value: 34, writable: true, enumerable: true, configurable: true},
      name: {value: 'moshe', writable: true, enumerable: true, configurable: true},
      age: {value: 120, writable: true, enumerable: true, configurable: true}
    });
  });

  it('should return target properties descriptors and not proto descriptors', () => {
    expect(getOwnPropertyDescriptors(Object.create({foo: 'bar'}, {
      color: {value: 'pink', enumerable: true},
      O: {get: Object, configurable: true}
    }))).toEqual({
      color: {value: 'pink', writable: false, enumerable: true, configurable: false},
      O: {get: Object, set: undefined, enumerable: false, configurable: true},
    });
  });
});
