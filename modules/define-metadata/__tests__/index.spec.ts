import defineMetadata from '@ganuz/define-metadata';
import getOwnMetadata from '@ganuz/get-own-metadata';
import hasOwnMetadata from '@ganuz/has-own-metadata';

describe('defineMetadata()', () => {
  it(`should be a function`, () => {
    expect(defineMetadata).toBeFunction();
  });

  it(`should throw if target is primitive`, () => {
    expect(() => {
      defineMetadata('foo', 'bar', null);
    }).toThrow();
    expect(() => {
      defineMetadata('foo', 'bar', true as any);
    }).toThrow();
  });

  it(`should define metadata`, () => {
    let target = {};
    defineMetadata('foo', 'bar', target, 'some');
    expect(getOwnMetadata('foo', target, 'some')).toBe('bar');
  });

  it(`should define target metadata`, () => {
    let target = {};
    let data = {foo: 'bar'};
    defineMetadata('some', data, target);
    expect(getOwnMetadata('some', target)).toBe(data);
  });

  it(`should define undefined metadata`, () => {
    let target = class {
    };
    defineMetadata('undefined', undefined, target);
    expect(hasOwnMetadata('undefined', target)).toBeTruthy();
    expect(getOwnMetadata('undefined', target)).toBeUndefined();
  });

  it(`should overwrite the exist target metadata`, () => {
    let target = {};
    let property = Symbol('prop');

    expect(getOwnMetadata(String, target, property)).toBeUndefined();
    defineMetadata(String, 'car', target, property);
    expect(getOwnMetadata(String, target, property)).toBe('car');
    defineMetadata(String, 'beer', target, property);
    expect(getOwnMetadata(String, target, property)).toBe('beer');
  });

  it(`should define metadata on prototype chain`, () => {
    let proto = Object.create(null);
    let target = Object.create(proto);
    defineMetadata('color', 'red', proto);
    defineMetadata('color', 'green', target);
    expect(getOwnMetadata('color', proto)).toBe('red');
    expect(getOwnMetadata('color', target)).toBe('green');
  });
});
