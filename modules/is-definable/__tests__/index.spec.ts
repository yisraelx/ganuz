import isDefinable from '../';

describe('isDefinable()', () => {
  it(`should be a function`, () => {
    expect(isDefinable).toBeFunction();
  });

  it('should return true', function () {
    expect(isDefinable({}, 'prop')).toBeTruthy();
    expect(isDefinable({prop: true}, 'prop')).toBeTruthy();
    expect(isDefinable({
      get prop() {
        return true;
      }
    }, 'prop')).toBeTruthy();
    expect(isDefinable(Object.create(null, {foo: {value: 'bar', configurable: true}}), 'foo')).toBeTruthy();
    expect(isDefinable(Object.create(Object.freeze({})), 'foo')).toBeTruthy();
    expect(isDefinable(Object.create(Object.create({}, {foo: {value: 'bar'}})), 'foo')).toBeTruthy();
  });

  it('should return false', function () {
    expect(isDefinable(Object.create(null, {foo: {value: 'bar'}}), 'foo')).toBeFalsy();
    expect(isDefinable(Object.create(null, {foo: {value: 'bar', writable: true}}), 'foo')).toBeFalsy();
    expect(isDefinable(Object.create(null, {
      foo: {
        set(value) {
        }
      }
    }), 'foo')).toBeFalsy();
    expect(isDefinable(Object.preventExtensions({}), 'prop')).toBeFalsy();
    expect(isDefinable(Object.preventExtensions({prop: true}), 'prop')).toBeFalsy();
    expect(isDefinable(Object.seal({}), 'prop')).toBeFalsy();
    expect(isDefinable(Object.seal({prop: true}), 'prop')).toBeFalsy();
    expect(isDefinable(Object.freeze({}), 'prop')).toBeFalsy();
    expect(isDefinable(Object.freeze({prop: true}), 'prop')).toBeFalsy();
  });
});
