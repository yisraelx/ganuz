import getPropertyOwner from '../';

describe(`getPropertyOwner()`, () => {
  it(`should be a function`, () => {
    expect(getPropertyOwner).toBeFunction();
  });

  it(`should throw if target is primitive`, () => {
    expect(() => getPropertyOwner(null, 'foo')).toThrow();
    expect(() => getPropertyOwner(78 as any, 'foo')).toThrow();
  });

  it('should return null for not exists property', () => {
    expect(getPropertyOwner({}, 'foo')).toBeNull();
  });

  it('should return target if he is owner of property', () => {
    expect(getPropertyOwner(Object, 'create')).toBe(Object);
  });

  it('should return the first owner of property', () => {
    let a = {color: 'red'};
    let b = Object.setPrototypeOf({color: 'green'}, a);
    expect(getPropertyOwner(b, 'color')).toBe(b);
  });
});
