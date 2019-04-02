import isAccessorDescriptor from '../';

describe(`isAccessorDescriptor()`, () => {
  it(`should be a function`, () => {
    expect(isAccessorDescriptor).toBeFunction();
  });

  it('should return true', () => {
    expect(isAccessorDescriptor({
      configurable: true, enumerable: true, writable: true, value: undefined, get() {
      }, set() {
      }
    })).toBeTruthy();
    expect(isAccessorDescriptor({
      get() {
      }
    })).toBeTruthy();
    expect(isAccessorDescriptor({
      set() {
      }
    })).toBeTruthy();
    expect(isAccessorDescriptor({
      get: undefined
    })).toBeTruthy();
    expect(isAccessorDescriptor({
      set: undefined
    })).toBeTruthy();
    expect(isAccessorDescriptor({
      get: 'foo', writable: false
    })).toBeTruthy();
    expect(isAccessorDescriptor({
      set: 33
    })).toBeTruthy();
    expect(isAccessorDescriptor({
      set() {
      }, value: true
    })).toBeTruthy();
    expect(isAccessorDescriptor({
      set() {
      }, foo: 'bar'
    })).toBeTruthy();
  });

  it('should return false', () => {
    expect((isAccessorDescriptor as any)()).toBeFalsy();
    expect(isAccessorDescriptor(null)).toBeFalsy();
    expect(isAccessorDescriptor('foo')).toBeFalsy();
    expect(isAccessorDescriptor({})).toBeFalsy();
    expect(isAccessorDescriptor({foo: 'bar'})).toBeFalsy();
    expect(isAccessorDescriptor({value: {}})).toBeFalsy();
    expect(isAccessorDescriptor({
      configurable: true, enumerable: true, writable: true
    })).toBeFalsy();
  });
});
