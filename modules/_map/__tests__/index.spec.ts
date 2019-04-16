import { describeGlobalPatch } from '../../../config/utils/jest';

describeGlobalPatch(`_Map()`, `Map`, `@ganuz/_map`, (_Map: typeof Map) => {
  it(`should be a function`, () => {
    expect(_Map).toBeFunction();
  });

  it('should return undefined if entry not exists', () => {
    expect(new _Map().get('key')).toBeUndefined();
    expect(new _Map().get(NaN)).toBeUndefined();
  });

  it('should set and get primitive entry', () => {
    let map = new _Map();
    map.set(1, 'a');

    expect(map.get(1)).toBe('a');
  });

  it('should set and get object entry', () => {
    let map = new _Map();
    map.set(Math, 'num');

    expect(map.get(Math)).toBe('num');
  });

  it('should set and get NaN entry', () => {
    let map = new _Map();
    map.set(NaN, Number);

    expect(map.get(NaN)).toBe(Number);
  });

  it('should set and get multiply entries', () => {
    let map = new _Map();

    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);

    expect(map.get('a')).toBe(1);
    expect(map.get('b')).toBe(2);
    expect(map.get('c')).toBe(3);
  });

  it('should delete entry', () => {
    let map = new _Map();
    map.set('foo', 'bar');
    expect(map.get('foo')).toBe('bar');
    map.delete('foo');
    expect(map.get('foo')).toBeUndefined();
  });

  it('should delete single NaN entry', () => {
    let map = new _Map();
    map.set(NaN, Number);
    expect(map.get(NaN)).toBe(Number);
    map.delete(NaN);
    expect(map.get(NaN)).toBeUndefined();
  });

  it('should delete NaN entry', () => {
    let map = new _Map();
    map.set(0, 1).set(NaN, 7).set(Object, Object);

    expect(map.get(NaN)).toBe(7);
    expect(map.get(0)).toBe(1);
    expect(map.get(Object)).toBe(Object);

    expect(map.delete(NaN)).toBeTruthy();
    expect(map.get(NaN)).toBeUndefined();
    expect(map.delete(NaN)).toBeFalsy();

    expect(map.get(0)).toBe(1);
    expect(map.get(Object)).toBe(Object);
  });

  it('should set value and override current value', () => {
    let map = new _Map();
    map.set(NaN, 5);
    map.set(Object, Function);
    map.set('foo', 'bar');
    map.set(true, false);

    expect(map.get(NaN)).toBe(5);
    expect(map.get(Object)).toBe(Function);
    expect(map.get('foo')).toBe('bar');
    expect(map.get(true)).toBe(false);

    map.set(Object, null);
    expect(map.get(NaN)).toBe(5);
    expect(map.get(Object)).toBe(null);
    expect(map.get('foo')).toBe('bar');
    expect(map.get(true)).toBe(false);

    map.set(true, 1);
    map.set(NaN, -99);
    expect(map.get(NaN)).toBe(-99);
    expect(map.get(Object)).toBe(null);
    expect(map.get('foo')).toBe('bar');
    expect(map.get(true)).toBe(1);

    map.set('name', 'bob');
    map.set(Object, Array);
    map.set(NaN, Infinity);
    map.set(true, -1);
    expect(map.get('name')).toBe('bob');
    expect(map.get(NaN)).toBe(Infinity);
    expect(map.get(Object)).toBe(Array);
    expect(map.get('foo')).toBe('bar');
    expect(map.get(true)).toBe(-1);
  });

  it('should set two keys and delete them', () => {
    let map = new _Map();
    map.set('a', 1);
    map.set('b', 2);

    expect(map.get('a')).toBe(1);
    expect(map.get('b')).toBe(2);
    expect(map.delete('a')).toBeTruthy();
    expect(map.delete('b')).toBeTruthy();
    expect(map.get('a')).toBeUndefined();
    expect(map.get('b')).toBeUndefined();
    expect(map.get('undefined')).toBeUndefined();
    expect(map.get(undefined)).toBeUndefined();
    expect(map.delete('a')).toBeFalsy();
    expect(map.delete('b')).toBeFalsy();
  });

  it('should set multiply entries and delete them in order', () => {
    let map = new _Map();
    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);

    expect(map.get('a')).toBe(1);
    expect(map.get('b')).toBe(2);
    expect(map.get('c')).toBe(3);
    expect(map.delete('a')).toBeTruthy();
    expect(map.delete('b')).toBeTruthy();
    expect(map.delete('c')).toBeTruthy();
    expect(map.get('a')).toBeUndefined();
    expect(map.get('b')).toBeUndefined();
    expect(map.get('c')).toBeUndefined();
    expect(map.get('undefined')).toBeUndefined();
    expect(map.get(undefined)).toBeUndefined();
    expect(map.delete('a')).toBeFalsy();
    expect(map.delete('b')).toBeFalsy();
    expect(map.delete('c')).toBeFalsy();
  });

  it('should set multiply entries and delete them in non-order', () => {
    let map = new _Map();
    map.set('b', 2);
    map.set('c', 3);
    map.set('d', 4);
    map.set('a', 1);

    expect(map.get('b')).toBe(2);
    expect(map.get('d')).toBe(4);
    expect(map.get('c')).toBe(3);
    expect(map.get('a')).toBe(1);
    expect(map.delete('b')).toBeTruthy();
    expect(map.delete('d')).toBeTruthy();
    expect(map.delete('a')).toBeTruthy();
    expect(map.delete('c')).toBeTruthy();
    expect(map.get('b')).toBeUndefined();
    expect(map.get('d')).toBeUndefined();
    expect(map.get('a')).toBeUndefined();
    expect(map.get('c')).toBeUndefined();
    expect(map.get('undefined')).toBeUndefined();
    expect(map.get(undefined)).toBeUndefined();
    expect(map.delete('b')).toBeFalsy();
    expect(map.delete('c')).toBeFalsy();
    expect(map.delete('a')).toBeFalsy();
    expect(map.delete('d')).toBeFalsy();
  });

  it('should delete multiply entries and reset them', () => {
    let map = new _Map();
    map.set('a', 1);
    expect(map.get('a')).toBe(1);
    map.delete('a');
    expect(map.get('undefined')).toBeUndefined();
    expect(map.get(undefined)).toBeUndefined();
    expect(map.get('a')).toBeUndefined();
    map.set('a', 2);
    expect(map.get('a')).toBe(2);
    map.set('b', 'B');
    expect(map.get('a')).toBe(2);
    expect(map.get('b')).toBe('B');
    expect(map.get('c')).toBeUndefined();
    expect(map.get(undefined)).toBeUndefined();
    expect(map.get('undefined')).toBeUndefined();
    map.delete('a');
    expect(map.get('a')).toBeUndefined();
    expect(map.get('b')).toBe('B');
    map.delete('b');
    expect(map.get('b')).toBeUndefined();
    expect(map.get(undefined)).toBeUndefined();
    expect(map.get('undefined')).toBeUndefined();
  });

  it('should iteratee on empty map', () => {
    let map = new _Map();
    let count = 0;
    map.forEach(() => {
      count++;
    });
    expect(count).toBe(0);
  });

  it('should iteratee on map with single entry', () => {
    let map = new _Map();
    let count = 0;

    map.set(NaN, 1);
    map.forEach((value, key) => {
      count++;
      expect(value).toBe(1);
      expect(key).toBeNaN();
    });
    expect(count).toBe(1);
  });

  it('should iteratee on map entries', () => {
    let map = new _Map();
    let result = {};

    map.set(1, 'a');
    map.set(NaN, 0);
    map.set(true, false);
    map.set('foo', 'bar');

    map.forEach((value, key) => {
      result[key] = value;
    });

    expect(result).toEqual({1: 'a', NaN: 0, true: false, 'foo': 'bar'});
  });
});
