import definePropertyWith from '../';

describe(`cloneWith()`, () => {
  it(`should be a function`, () => {
    expect(definePropertyWith).toBeFunction();
  });

  it('should throw if target is not object', () => {
    expect(() => definePropertyWith(null, 'prop', {}, () => {
    })).toThrow();
    expect(() => definePropertyWith('foo' as any, 'prop', {}, () => {
    })).toThrow();
  });

  it('should throw if callback is not function', () => {
    expect(() => definePropertyWith({}, 'prop', {}, undefined)).toThrow();
    expect(() => definePropertyWith({}, 'prop', {}, 67 as any)).toThrow();
  });

  it('should define the callback invokes result and return true', () => {
    let target = {};
    expect(definePropertyWith(target, 'drink', 'tea', (o, n) => ({value: n, enumerable: true}))).toBeTruthy();
    expect(target).toEqual({drink: 'tea'});
    expect(Object.getOwnPropertyDescriptor(target, 'drink')).toEqual({
      value: 'tea',
      enumerable: true,
      configurable: false,
      writable: false
    });
  });

  it('should define the given descriptor if result is void and return true', () => {
    let target = {name: 'alice'};
    expect(definePropertyWith(target, 'name', {value: 'moshe', writable: false}, () => {
    })).toBeTruthy();
    expect(target).toEqual({name: 'moshe'});
    expect(Object.getOwnPropertyDescriptor(target, 'name')).toEqual({
      value: 'moshe',
      enumerable: true,
      configurable: true,
      writable: false
    });
  });

  it('should not define if descriptor and result is not valid descriptor and return false', () => {
    let target = {color: 'red'};
    expect(definePropertyWith(target, 'color', 77, () => {
    })).toBeFalsy();
    expect(target).toEqual({color: 'red'});
  });

  it('should not define the property on freeze target and return false', () => {
    let target = Object.freeze({});

    expect(definePropertyWith(target, 'foo', {value: 'bar'}, (o, n) => n)).toBeFalsy();
    expect(target).toEqual({});
  });

  it('should not define non-writable and non-configurable property and return false', () => {
    let target = Object.create(null, {num: {value: -1, enumerable: true}});

    expect(definePropertyWith(target, 'num', {value: -9.6}, (o, n) => n)).toBeFalsy();
    expect(Object.getOwnPropertyDescriptor(target, 'num')).toEqual({
      value: -1,
      enumerable: true,
      writable: false,
      configurable: false
    });
  });
});
