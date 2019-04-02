import defineMetadata from '@ganuz/define-metadata';
import hasOwnMetadata from '@ganuz/has-own-metadata';
import deleteMetadata from '@ganuz/delete-metadata';

describe('deleteMetadata()', () => {
  it(`should be a function`, () => {
    expect(deleteMetadata).toBeFunction();
  });

  it(`should throw if target is primitive`, () => {
    expect(() => deleteMetadata('some', null)).toThrow();
    expect(() => deleteMetadata('some', 'foo' as any)).toThrow();
  });

  it(`should delete metadata and return true`, () => {
    let target = {};
    defineMetadata('foo', 'bar', target, 'some');
    expect(deleteMetadata('foo', target, 'some')).toBeTruthy();
    expect(hasOwnMetadata('foo', target, 'some')).toBeFalsy();
  });

  it(`should  delete target metadata and return true`, () => {
    let target = {};
    defineMetadata('foo', 'bar', target);
    expect(deleteMetadata('foo', target)).toBeTruthy();
    expect(hasOwnMetadata('foo', target)).toBeFalsy();
  });

  it(`should delete null metadata and return true`, () => {
    let target = {};
    defineMetadata(undefined, null, target);
    expect(deleteMetadata(undefined, target)).toBeTruthy();
    expect(hasOwnMetadata(undefined, target)).toBeFalsy();
  });

  it(`should not delete not exist metadata and return false`, () => {
    expect(deleteMetadata('foo', class {
    })).toBeFalsy();
  });

  it(`should not delete proto metadata and return false`, () => {
    let proto = {};
    let target = Object.create(proto);

    defineMetadata('color', 'red', proto);
    expect(deleteMetadata('color', target)).toBeFalsy();
    expect(hasOwnMetadata('color', proto)).toBeTruthy();
    defineMetadata('color', 'green', target);
    expect(deleteMetadata('color', target)).toBeTruthy();
    expect(hasOwnMetadata('color', proto)).toBeTruthy();
  });
});
