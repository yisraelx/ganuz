import eachProperties from '../';

describe(`eachProperties()`, () => {
  it(`should be a function`, () => {
    expect(eachProperties).toBeFunction();
  });

  it('should throw if target is not object', () => {
    expect(() => eachProperties(null, () => {
    })).toThrow();
    expect(() => eachProperties('foo' as any, () => {
    })).toThrow();
  });

  it('should throw if callback is not function', () => {
    expect(() => eachProperties({}, undefined)).toThrow();
  });

  it('should iteratee and return target', () => {
    let object = Object.create({}, {
      foo: {value: 'bar', enumerable: true},
      [Symbol('cup')]: {value: 'coffee', writable: true},
      color: {
        get() {
          return 'yellow';
        }, configurable: true
      }
    });
    let copy = {};

    expect(eachProperties(object, (descriptor: PropertyDescriptor, property: PropertyKey, target) => {
      return target === object && Object.defineProperty(copy, property, descriptor);
    })).toBe(object);
    expect(Object.getOwnPropertyDescriptors(copy)).toEqual(Object.getOwnPropertyDescriptors(object));
  });

  it('should iteratee on all own properties and return target', () => {
    let target = Object.create({foo: 'bar'}, {color: {value: 'red'}});
    let counter: number = 0;
    eachProperties(target, (descriptor: PropertyDescriptor, property: PropertyKey) => {
      counter++;
      if (property !== 'color') {
        throw property;
      }
    });
    expect(counter).toBe(1);
  });

  it('should break iteratee if callback invokes return false', () => {
    let object = {a: 1, b: 2, c: 3};
    let index: number = 0;
    let key: PropertyKey;
    eachProperties(object, ({value}: PropertyDescriptor, property: PropertyKey) => (index++, key = property, value !== 2));
    expect(index).toBe(2);
    expect(key).toBe('b');
  });
});
