import getPropertyDescriptor from '../';

describe(`getPropertyDescriptor()`, () => {
  it(`should be a function`, () => {
    expect(getPropertyDescriptor).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => getPropertyDescriptor(null, 'prop')).toThrow();
    expect(() => getPropertyDescriptor('foo' as any, 0)).toThrow();
  });

  it('should return property descriptor', () => {
    expect(getPropertyDescriptor({foo: 'bar'}, 'foo')).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: 'bar'
    } as PropertyDescriptor);
  });

  it('should return undefined if property not exists', () => {
    expect(getPropertyDescriptor({}, 'prop')).toBeUndefined();
  });

  it('should return the first property descriptor', () => {
    let a = Object.create(null, {color: {value: 'pink'}});
    let b = Object.create(a, {});
    let c = Object.create(b, {color: {value: 'black'}});

    expect(getPropertyDescriptor(a, 'color').value).toBe('pink');
    expect(getPropertyDescriptor(b, 'color').value).toBe('pink');
    expect(getPropertyDescriptor(c, 'color').value).toBe('black');
  });
});
