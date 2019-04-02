import defineMetadata from '@ganuz/define-metadata';
import hasMetadata from '@ganuz/has-metadata';

describe('hasMetadata()', () => {
  it(`should be a function`, () => {
    expect(hasMetadata).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => hasMetadata('foo', null, 'some')).toThrow();
    expect(() => hasMetadata('foo', 55 as any)).toThrow();
  });

  it('should return false for not exist key', () => {
    expect(hasMetadata('foo', class {
    })).toBeFalsy();
    expect(hasMetadata('foo', class {
    }, 'some')).toBeFalsy();
    expect(hasMetadata('foo', {}, 'some')).toBeFalsy();
    expect(hasMetadata('foo', Object.create(null))).toBeFalsy();
  });

  it('should return true for non key', () => {
    class Some {
    }

    defineMetadata(null, null, Some, null);
    defineMetadata(undefined, undefined, Some, undefined);
    defineMetadata(false, false, Some, false as any);
    defineMetadata(NaN, NaN, Some);
    expect(hasMetadata(undefined, Some, undefined)).toBeTruthy();
    expect(hasMetadata(null, Some, null)).toBeTruthy();
    expect(hasMetadata(false, Some, false as any)).toBeTruthy();
    expect(hasMetadata(NaN, Some)).toBeTruthy();
  });

  it('should return true if key exist in metadata of target', () => {
    class Some {
    }

    defineMetadata('foo', 'bar', Some);
    defineMetadata('name', 'bob', Some, 'data');
    expect(hasMetadata('foo', Some)).toBeTruthy();
    expect(hasMetadata('name', Some, 'data')).toBeTruthy();
  });

  it('should return true if key exist in metadata of target prototype chain', () => {
    class Some {
    }

    defineMetadata('color', 'red', Some, 'data');

    class Other extends Some {
    }

    defineMetadata('foo', 'bar', Some);
    defineMetadata('color', 'blue', Other, 'data');
    expect(hasMetadata('foo', Some)).toBeTruthy();
    expect(hasMetadata('color', Some, 'data')).toBeTruthy();
    expect(hasMetadata('foo', Other)).toBeTruthy();
    expect(hasMetadata('color', Other, 'data')).toBeTruthy();
  });
});
