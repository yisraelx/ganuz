import defineMetadata from '@ganuz/define-metadata';
import getOwnMetadata from '@ganuz/get-own-metadata';

describe('getOwnMetadata()', () => {
  it(`should be a function`, () => {
    expect(getOwnMetadata).toBeFunction();
  });

  it(`should throw target primitive`, () => {
    expect(() => {
      getOwnMetadata('foo', null);
    }).toThrow();
    expect(() => {
      getOwnMetadata('foo', 45 as any);
    }).toThrow();
  });

  it(`should return property own metadata`, () => {
    let target = {};
    defineMetadata('foo', 'bar', target, 'some');
    expect(getOwnMetadata('foo', target, 'some')).toBe('bar');
  });

  it(`should return target own metadata`, () => {
    let target = {};
    defineMetadata('foo', 'bar', target);
    expect(getOwnMetadata('foo', target)).toBe('bar');
  });

  it(`should return own metadata of undefined prop and key and null value`, () => {
    let target = class {
    };
    defineMetadata('undefined', 55, target, 'undefined');
    expect(getOwnMetadata('undefined', target, 'undefined')).toBe(55);
    expect(getOwnMetadata('undefined', target)).toBeUndefined();
    defineMetadata('undefined', null, target);
    expect(getOwnMetadata('undefined', target)).toBeNull();
    expect(getOwnMetadata('undefined', target, 'undefined')).toBe(55);
  });

  it(`should return undefined if metadata not defined`, () => {
    expect(getOwnMetadata('foo', {}, 'some')).toBeUndefined();
  });

  it(`should not return proto metadata`, () => {
    let proto = Object.create(null);
    let target = Object.create(proto);

    defineMetadata('color', 'red', proto);
    expect(getOwnMetadata('color', proto)).toBe('red');
    expect(getOwnMetadata('color', target)).toBeUndefined();

    defineMetadata('color', 'green', target);
    expect(getOwnMetadata('color', proto)).toBe('red');
    expect(getOwnMetadata('color', target)).toBe('green');
  });
});
