import { describeGlobalPatch } from '../../../config/utils/jest';
import getPrototypeOf from '@ganuz/get-prototype-of';

describeGlobalPatch<typeof getPrototypeOf>('getPrototypeOf()', 'Reflect.getPrototypeOf', '@ganuz/get-prototype-of', (getPrototypeOf) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => {
      getPrototypeOf(null);
    }).toThrow();
    expect(() => {
      (getPrototypeOf as any)(1);
    }).toThrow();
  });

  it(`should get object prototype`, () => {
    expect(getPrototypeOf({foo: 'bar'})).toBe(Object.prototype);
    expect(getPrototypeOf(Object.create({foo: 'bar'}))).toEqual({foo: 'bar'});
  });

  it(`should get null prototype`, () => {
    expect(getPrototypeOf(Object.create(null))).toBeNull();
  });

  it(`should get primitive object prototype`, () => {
    expect(getPrototypeOf(Object('foo'))).toBe(String.prototype);
  });
});
