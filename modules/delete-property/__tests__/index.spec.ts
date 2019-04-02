import deleteProperty from '@ganuz/delete-property';
import { describeGlobalPatch } from '../../../config/utils/jest';

describeGlobalPatch<typeof deleteProperty>('deleteProperty()', 'Reflect.deleteProperty', '@ganuz/delete-property', (deleteProperty) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => {
      deleteProperty(null, 'foo');
    }).toThrow();
    expect(() => {
      (deleteProperty as any)(1, 'foo');
    }).toThrow();
  });

  it(`should delete property from object and return true`, () => {
    let object = {foo: 'bar'};
    expect(deleteProperty(object, 'foo')).toBeTruthy();
    expect(object.foo).toBeUndefined();
  });

  it(`should delete non exist property from object and return true`, () => {
    let object: any = {foo: 'bar'};
    expect(deleteProperty(object, 'color')).toBeTruthy();
    expect(object.foo).toBe('bar');
    expect(object.color).toBeUndefined();
  });

  it(`should delete item from array and return true`, () => {
    let array = [0, 1, 2, 3];
    expect(deleteProperty(array, 1)).toBeTruthy();
    expect(array[1]).toBeUndefined();
  });

  it(`should not delete property from object proto and return true`, () => {
    let object = Object.create({foo: 'bar'});
    expect(deleteProperty(object, 'foo')).toBeTruthy();
    expect(object.foo).toBe('bar');
  });

  it(`should not delete non-writable property and return false`, () => {
    let object = Object.create({}, {foo: {value: 'bar'}});
    expect(deleteProperty(object, 'foo')).toBeFalsy();
    expect(object.foo).toBe('bar');
  });

  it(`should not delete property from seal object and return false`, () => {
    let object = Object.seal({foo: 'bar'});
    expect(deleteProperty(object, 'foo')).toBeFalsy();
    expect(object.foo).toBe('bar');
  });

  it(`should not delete property from freeze object and return false`, () => {
    let object = Object.freeze({foo: 'bar'});
    expect(deleteProperty(object, 'foo')).toBeFalsy();
    expect(object.foo).toBe('bar');
  });
});
