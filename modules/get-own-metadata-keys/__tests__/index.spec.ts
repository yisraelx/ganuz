import defineMetadata from '@ganuz/define-metadata';
import getOwnMetadataKeys from '@ganuz/get-own-metadata-keys';

describe('getOwnMetadataKeys()', () => {
  it(`should be a function`, () => {
    expect(getOwnMetadataKeys).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => getOwnMetadataKeys(null)).toThrow();
    expect(() => getOwnMetadataKeys(34 as any)).toThrow();
  });

  it(`should return metadata keys array`, () => {
    let target = {};
    defineMetadata('a', 1, target, 'some');
    defineMetadata(2, 'b', target, 'some');
    defineMetadata(Function, Object, target, 'some');
    expect(getOwnMetadataKeys(target, 'some')).toEqual(['a', 2, Function]);
  });

  it(`should return target metadata keys array`, () => {
    let target = class {
    };
    defineMetadata(false, true, target);
    defineMetadata(0, 1, target);
    defineMetadata(null, undefined, target);
    expect(getOwnMetadataKeys(target)).toEqual([false, 0, null]);
  });

  it(`should return metadata empty array`, () => {
    expect(getOwnMetadataKeys({})).toEqual([]);
  });

  it(`should return metadata target metadata keys without proto metadata keys`, () => {
    class A {
    }

    class B extends A {
    }

    defineMetadata('name', 'bob', A);
    defineMetadata('color', 'blue', A);
    defineMetadata('name', 'alice', B);
    defineMetadata('foo', 'bar', B);
    expect(getOwnMetadataKeys(A)).toEqual(['name', 'color']);
    expect(getOwnMetadataKeys(B)).toEqual(['name', 'foo']);
  });
});
