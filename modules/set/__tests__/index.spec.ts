import { describeGlobalPatch } from '../../../config/utils/jest';
import set from '@ganuz/set';

describeGlobalPatch<typeof set>('set()', 'Reflect.set', '@ganuz/set', (set) => {
  it('should throw if target is primitive', () => {
    expect(() => set(null, 'foo', 'bar')).toThrow();
    expect(() => set(-89 as any, 'foo', 'bar')).toThrow();
  });

  it('should set value to key and return true', () => {
    let object: any = {};
    expect(set(object, 'foo', 'bar')).toBeTruthy();
    expect(object.foo).toBe('bar');
  });

  it('should not set value to key if target is freeze object and return false', () => {
    let object: any = Object.freeze({});
    let other = {};
    expect(set(object, 'foo', 'bar')).toBeFalsy();
    expect('foo' in object).toBeFalsy();
    expect('foo' in other).toBeFalsy();
  });

  it('should not set value to key if target non-writable property and return false', () => {
    let object: any = Object.create({}, {color: {value: 'red'}});
    let other: any = {};
    expect(set(object, 'color', 'blue')).toBeFalsy();
    expect(set(object, 'color', 'blue', other)).toBeFalsy();
    expect(object.color).toBe('red');
    expect('color' in other).toBeFalsy();
  });

  it('should not set value to key if target non-writable property of the object proto and return false', () => {
    let object: any = Object.create(Object.create({}, {color: {value: 'red'}}));
    let other: any = {};
    expect(set(object, 'color', 'blue')).toBeFalsy();
    expect(set(object, 'color', 'blue', other)).toBeFalsy();
    expect(object.hasOwnProperty('color')).toBeFalsy();
    expect(object.color).toBe('red');
    expect('color' in other).toBeFalsy();
  });

  it('should set value with setter return true', () => {
    let object: any = {
      set color(color) {
        this._color = color;
      }
    };
    expect(set(object, 'color', 'red')).toBeTruthy();
    expect(object._color).toBe('red');
  });

  it('should not set value if object have only getter method and return false', () => {
    let object: any = {
      get color() {
        return this._color;
      }
    };
    let other = {};
    expect(set(object, 'color', 'red')).toBeFalsy();
    expect(set(object, 'color', 'red', other)).toBeFalsy();
    expect(typeof Object.getOwnPropertyDescriptor(object, 'color').get).toBe('function');
    expect(object.color).toBeUndefined();
    expect('color' in other).toBeFalsy();
  });

  it('should throw if target setter is throw', () => {
    expect(() => set({
      set foo(bar) {
        throw Error();
      }
    }, 'foo', 'bar')).toThrow();
  });

  it('should set value to key of target if is freeze object and return false', () => {
    let object: any = Object.freeze({});
    let other: any = {};
    expect(set(object, 'foo', 'bar', other)).toBeTruthy();
    expect('foo' in object).toBeFalsy();
    expect(other.foo).toBe('bar');
  });

  it('should not set value to key if receiver is freeze object and return false', () => {
    let object: any = {};
    let other = Object.freeze({});
    expect(set(object, 'foo', 'bar', other)).toBeFalsy();
    expect('foo' in object).toBeFalsy();
    expect('foo' in other).toBeFalsy();
  });

  it('should not set value to key if receiver property is non-writable and return false', () => {
    let object: any = {};
    let other: any = Object.create({}, {color: {value: 'red'}});
    expect(set(object, 'color', 'blue', other)).toBeFalsy();
    expect('color' in object).toBeFalsy();
    expect(other.color).toBe('red');
  });

  it('should set value to key if property of receiver proto is non-writable and return true', () => {
    let object: any = {};
    let other: any = Object.create(Object.create({}, {color: {value: 'red'}}));
    expect(set(object, 'color', 'pink', other)).toBeTruthy();
    expect('color' in object).toBeFalsy();
    expect(other.hasOwnProperty('color')).toBeTruthy();
    expect(other.color).toBe('pink');
  });

  it('should not set value if receiver have getter or setter or non-writable props and return true', () => {
    expect(set({}, 'color', 'red', {
      get color() {
        return this._color;
      }
    })).toBeFalsy();
    expect(set({}, 'color', 'red', {
      set color(color) {
        this._color = color;
      }
    })).toBeFalsy();
    expect(set({}, 'color', 'red', Object.create({}, {
      color: {
        value: 'green'
      }
    }))).toBeFalsy();
  });
});
