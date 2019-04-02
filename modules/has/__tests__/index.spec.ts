import { describeGlobalPatch } from '../../../config/utils/jest';
import has from '@ganuz/has';

describeGlobalPatch<typeof has>('has()', 'Reflect.has', '@ganuz/has', (has) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => has(null, 'foo')).toThrow();
    expect(() => (has as any)(1, 'foo')).toThrow();
  });

  it(`should return true`, () => {
    expect(has([], 'length')).toBeTruthy();
    expect(has([1], 0)).toBeTruthy();
    expect(has(Object, 'toString')).toBeTruthy();
    expect(has({foo: 'bar'}, 'foo')).toBeTruthy();
    expect(has(Object.create({foo: 'bar'}), 'foo')).toBeTruthy();
    expect(has(class {
    }, 'prototype')).toBeTruthy();
  });

  it(`should return false`, () => {
    expect(has({}, 'foo')).toBeFalsy();
    expect(has(class {
    }, 'foo')).toBeFalsy();
    expect(has(Object.create(null), 'isPrototypeOf')).toBeFalsy();
  });
});
