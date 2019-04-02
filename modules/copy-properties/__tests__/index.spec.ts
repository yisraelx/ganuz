import copyProperties from '../';

describe(`copyProperties()`, () => {
  it(`should be a function`, () => {
    expect(copyProperties).toBeFunction();
  });

  it('should throw if target is not object', () => {
    expect(() => copyProperties(null, {}));
    expect(() => copyProperties('foo' as any, {}));
  });

  it('should throw if source is not object', () => {
    expect(() => copyProperties(null, {}));
    expect(() => copyProperties('foo' as any, {}));
  });

  it('should copy properties', () => {
    let target = {foo: 'bar'};
    let source = Object.create(null, {
      _color: {value: 'red'},
      color: {
        get() {
          return this._color;
        }, set(color) {
          this._color = color;
        },
        configurable: true
      }
    });

    expect(copyProperties(target, source)).toBe(target);
    expect(target.foo).toBe('bar');
    expect(Object.getOwnPropertyDescriptor(target, 'color')).toEqual(Object.getOwnPropertyDescriptor(source, 'color'));
    expect(Object.getOwnPropertyDescriptor(target, '_color')).toEqual(Object.getOwnPropertyDescriptor(source, '_color'));
  });

  it('should override properties', () => {
    let target = {color: 'green'};
    let source = Object.freeze({color: 'red'});
    expect(copyProperties(target, source)).toBe(target);
    expect(Object.getOwnPropertyDescriptor(target, 'color')).toEqual(Object.getOwnPropertyDescriptor(source, 'color'));
  });

  it('should copy symbol keys', () => {
    let target = {};
    let source = {[Symbol.for('foo')]: 'bar'};
    expect(copyProperties(target, source)).toBe(target);
    expect(Object.getOwnPropertyDescriptor(target, Symbol.for('foo'))).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: 'bar'
    });
  });

  it('should copy enumerable properties', () => {
    let target = {};
    let source = Object.create({}, {foo: {value: 'bar'}});
    expect(copyProperties(target, source)).toBe(target);
    expect(Object.getOwnPropertyDescriptor(target, 'foo')).toEqual({
      configurable: false,
      enumerable: false,
      writable: false,
      value: 'bar'
    });
  });

  it('should copy only own properties', () => {
    let target = {str: 'fun'};
    let source = Object.create({num: 55}, {foo: {writable: true, value: 'bar'}});
    expect(copyProperties(target, source)).toBe(target);
    expect(Object.getOwnPropertyDescriptor(target, 'num')).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(target, 'str')).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: 'fun'
    });
    expect(Object.getOwnPropertyDescriptor(target, 'foo')).toEqual({
      configurable: false,
      enumerable: false,
      writable: true,
      value: 'bar'
    });
  });
});
