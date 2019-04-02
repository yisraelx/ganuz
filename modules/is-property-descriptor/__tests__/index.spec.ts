import isPropertyDescriptor from '../';

let toDefineProperty = (descriptor: any | PropertyDescriptor) => Object.defineProperty({}, 'prop', descriptor);

let toBeTruthy = (descriptor: any | PropertyDescriptor) => {
  expect(isPropertyDescriptor(descriptor)).toBeTruthy();
  toDefineProperty(descriptor);
};

let toBeFalsy = (descriptor: any | PropertyDescriptor) => {
  expect(isPropertyDescriptor(descriptor)).toBeFalsy();
  expect(() => toDefineProperty(descriptor)).toThrow();
};

describe(`isPropertyDescriptor()`, () => {
  it(`should be a function`, () => {
    expect(isPropertyDescriptor).toBeFunction();
  });

  it('should return true', () => {
    toBeTruthy({});
    toBeTruthy({foo: 'bar'});
    toBeTruthy([]);
    toBeTruthy({value: undefined});
    toBeTruthy({writable: undefined});
    toBeTruthy({value: undefined, writable: undefined});
    toBeTruthy({get: undefined});
    toBeTruthy({set: undefined});
    toBeTruthy({set: undefined, get: undefined, configurable: undefined});
    toBeTruthy({
      configurable: true,
      enumerable: 55,
      writable: NaN,
      value: undefined
    });
    toBeTruthy({
      configurable: -1, enumerable: true, get() {
      }, set() {
      }
    });
  });

  it('should return false', () => {
    toBeFalsy(null);
    toBeFalsy(NaN);
    toBeFalsy({get: 55});
    toBeFalsy({get: undefined, writable: undefined});
    toBeFalsy({value: undefined, get: undefined});
    toBeFalsy({
      value: undefined, get() {
      }, set() {
      }
    });
    toBeFalsy({writable: undefined, get: undefined, set: undefined});
    toBeFalsy({
      writable: undefined,
      value: undefined,
      get: undefined,
      set: undefined
    });
    toBeFalsy({writable: true, value: 55, get: undefined, set: undefined});
  });
});
