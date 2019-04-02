import toPropertyDescriptor from '../';

function get() {
}

function set() {
}

describe(`toPropertyDescriptor()`, () => {
  it(`should be a function`, () => {
    expect(toPropertyDescriptor).toBeFunction();
  });

  it('should return accessor descriptor', () => {
    expect(toPropertyDescriptor({get: undefined})).toEqual({
      get: undefined,
      set: undefined,
      configurable: false,
      enumerable: false
    });
    expect(toPropertyDescriptor({set: undefined})).toEqual({
      get: undefined,
      set: undefined,
      configurable: false,
      enumerable: false
    });
    expect(toPropertyDescriptor({get: undefined, set: undefined})).toEqual({
      get: undefined,
      set: undefined,
      configurable: false,
      enumerable: false
    });
    expect(toPropertyDescriptor({get, set: undefined})).toEqual({
      get,
      set: undefined,
      configurable: false,
      enumerable: false
    });
    expect(toPropertyDescriptor({get: undefined, set})).toEqual({
      get: undefined,
      set,
      configurable: false,
      enumerable: false
    });
    expect(toPropertyDescriptor({get, set})).toEqual({get, set, configurable: false, enumerable: false});
    expect(toPropertyDescriptor({get: undefined, set: undefined, value: undefined})).toEqual({
      get: undefined,
      set: undefined, configurable: false, enumerable: false
    });
  });

  it('should return data descriptor', () => {
    expect(toPropertyDescriptor({})).toEqual({
      value: undefined,
      configurable: false,
      enumerable: false,
      writable: false
    });
    expect(toPropertyDescriptor({configurable: true})).toEqual({
      value: undefined,
      configurable: true,
      enumerable: false,
      writable: false
    });
    expect(toPropertyDescriptor({value: false})).toEqual({
      value: false,
      configurable: false,
      enumerable: false,
      writable: false
    });
    expect(toPropertyDescriptor({value: 88})).toEqual({
      value: 88,
      configurable: false,
      enumerable: false,
      writable: false
    });
  });

  it('should create descriptor and assign options from descriptor', () => {
    expect(toPropertyDescriptor({}, {
      configurable: true,
      enumerable: true,
      writable: true
    })).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: undefined
    });

    expect(toPropertyDescriptor({value: 55}, {
      configurable: true,
      enumerable: false
    })).toEqual({
      configurable: true,
      enumerable: false,
      writable: false,
      value: 55
    });

    expect(toPropertyDescriptor({value: 'foo'}, {})).toEqual({
      configurable: false,
      enumerable: false,
      writable: false,
      value: 'foo'
    });

    expect(toPropertyDescriptor({get}, {})).toEqual({
      configurable: false,
      enumerable: false,
      get,
      set: undefined
    });

    expect(toPropertyDescriptor({get: undefined}, {
      enumerable: true,
      writable: false
    })).toEqual({
      configurable: false,
      enumerable: true,
      get: undefined,
      set: undefined
    });
  });

  it('should create descriptor assign options from string', () => {
    expect(toPropertyDescriptor({value: 55}, '')).toEqual({
      configurable: false,
      enumerable: false,
      writable: false,
      value: 55
    });
    expect(toPropertyDescriptor({}, 'c')).toEqual({
      configurable: true,
      enumerable: false,
      writable: false,
      value: undefined
    });
    expect(toPropertyDescriptor({get: undefined}, 'e')).toEqual({
      configurable: false,
      enumerable: true,
      get: undefined,
      set: undefined,
    });
    expect(toPropertyDescriptor({set}, 'w')).toEqual({
      configurable: false,
      enumerable: false,
      get: undefined,
      set
    });
    expect(toPropertyDescriptor({value: 'foo'}, 'wc')).toEqual({
      configurable: true,
      enumerable: false,
      writable: true,
      value: 'foo'
    });
    expect(toPropertyDescriptor({set, get}, 'ec')).toEqual({
      configurable: true,
      enumerable: true,
      set,
      get
    });
    expect(toPropertyDescriptor({}, 'wce')).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: undefined
    });
  });

  it('should create descriptor and assign options from boolean or any', () => {
    expect(toPropertyDescriptor({}, true)).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: undefined
    });

    expect(toPropertyDescriptor({get: undefined}, true)).toEqual({
      configurable: true,
      enumerable: true,
      get: undefined
    });

    expect(toPropertyDescriptor({get, set}, false)).toEqual({
      configurable: false,
      enumerable: false,
      get,
      set
    });

    expect(toPropertyDescriptor({get: undefined, value: undefined}, 55)).toEqual({
      configurable: true,
      enumerable: true,
      get: undefined,
      set: undefined
    });
  });

  it('should override current descriptor options', () => {
    expect(toPropertyDescriptor({
      configurable: false,
      enumerable: false,
      writable: false,
      value: 'jeep'
    }, true, true)).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: 'jeep'
    });

    expect(toPropertyDescriptor({
      configurable: false,
      enumerable: false,
      writable: false,
      get
    }, 'cw', true)).toEqual({
      configurable: true,
      enumerable: false,
      get,
      set: undefined
    });

    expect(toPropertyDescriptor({
      get: undefined
    }, true, true)).toEqual({
      configurable: true,
      enumerable: true,
      get: undefined,
      set: undefined
    });
  });

  it('should not override current descriptor options', () => {
    expect(toPropertyDescriptor({
      enumerable: false,
      writable: false,
      get
    }, true, false)).toEqual({
      configurable: true,
      enumerable: false,
      get,
      set: undefined
    });

    expect(toPropertyDescriptor({
      configurable: false,
      enumerable: true,
      value: Math.PI
    }, 'cw', false)).toEqual({
      configurable: false,
      enumerable: true,
      writable: true,
      value: Math.PI
    });

    expect(toPropertyDescriptor({
      enumerable: true,
      get: undefined
    }, false)).toEqual({
      configurable: false,
      enumerable: true,
      get: undefined,
      set: undefined
    });
  });
});
