import definePropertiesWith from '../';

describe(`definePropertiesWith()`, () => {
  it(`should be a function`, () => {
    expect(definePropertiesWith).toBeFunction();
  });

  it(`should be throws if target is not object`, () => {
    expect(() => (definePropertiesWith as any)(null, {}, () => {
    })).toThrow();
    expect(() => (definePropertiesWith as any)(1, {}, () => {
    })).toThrow();
  });

  it(`should be throws if descriptors is not object`, () => {
    expect(() => (definePropertiesWith as any)({}, undefined, () => {
    })).toThrow();
    expect(() => (definePropertiesWith as any)({}, NaN, () => {
    })).toThrow();
  });

  it(`should be throws if callback is not function`, () => {
    expect(() => (definePropertiesWith as any)({}, {}, null)).toThrow();
  });

  it('should define properties and return the target', () => {
    let target = {
      name: 'bob',
      [Symbol.toStringTag]: 'Some'
    };

    expect(definePropertiesWith(target, {
      drink: {value: 'tea', writable: true},
      Object: {set: Object, configurable: true},
      name: {value: 'alice'},
      [Symbol.toStringTag]: {configurable: false}
    }, (o, n) => ({...n, enumerable: true}))).toBe(target);

    expect(Object.getOwnPropertyDescriptors(target)).toEqual({
      name: {value: 'alice', configurable: true, enumerable: true, writable: true},
      [Symbol.toStringTag]: {value: 'Some', configurable: false, enumerable: true, writable: true},
      drink: {value: 'tea', configurable: false, enumerable: true, writable: true},
      Object: {set: Object, get: undefined, configurable: true, enumerable: true}
    });
  });

  it('should define the given descriptor if callback invokes return void', () => {
    let target = {};

    expect(definePropertiesWith(target, {
      [Symbol.for('foo')]: {value: 'bar'},
      jeep: {value: true}
    }, () => void 0)).toBe(target);
    expect(Object.getOwnPropertyDescriptors(target)).toEqual({
      [Symbol.for('foo')]: {value: 'bar', configurable: false, enumerable: false, writable: false},
      jeep: {value: true, configurable: false, enumerable: false, writable: false}
    });
  });

  it('should define other properties if some descriptor or result is not valid property descriptor', () => {
    let target = {};

    expect(definePropertiesWith(target, {
      a: '1',
      b: {value: 2, enumerable: true},
      c: {value: '3', get: () => 3},
      d: NaN,
      e: 'foo',
      f: {get: () => 5, enumerable: true},
      g: {
        get: () => {
        }
      }
    }, (o, n) => {
      let v = Number(typeof n !== 'object' ? n : typeof n.get === 'function' ? n.get() : n.value);
      return v === v && (typeof n === 'object' ? void 0 : {value: n, enumerable: true});
    })).toBe(target);

    expect(Object.getOwnPropertyNames(target)).toEqual(['a', 'b', 'f']);
    expect(target).toEqual({
      a: '1',
      b: 2,
      f: 5
    });
  });

  it('should define other properties if some prop is non-writable and non-configurable', () => {
    let target = definePropertiesWith({}, {
      color: {value: 'red'},
      num: {get: () => 5},
      name: {value: 'bob', writable: true},
    }, (o, n) => ({enumerable: true, ...n}));

    expect(definePropertiesWith(target, {
      str: {value: 'fun'},
      num: {value: 3},
      name: {value: 'alice'},
      color: {get: () => 'blue'},
      drink: {get: () => 'beer'}
    }, (o, n) => ({enumerable: true, ...n}))).toBe(target);

    expect(target).toEqual({
      color: 'red',
      num: 5,
      name: 'alice',
      str: 'fun',
      drink: 'beer'
    });
  });

  it('should define non-writable and non-configurable if not any change', () => {
    let target = definePropertiesWith({}, {
      foo: 'bar',
      name: {value: 'alice', writable: true}
    }, (o, n) => ((n = typeof n !== 'object' ? {value: n} : n) && {...n, enumerable: true}));

    expect(Object.getOwnPropertyDescriptors(target)).toEqual({
      foo: {value: 'bar', configurable: false, enumerable: true, writable: false},
      name: {value: 'alice', configurable: false, enumerable: true, writable: true}
    });

    expect(definePropertiesWith(target, target, () => ({configurable: false}))).toBe(target);
    expect(target).toEqual({foo: 'bar', name: 'alice'});

    expect(definePropertiesWith(target, {
      foo: {value: 'bar', writable: false},
      name: {value: 'moshe', enumerable: true}
    }, () => {
    })).toBe(target);
    expect(target).toEqual({foo: 'bar', name: 'moshe'});
  });

  it('should not define properties on freeze target and return target', () => {
    let target = Object.freeze({color: 'blue'});

    expect(definePropertiesWith(target, {color: {value: 'red'}}, (o, n) => n)).toBe(target);
    expect(target).toEqual({color: 'blue'});
  });

});
