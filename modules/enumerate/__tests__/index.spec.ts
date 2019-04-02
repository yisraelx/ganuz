import enumerate from '@ganuz/enumerate';

describe('', () => {
  it(`should be a function`, () => {
    expect(enumerate).toBeFunction();
  });

  it('should throw if target not object', () => {
    expect(() => enumerate(null)).toThrow();
    expect(() => enumerate('foo' as any)).toThrow();
  });

  it('should return object keys', () => {
    expect(enumerate({
      set [Symbol.toStringTag](v) {
      }, method() {
      }, foo: 'bar'
    })).toIncludeSameMembers([Symbol.toStringTag, 'method', 'foo']);
    expect(enumerate([1, 2, 3])).toIncludeSameMembers(['0', '1', '2']);
  });

  it('should return only enumerable properties', () => {
    let object = Object.defineProperties({}, {
      foo: {value: 'bar', enumerable: true},
      color: {value: 'red'},
      method: {
        value() {
        }, enumerable: true
      },
      data: {
        get() {
        }
      }
    });

    expect(enumerate(object)).toIncludeSameMembers(['foo', 'method']);
  });

  it('should return symbols keys', () => {
    let fooSym = Symbol('foo');
    let object = Object.defineProperties({}, {
      [fooSym]: {value: 'bar', enumerable: true},
      [Symbol.toStringTag]: {
        get() {
        }
      },
      [Symbol.iterator]: {
        value() {
        }, enumerable: true
      }
    });

    expect(enumerate(object)).toIncludeSameMembers([fooSym, Symbol.iterator]);
  });

  it('should return all enumerable keys in the prototype chain', () => {
    let dataSym = Symbol('data');
    let colorSym = Symbol('color');
    let a = Object.create({
      [dataSym]: 'some'
    }, {
      method: {
        value() {
        }, enumerable: false
      },
      foo: {
        value: 'bar', enumerable: true
      },
      [colorSym]: {value: 'pink', enumerable: false},
      drink: {value: 'coffee', enumerable: true}
    });
    let b = Object.create(a, {
      bird: {value: 'eagle', enumerable: false},
      num: {value: 1, enumerable: true},
      [colorSym]: {value: 'blue', enumerable: true},
      drink: {value: 'beer', enumerable: false}
    });
    let c = Object.create(b, {
      jeep: {value: true, enumerable: true},
      num: {value: 45, enumerable: false},
      method: {
        value() {
        }, enumerable: false
      },
      [colorSym]: {
        get() {
          return 'red';
        }, enumerable: false
      },
      drink: {value: 'tea', enumerable: true}
    });

    expect(enumerate(a)).toIncludeSameMembers(['drink', 'foo', dataSym]);
    expect(enumerate(b)).toIncludeSameMembers([dataSym, 'foo', 'num', colorSym]);
    expect(enumerate(c)).toIncludeSameMembers([dataSym, 'foo', 'drink', 'jeep']);
  });

  it('should not return key of onw non-enumerable and enumerable in proto ', () => {
    let target = Object.create({color: 'red', num: 1}, {
      color: {value: 'green', enumerable: false},
      foo: {value: 'bar', enumerable: true}
    });

    expect(enumerate(target)).toIncludeSameMembers(['foo', 'num']);
  });
});
