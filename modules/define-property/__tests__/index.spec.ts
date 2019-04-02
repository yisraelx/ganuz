import { describeGlobalPatch } from '../../../config/utils/jest';
import defineProperty from '@ganuz/define-property';

describeGlobalPatch<typeof defineProperty>('defineProperty()', 'Reflect.defineProperty', '@ganuz/define-property', (defineProperty) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => {
      defineProperty(null, 'foo', {value: 'bar'});
    }).toThrow();
    expect(() => {
      (defineProperty as any)(1, 'foo', {value: 'bar'});
    }).toThrow();
  });

  it(`should be throws if descriptor is primitive`, () => {
    expect(() => {
      defineProperty({}, 'foo', null);
    }).toThrow();
    expect(() => {
      (defineProperty as any)({}, 'foo', 5);
    }).toThrow();
  });

  it(`should define property and return true`, () => {
    let object = {color: 'red'};
    expect(defineProperty(object, 'foo', {value: 'bar', enumerable: true})).toBeTruthy();
    expect(object).toEqual({color: 'red', foo: 'bar'});
    expect(Object.getOwnPropertyDescriptor(object, 'foo')).toEqual({
      value: 'bar',
      enumerable: true,
      writable: false,
      configurable: false
    });
  });

  it(`should not define property on freeze object`, () => {
    let object = Object.freeze({color: 'red'});
    expect(defineProperty(object, 'foo', {value: 'bar', enumerable: true})).toBeFalsy();
    expect(defineProperty(object, 'color', {value: 'blue', enumerable: true})).toBeFalsy();
    expect(defineProperty(object, 'color', {value: 'red', enumerable: true})).toBeTruthy();
    expect(defineProperty(object, 'color', {})).toBeTruthy();
    expect(object).toEqual({color: 'red'});
    expect(Object.getOwnPropertyDescriptor(object, 'foo')).toBeUndefined();
  });

  it('should return true if property is non-writable and non-configurable and the new descriptor is equal to the current descriptor', () => {
    let object = Object.create({}, {foo: {value: 'bar', enumerable: true}});
    expect(defineProperty(object, 'foo', {value: 'bar'})).toBeTruthy();
    expect(defineProperty(object, 'foo', {enumerable: true, writable: false})).toBeTruthy();
    expect(defineProperty(object, 'foo', {configurable: false})).toBeTruthy();
    expect(defineProperty(object, 'foo', {})).toBeTruthy();
  });

  it(`should not define property on non-writable property and return false`, () => {
    let object = {color: 'red'};
    let fooSymbol = Symbol('foo');

    expect(defineProperty(object, fooSymbol, {value: 'bar'})).toBeTruthy();
    expect(defineProperty(object, fooSymbol, {value: 'bob'})).toBeFalsy();
    expect(defineProperty(object, fooSymbol, {value: 'bar'})).toBeTruthy();
    expect(object).toEqual({color: 'red'});
    expect(Object.getOwnPropertyDescriptor(object, fooSymbol)).toEqual({
      value: 'bar',
      enumerable: false,
      writable: false,
      configurable: false
    });
  });
});
