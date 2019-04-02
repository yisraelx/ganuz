import each from '../';

describe(`each()`, () => {
  it(`should be a function`, () => {
    expect(each).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => each(null, () => {
    })).toThrow();
    expect(() => each(true as any, () => {
    })).toThrow();
  });

  it('should throw if callback is not function', () => {
    expect(() => each({}, null)).toThrow();
  });

  it('should iteratee and return target', () => {
    let target = {
      _name: 'moshe',
      get name() {
        return this._name;
      },
      [Symbol('string')]: 'fun',
      fn() {
      }
    };
    let copy = {};

    expect(each(target, (value, key, target) => {
      copy[key] = target[key as any] === value && value;
    })).toBe(target);

    expect(copy).toEqual(target);
  });

  it('should iteratee on all own properties and return target', () => {
    let object = Object.create({
      foo: 'bar', get num() {
        return 67;
      }
    }, {
      name: {value: 'bob'},
      str: {
        get() {
          return 'col';
        }
      },
      [Symbol.toStringTag]: {value: 'Some'}
    });

    let keys = [];
    each(object, (__, key) => keys.push(key));
    expect(keys).toEqual(['name', 'str', Symbol.toStringTag]);
  });

  it('should break iteratee if callback invokes return false', () => {
    let object = [56, 'foo', 0, NaN, [], 78, false, -1, {}, ];
    let resultIndex = -1;
    expect(each(object, (value, index: number) => (value !== false && (resultIndex = index), value))).toBe(object);
    expect(object[resultIndex]).toBe(78);
  });
});
