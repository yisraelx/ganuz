import defineProperties from '../';

describe(`defineProperties()`, () => {
  it(`should be a function`, () => {
    expect(defineProperties).toBeFunction();
  });

  it(`should be throws if target is not object`, () => {
    expect(() => (defineProperties as any)(null, {})).toThrow();
    expect(() => (defineProperties as any)(1, {})).toThrow();
  });

  it(`should be throws if descriptors is not object`, () => {
    expect(() => (defineProperties as any)({}, undefined)).toThrow();
    expect(() => (defineProperties as any)({}, NaN)).toThrow();
  });

  it(`should be throws if descriptor of descriptors is not valid property descriptor`, () => {
    expect(() => (defineProperties as any)({}, {num: 55})).toThrow();
    expect(() => (defineProperties as any)({}, {some: undefined})).toThrow();
    expect(() => (defineProperties as any)({}, {foo: {get: () => 'bar', value: 'bar'}})).toThrow();
  });

  it('should define properties on target and return target', () => {
    let colorSym = Symbol('color');
    let getGreen = () => 'green';
    let target = {
      [colorSym]: 'red',
      jeep: true,
      name: 'bob'
    };

    expect(defineProperties(target, {
      [colorSym]: {get: getGreen, enumerable: false},
      cup: {value: 'coffee', writable: true},
      name: {value: 'alice', enumerable: false}
    })).toBe(target);

    expect(Object.getOwnPropertyDescriptors(target)).toEqual({
      [colorSym]: {get: getGreen, set: undefined, configurable: true, enumerable: false},
      jeep: {value: true, configurable: true, enumerable: true, writable: true},
      name: {value: 'alice', configurable: true, enumerable: false, writable: true},
      cup: {value: 'coffee', configurable: false, enumerable: false, writable: true}
    });
  });

  it('should not define properties if target is freeze and return target', () => {
    let target = Object.freeze({color: 'red'});
    expect(defineProperties(target, {
      color: {value: 'blue'},
      name: {value: 'bob'}
    })).toBe(target);
    expect(target).toEqual({color: 'red'});
  });

  it('should define other properties if some property is non-writable and return target', () => {
    let target = Object.create({}, {name: {value: 'bob', enumerable: true}});
    expect(defineProperties(target, {
      color: {value: 'green', enumerable: true},
      name: {value: 'moshe', enumerable: true},
      tea: {value: true, enumerable: true}
    })).toBe(target);
    expect(target).toEqual({color: 'green', name: 'bob', tea: true});
  });
});
