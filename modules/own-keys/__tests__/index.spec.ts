import { describeGlobalPatch } from '../../../config/utils/jest';
import ownKeys from '@ganuz/own-keys';

describeGlobalPatch<typeof ownKeys>('ownKeys()', 'Reflect.ownKeys', '@ganuz/own-keys', (ownKeys) => {
  it(`should be throws if target is primitive`, () => {
    expect(() => {
      ownKeys(undefined);
    }).toThrow();
    expect(() => {
      (ownKeys as any)('foo');
    }).toThrow();
  });

  it(`should return empty object own keys`, () => {
    expect(ownKeys({})).toIncludeSameMembers([]);

  });

  it(`should return array keys`, () => {
    expect(ownKeys(['a', 'b', 'c'])).toIncludeSameMembers(['0', '1', '2', 'length']);
  });

  it(`should return object with prototype own keys`, () => {
    expect(ownKeys(Object.create({name: 'bab'}, {foo: {value: 'bar'}}))).toIncludeSameMembers(['foo']);
  });

  it(`should return object own keys names and symbols`, () => {
    expect(ownKeys({
      foo: 'bar', get [Symbol.for('foo')]() {
        return this.foo;
      }, [Symbol.for('color')]: 'red'
    })).toIncludeSameMembers(['foo', Symbol.for('foo'), Symbol.for('color')]);
  });
});
