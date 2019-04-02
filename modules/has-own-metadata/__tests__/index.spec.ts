import defineMetadata from '@ganuz/define-metadata';
import hasOwnMetadata from '@ganuz/has-own-metadata';

describe('hasOwnMetadata()', () => {
  it(`should be a function`, () => {
    expect(hasOwnMetadata).toBeFunction();
  });

  it(`should throw if target is primitive`, () => {
    expect(() => hasOwnMetadata('foo', null)).toThrow();
    expect(() => hasOwnMetadata('foo', true as any)).toThrow();
  });

  it(`should return true if has own metadata`, () => {
    let target = {};
    defineMetadata('foo', 'bar', target, 'some');
    expect(hasOwnMetadata('foo', target, 'some')).toBeTruthy();
  });

  it(`should return true if target own metadata`, () => {
    let target = {};
    defineMetadata('foo', 'bar', target);
    expect(hasOwnMetadata('foo', target)).toBeTruthy();
  });

  it(`should return true if target own null metadata`, () => {
    let target = {};
    defineMetadata('undefined', null, target, 'undefined');
    expect(hasOwnMetadata('undefined', target, 'undefined')).toBeTruthy();
  });

  it(`should return false if metadata not exist`, () => {
    expect(hasOwnMetadata('foo', class {
    }, 'some')).toBeFalsy();
  });

  it(`should return false if not own metadata`, () => {
    let proto = Object.create(null);
    let target = Object.create(proto);
    defineMetadata('foo', 'bar', proto, 'some');
    expect(hasOwnMetadata('foo', target, 'some')).toBeFalsy();
  });
});
