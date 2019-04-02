import { describeGlobalPatch } from '../../../config/utils/jest';

describeGlobalPatch(`_WeakMap()`, `WeakMap`, `@ganuz/_weak-map`, (_WeakMap: typeof WeakMap) => {
  it(`should be a function`, () => {
    expect(_WeakMap).toBeFunction();
  });

  it('should get and set value', () => {
    let map = new _WeakMap();
    let a = {};
    let b = v => v;
    let c = [];
    let d = class {
    };

    map.set(a, 'foo');
    map.set(b, Object);
    expect(map.get(a)).toBe('foo');
    expect(map.get(b)).toBe(Object);
    map.set(c, null);
    expect(map.get(d)).toBeUndefined();
    map.set(d, NaN);
    expect(map.get(b)).toBe(Object);
    expect(map.get(c)).toBeNull();
    expect(map.get(a)).toBe('foo');
    expect(map.get(d)).toBeNaN();
  });

  it('should return undefined if key not exists', () => {
    let map = new _WeakMap();
    expect(map.get({})).toBeUndefined();
    expect(map.get([])).toBeUndefined();
    expect(map.get(v => v)).toBeUndefined();
    expect(map.get(Object.freeze({}))).toBeUndefined();
  });

  it('should override exists value', () => {
    let map = new _WeakMap();
    let a = {};
    let b = [];
    map.set(a, 1);
    map.set(b, 2);
    expect(map.get(a)).toBe(1);
    map.set(a, 'a');
    expect(map.get(a)).toBe('a');
    expect(map.get(b)).toBe(2);
    map.set(b, 'B');
    map.set(a, 'A');
    expect(map.get(b)).toBe('B');
    expect(map.get(a)).toBe('A');
  });

  it('should create multiply map to one target', () => {
    let map = new _WeakMap();
    let map2 = new _WeakMap();
    let target = {};

    map.set(target, 'a');
    expect(map.get(target)).toBe('a');
    expect(map2.get(target)).toBeUndefined();
    map2.set(target, 'b');
    expect(map2.get(target)).toBe('b');
    expect(map.get(target)).toBe('a');
    map.set(target, '1');
    map2.set(target, '2');
    expect(map2.get(target)).toBe('2');
    expect(map.get(target)).toBe('1');
  });

  it('should set and get value of not extensible target', () => {
    let map = new _WeakMap();
    let a = {};
    let b = Object.freeze({});
    let c = Object.freeze(() => {
    });
    let d = [];

    map.set(a, 1);
    map.set(c, 3);
    map.set(b, 2);
    map.set(d, 4);
    expect(map.get(c)).toBe(3);
    expect(map.get(a)).toBe(1);
    expect(map.get(d)).toBe(4);
    expect(map.get(b)).toBe(2);
    map.set(b, 'b');
    map.set(c, 'c');
    map.set(a, 'a');
    expect(map.get(b)).toBe('b');
    expect(map.get(c)).toBe('c');
    expect(map.get(d)).toBe(4);
    expect(map.get(a)).toBe('a');
    map.set(a, 'A');
    map.set(d, 'D');
    expect(map.get(d)).toBe('D');
    expect(map.get(b)).toBe('b');
    expect(map.get(a)).toBe('A');
    expect(map.get(c)).toBe('c');
  });

  it('should get value of target that was extensible and now is not extensible', () => {
    let map = new _WeakMap();
    let target = {};

    map.set(target, 'foo');
    expect(map.get(target)).toBe('foo');
    Object.freeze(target);
    expect(map.get(target)).toBe('foo');
    map.set(target, 'data');
    expect(map.get(target)).toBe('data');
  });
});
