import { describeGlobalPatch } from '../../../config/utils/jest';
import get from '@ganuz/get';

describeGlobalPatch<typeof get>('get()', 'Reflect.get', '@ganuz/get', (get) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => {
      get(null, 'foo');
    }).toThrow();
    expect(() => {
      (get as any)(1, 'foo');
    }).toThrow();
  });

  it(`should return value if property exist`, () => {
    expect(get({foo: 'bar'}, 'foo')).toBe('bar');
  });

  it(`should return non value if property value is nil`, () => {
    expect(get({null: null}, null)).toBeNull();
    expect(get({undefined: undefined}, undefined)).toBeUndefined();
    expect(get({0: 0}, 0)).toBe(0);
    expect(get({NaN: NaN}, NaN)).toBeNaN();
    expect(get({false: false}, false as any)).toBeFalsy();
  });

  it(`should return undefined if property not exist`, () => {
    expect(get({}, 'foo')).toBeUndefined();
  });

  it(`should return property getter value`, () => {
    expect(get({
      get foo() {
        return 'bar';
      }
    }, 'foo')).toBe('bar');
  });

  it(`should return property getter value with receiver`, () => {
    expect(get({
      get name() {
        return this._name;
      },
      _name: 'bob'
    }, 'name', {_name: 'alice'})).toBe('alice');
  });

  it(`should return property getter value with nil receiver`, () => {
    expect(get({
      get type() {
        return typeof this;
      }
    }, 'type', undefined)).toBe('undefined');
  });

  it(`should return property getter value with primitive receiver`, () => {
    expect(get({
      get str() {
        return this.toString();
      },
      toString() {
        return 'str';
      }
    }, 'str', 1)).toBe('1');
  });

  it('should return undefined if target have only setter', () => {
    let object = {
      set a(a) {

      }
    };
    expect(get(object, 'a')).toBeUndefined();
    expect(get(object, 'a', {})).toBeUndefined();
  });
});
