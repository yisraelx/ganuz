import defineMetadata from '@ganuz/define-metadata';
import getMetadata from '@ganuz/get-metadata';

describe('getMetadata()', () => {
  it(`should be a function`, () => {
    expect(getMetadata).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => getMetadata('foo', null)).toThrow();
    expect(() => getMetadata('foo', NaN as any, 'some')).toThrow();
  });

  it('should return undefined for not exist key', () => {
    expect(getMetadata('foo', class {
    })).toBeUndefined();
    expect(getMetadata('foo', {}, 'some')).toBeUndefined();
  });

  it('should return nil data', () => {
    class Some {
    }

    defineMetadata(null, null, Some, null);
    defineMetadata(undefined, undefined, Some, undefined);
    expect(getMetadata(undefined, Some, undefined)).toBeUndefined();
    expect(getMetadata(null, Some, null)).toBeNull();
  });

  it('should return target metadata', () => {
    class Some {
    }

    defineMetadata(Function, Some, Some);
    defineMetadata(Number, 1248, Some, Symbol.for('1248'));
    expect(getMetadata(Number, Some)).toBeUndefined();
    expect(getMetadata(Number, Some, Symbol.for('1248'))).toBe(1248);
    expect(getMetadata(Function, Some)).toBe(Some);
  });

  it('should return prototype chain metadata ', () => {
    let some = Object.create(null);
    let colorSym = Symbol('color');
    defineMetadata(Number, 5, some, 'some');
    let other = Object.create(some);
    defineMetadata(colorSym, 'green', other);
    defineMetadata(colorSym, 'red', some);
    defineMetadata('foo', 'bar', other, 'some');

    expect(getMetadata(Number, some, 'some')).toBe(5);
    expect(getMetadata(colorSym, some)).toBe('red');
    expect(getMetadata('foo', some, 'some')).toBeUndefined();
    expect(getMetadata(Number, other, 'some')).toBe(5);
    expect(getMetadata(colorSym, other)).toBe('green');
    expect(getMetadata('foo', other, 'some')).toBe('bar');

    defineMetadata('foo', 'bob', some, 'some');
    expect(getMetadata('foo', some, 'some')).toBe('bob');
    expect(getMetadata('foo', other, 'some')).toBe('bar');
  });
});
