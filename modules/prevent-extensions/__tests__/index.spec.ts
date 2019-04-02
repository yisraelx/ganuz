import { describeGlobalPatch } from '../../../config/utils/jest';
import preventExtensions from '@ganuz/prevent-extensions';

describeGlobalPatch<typeof preventExtensions>('preventExtensions()', 'Reflect.preventExtensions', '@ganuz/prevent-extensions', (preventExtensions) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => {
      preventExtensions(undefined);
    }).toThrow();
    expect(() => {
      (preventExtensions as any)(false);
    }).toThrow();
  });

  it(`should prevent extensions`, () => {
    'use strict';
    let object: any = {color: 'red'};
    expect(preventExtensions(object)).toBeTruthy();
    expect(() => {
      object.foo = 'bar';
    }).toThrow();
    expect(object).toEqual({color: 'red'});
  });
});
