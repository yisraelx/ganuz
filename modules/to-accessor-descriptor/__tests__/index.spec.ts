import toAccessorDescriptor from '../';

function get() {
}

function set() {
}

describe(`toAccessorDescriptor()`, () => {
  it(`should be a function`, () => {
    expect(toAccessorDescriptor).toBeFunction();
  });

  it('should create descriptor', () => {
    expect(toAccessorDescriptor()).toEqual({
      configurable: true,
      enumerable: false,
      get: undefined,
      set: undefined
    });
    expect(toAccessorDescriptor(0 as any, 0 as any, {})).toEqual({
      configurable: false,
      enumerable: false,
      get: undefined,
      set: undefined
    });
    expect(toAccessorDescriptor(get, 0 as any, false)).toEqual({
      configurable: false,
      enumerable: false,
      get,
      set: undefined
    });
    expect(toAccessorDescriptor(undefined, set, 'we')).toEqual({
      configurable: false,
      enumerable: true,
      get: undefined,
      set
    });
    expect(toAccessorDescriptor(null, Math as any, {value: 67, writable: true, enumerable: true})).toEqual({
      configurable: false,
      enumerable: true,
      get: undefined,
      set: undefined
    });
    expect(toAccessorDescriptor(get, set, {foo: 'bar'})).toEqual({
      configurable: false,
      enumerable: false,
      get,
      set
    });
    expect(toAccessorDescriptor(get, 'foo' as any, true)).toEqual({
      configurable: true,
      enumerable: true,
      get,
      set: undefined
    });
  });
});
