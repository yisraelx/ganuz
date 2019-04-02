import extendsProperties from '..';

describe('extendsProperties()', () => {
  it(`should be a function`, () => {
    expect(extendsProperties).toBeFunction();
  });

  it('should throw if target is not object', () => {
    expect(() => extendsProperties(null, {})).toThrow();
    expect(() => extendsProperties('foo' as any, {})).toThrow();
  });

  it('should throw if source is not object', () => {
    expect(() => extendsProperties({}, undefined)).toThrow();
    expect(() => extendsProperties({}, NaN as any)).toThrow();
  });

  it('should extends properties', () => {
    let target = {tea: true};
    let source = {
      get name() {
        return this._name;
      }, set name(name) {
        this._name = name;
      }, _name: 'bob'
    };
    expect(extendsProperties(target, source)).toBe(target);
    expect(target['tea']).toBeTruthy();
    expect(Object.getOwnPropertyDescriptor(target, 'name')).toEqual(Object.getOwnPropertyDescriptor(source, 'name'));
    expect(Object.getOwnPropertyDescriptor(target, '_name')).toEqual(Object.getOwnPropertyDescriptor(source, '_name'));
  });

  it('should copy symbol keys', () => {
    let target = {};
    let source = Object.create(null, {
      [Symbol.for('foo')]: {value: 'bar', enumerable: true}
    });
    expect(extendsProperties(target, source)).toBe(target);
    expect(Object.getOwnPropertyDescriptor(target, Symbol.for('foo'))).toEqual({
      configurable: false,
      enumerable: true,
      writable: false,
      value: 'bar'
    });
  });

  it('should copy enumerable properties', () => {
    let target = {};
    let source = Object.create(null, {
      color: {value: 'black', configurable: true}
    });
    expect(extendsProperties(target, source)).toBe(target);
    expect(Object.getOwnPropertyDescriptor(target, 'color')).toEqual({
      configurable: true,
      enumerable: false,
      writable: false,
      value: 'black'
    });
  });

  it('should not override target properties', () => {
    let target = Object.create({}, {
      name: {
        value: 'bob',
        configurable: true,
        enumerable: false,
        writable: true
      }, foo: {value: 'bar'}
    });
    let source = {name: 'alice', str: 'cool'};
    expect(extendsProperties(target, source)).toBe(target);
    expect(Object.getOwnPropertyDescriptor(target, 'foo')).toEqual({
      value: 'bar',
      configurable: false,
      enumerable: false,
      writable: false
    });
    expect(Object.getOwnPropertyDescriptor(target, 'name')).toEqual({
      value: 'bob', configurable: true,
      enumerable: false,
      writable: true
    });
    expect(Object.getOwnPropertyDescriptor(target, 'str')).toEqual({
      value: 'cool',
      configurable: true,
      enumerable: true,
      writable: true
    });
  });

  it('should not copy proto properties', () => {
    let target = {num: 55};
    let source = Object.create({[Symbol.for('car')]: true}, {
      num: {value: 44},
      name: {value: 'bob', writable: true}
    });
    expect(extendsProperties(target, source)).toBe(target);
    expect(Object.getOwnPropertyDescriptor(target, Symbol.for('car'))).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(target, 'num')).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: 55
    });
    expect(Object.getOwnPropertyDescriptor(target, 'name')).toEqual({
      configurable: false,
      enumerable: false,
      writable: true,
      value: 'bob'
    });
  });
});
