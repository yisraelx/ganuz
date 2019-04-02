import defineMetadata from '@ganuz/define-metadata';
import getMetadataKeys from '@ganuz/get-metadata-keys';

describe('getMetadataKeys()', () => {
  it(`should be a function`, () => {
    expect(getMetadataKeys).toBeFunction();
  });

  it('should throw if target primitive', () => {
    expect(() => getMetadataKeys(null)).toThrow();
    expect(() => getMetadataKeys(Infinity as any, 'prop')).toThrow();
  });

  it('should return empty array if not exists metadata', () => {
    expect(getMetadataKeys(Object.create(null))).toEqual([]);
    expect(getMetadataKeys(class {
    }, 'prop')).toEqual([]);
  });

  it('should return target metadata keys', () => {
    class Cool {
    }

    defineMetadata('foo', 'bar', Cool);
    defineMetadata(Function, Object, Cool);
    defineMetadata(Symbol.for('data'), [0, 1, 2], Cool, 'prop');
    defineMetadata(0, false, Cool, 'prop');

    expect(getMetadataKeys(Cool)).toEqual(['foo', Function]);
    expect(getMetadataKeys(Cool, 'prop')).toEqual([Symbol.for('data'), 0]);
    expect(getMetadataKeys(Cool, 'foo')).toEqual([]);
  });

  it('should return target metadata keys in prototype chain', () => {
    class Animal {
    }

    class Cat extends Animal {
    }

    let nameSym = Symbol('name');
    let data = Object.create(null);

    expect(getMetadataKeys(Animal)).toEqual([]);
    expect(getMetadataKeys(Cat)).toEqual([]);

    defineMetadata(nameSym, 'Animal', Animal);
    expect(getMetadataKeys(Cat)).toEqual([nameSym]);
    defineMetadata(nameSym, 'Cat', Cat);
    defineMetadata('age', 0, Cat);

    expect(getMetadataKeys(Animal)).toEqual([nameSym]);
    expect(getMetadataKeys(Cat)).toEqual([nameSym, 'age']);

    defineMetadata('age', NaN, Animal);
    defineMetadata(data, null, Animal);
    expect(getMetadataKeys(Animal)).toEqual([nameSym, 'age', data]);
    expect(getMetadataKeys(Cat)).toEqual([nameSym, 'age', data]);
  });
});
