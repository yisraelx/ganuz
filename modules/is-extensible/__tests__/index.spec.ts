import isExtensible from '@ganuz/is-extensible';
import { describeGlobalPatch } from '../../../config/utils/jest';

describeGlobalPatch<typeof isExtensible>('isExtensible()', 'Reflect.isExtensible', '@ganuz/is-extensible', (isExtensible) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => isExtensible(undefined)).toThrow();
    expect(() => (isExtensible as any)(true)).toThrow();
  });

  it(`should return true`, () => {
    expect(isExtensible(v => v)).toBeTruthy();
    expect(isExtensible({})).toBeTruthy();
    expect(isExtensible(Object.create(null))).toBeTruthy();
  });

  it(`should return false`, () => {
    expect(isExtensible(Object.preventExtensions({}))).toBeFalsy();
    expect(isExtensible(Object.seal({}))).toBeFalsy();
    expect(isExtensible(Object.freeze({}))).toBeFalsy();
  });
});
