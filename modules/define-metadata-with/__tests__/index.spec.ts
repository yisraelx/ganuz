import getOwnMetadata from '@ganuz/get-own-metadata';
import defineMetadataWith from '../';

describe('', () => {
  it(`should be a function`, () => {
    expect(defineMetadataWith).toBeFunction();
  });

  it('should throw if target is not object', () => {
    expect(() => defineMetadataWith('key', 'value', () => {
    }, null)).toThrow();
    expect(() => defineMetadataWith('key', 'value', () => {
    }, 56 as any, 'prop')).toThrow();
  });

  it('should throw if callback is not function', () => {
    expect(() => defineMetadataWith('key', 'value', {} as any, {})).toThrow();
    expect(() => defineMetadataWith('key', 'value', undefined, class {
    }, 'prop')).toThrow();
  });

  it('should define metadata', () => {
    let target = {};

    defineMetadataWith(Function, Object, (o, n) => n, target);
    expect(getOwnMetadata(Function, target)).toBe(Object);
  });

  it('should invokes the callback with the own current metadata', () => {
    let target = class {
    };
    let propSym = Symbol('prop');
    let keySym = Symbol('numbers');
    let value = [0, 1];
    defineMetadataWith(keySym, value, (o, n) => n, target, propSym);

    let metadata = getOwnMetadata(keySym, target, propSym);
    expect(metadata).toBe(value);
    expect(metadata).toEqual([0, 1]);
    defineMetadataWith(keySym, [2, 3], (o, n) => (o.push(...n), o), target, propSym);

    let metadata2 = getOwnMetadata(keySym, target, propSym);
    expect(metadata2).toBe(metadata);
    expect(metadata2).toEqual([0, 1, 2, 3]);
  });

  it('should define the given metadata value if callback invokes return void', () => {
    let target = {};

    defineMetadataWith('color', 'red', () => {
    }, target);
    expect(getOwnMetadata('color', target)).toBe('red');
  });

});
