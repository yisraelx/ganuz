import isDataDescriptor from '../';

describe(`isDataDescriptor()`, () => {
  it(`should be a function`, () => {
    expect(isDataDescriptor).toBeFunction();
  });

  it('should return true', () => {
    expect(isDataDescriptor({
      configurable: true, enumerable: true, writable: true, value: undefined
    })).toBeTruthy();
    expect(isDataDescriptor({
      value: undefined, get() {
      }
    })).toBeTruthy();
    expect(isDataDescriptor({
      value: undefined, set: undefined
    })).toBeTruthy();
    expect(isDataDescriptor({
      value: []
    })).toBeTruthy();
    expect(isDataDescriptor({
      value: null
    })).toBeTruthy();
    expect(isDataDescriptor({
      value: 0, foo: 'bar'
    })).toBeTruthy();
    expect(isDataDescriptor({
      writable: undefined, set() {
      }
    })).toBeTruthy();
    expect(isDataDescriptor({
      writable: true
    })).toBeTruthy();
    expect(isDataDescriptor({
      writable: false, foo: 'bar', get() {
      }
    })).toBeTruthy();
    expect(isDataDescriptor({
      writable: [], get: undefined
    })).toBeTruthy();
  });

  it('should return false', () => {
    expect((isDataDescriptor as any)()).toBeFalsy();
    expect(isDataDescriptor(null)).toBeFalsy();
    expect(isDataDescriptor(NaN)).toBeFalsy();
    expect(isDataDescriptor({})).toBeFalsy();
    expect(isDataDescriptor({configurable: true, enumerable: true})).toBeFalsy();
    expect(isDataDescriptor({get: undefined, set: undefined})).toBeFalsy();
    expect(isDataDescriptor({foo: 'bar'})).toBeFalsy();
  });
});
