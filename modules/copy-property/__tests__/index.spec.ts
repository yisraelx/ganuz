import copyProperty from '../';

describe(`copyProperty()`, () => {
  it(`should be a function`, () => {
    expect(copyProperty).toBeFunction();
  });

  it('should throw if target is not object', () => {
    expect(() => copyProperty(null, 'foo', {})).toThrow();
    expect(() => copyProperty(NaN as any, 'foo', {})).toThrow();
  });

  it('should throw if source is not object', () => {
    expect(() => copyProperty({}, 'foo', undefined)).toThrow();
    expect(() => copyProperty({}, 'foo', 5 as any)).toThrow();
  });

  it('should copy property and return true', () => {
    let numSym = Symbol('number');
    let target = {
      foo: 'bar',
      get some() {
        return this.foo;
      },
      fn: () => {
      }
    };
    let fn = () => {
    };
    let source = Object.create({}, {
      [numSym]: {value: 55, writable: true, enumerable: true},
      some: {
        configurable: true,
        enumerable: true,
        value: 'data'
      },
      fn: {
        get: () => fn,
        enumerable: true
      }
    });
    expect(copyProperty(target, numSym, source)).toBeTruthy();
    expect(copyProperty(target, 'some', source)).toBeTruthy();
    expect(copyProperty(target, 'fn', source)).toBeTruthy();
    expect(Object.getOwnPropertyDescriptor(target, numSym)).toEqual(Object.getOwnPropertyDescriptor(source, numSym));
    expect(Object.getOwnPropertyDescriptor(target, 'some')).toEqual(Object.getOwnPropertyDescriptor(source, 'some'));
    expect(Object.getOwnPropertyDescriptor(target, 'fn')).toEqual(Object.getOwnPropertyDescriptor(source, 'fn'));
    expect(target).toEqual({
      foo: 'bar',
      some: 'data',
      [numSym]: 55,
      fn
    });
  });

  it('should override property value and return true', () => {
    let target = Object.create({}, {color: {value: 'red', configurable: true}});
    let source = Object.create({}, {color: {value: 'pink', writable: true}});
    expect(copyProperty(target, 'color', source)).toBeTruthy();
    expect(Object.getOwnPropertyDescriptor(target, 'color')).toEqual({
      value: 'pink',
      configurable: false,
      enumerable: false,
      writable: true
    });
  });

  it('should copy from key to different key', () => {
    let target = {};
    let source = {
      a: 1,
      get b() {
        return 2;
      }
    };
    expect(copyProperty(target, '_a', source, 'a')).toBeTruthy();
    expect(copyProperty(target, '_b', source, 'b')).toBeTruthy();
    expect(source).toEqual({a: 1, b: 2});
    expect(target).toEqual({_a: 1, _b: 2});
  });

  it('should not copy to freeze object and return false', () => {
    let target = Object.freeze({});
    let source = {foo: 'bar'};
    expect(copyProperty(target, 'foo', source)).toBeFalsy();
  });

  it('should not copy proto property and return false', () => {
    let target = Object.create(null);
    let source = Object.create({foo: 'bar'});

    expect(copyProperty(target, 'foo', source)).toBeFalsy();
    expect('foo' in target).toBeFalsy();
    expect(target).not.toBeInstanceOf(Object);
  });
});
