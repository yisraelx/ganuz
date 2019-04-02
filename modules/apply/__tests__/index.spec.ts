import apply from '@ganuz/apply';
import { describeGlobalPatch } from '../../../config/utils/jest';

describeGlobalPatch<typeof apply>('apply()', 'Reflect.apply', '@ganuz/apply', (apply) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => {
      apply(null, {foo: 'bar'}, []);
    }).toThrow();
    expect(() => {
      (apply as any)(1, {foo: 'bar'}, []);
    }).toThrow();
  });

  it(`should be throws if args is not ArrayLike`, () => {
    expect(() => {
      (apply as any)(v => v, null);
    }).toThrow();
    expect(() => {
      apply(v => v, null, 5 as any);
    }).toThrow();
  });

  it(`should apply thisArg`, () => {
    expect(apply(function () {
      return this.foo;
    }, {foo: 'bar'}, [])).toBe('bar');
  });

  it(`should apply ArrowFunction`, () => {
    (function () {
      expect(apply((key: PropertyKey) => {
        return this[key];
      }, {}, ['foo'])).toBe('bar');
    }).call({foo: 'bar'});
  });

  it(`should apply AsyncFunction`, async () => {
    expect(await apply(async function (key: PropertyKey) {
      return this[key];
    }, {foo: 'bar'}, ['foo'])).toBe('bar');
  });

  it(`should apply args Array`, () => {
    expect(apply(function (...args: string[]) {
      return args;
    }, null, ['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it(`should apply args ArrayLike`, () => {
    expect(apply(function (...args) {
      return args;
    }, null, {0: 1, 1: 2, 2: 3, length: 3})).toEqual([1, 2, 3]);
  });
});
