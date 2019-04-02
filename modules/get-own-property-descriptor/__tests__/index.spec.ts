import { describeGlobalPatch } from '../../../config/utils/jest';
import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';

describeGlobalPatch<typeof getOwnPropertyDescriptor>('getOwnPropertyDescriptor()', 'Reflect.getOwnPropertyDescriptor', '@ganuz/get-own-property-descriptor', (getOwnPropertyDescriptor) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => {
      getOwnPropertyDescriptor(null, 'foo');
    }).toThrow();
    expect(() => {
      (getOwnPropertyDescriptor as any)(1, 'foo');
    }).toThrow();
  });

  it(`should return property descriptor`, () => {
    expect(getOwnPropertyDescriptor(Object.create(null, {
      foo: {
        value: 'bar',
        enumerable: true
      }
    }), 'foo')).toEqual({
      enumerable: true,
      configurable: false,
      writable: false,
      value: 'bar'
    });
  });

  it(`should return undefined if property not exist`, () => {
    expect(getOwnPropertyDescriptor({}, 'foo')).toBeUndefined();
  });

  it(`should return undefined if target not own the property`, () => {
    expect(getOwnPropertyDescriptor(Object.create({foo: 'bar'}), 'foo')).toBeUndefined();
  });
});
