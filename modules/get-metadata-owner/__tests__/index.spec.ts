import defineMetadata from '@ganuz/define-metadata';
import getMetadataOwner from '../';

describe(`getMetadataOwner()`, () => {
  it(`should be a function`, () => {
    expect(getMetadataOwner).toBeFunction();
  });

  it('should throw if target is primitive', () => {
    expect(() => getMetadataOwner('key', null)).toThrow();
    expect(() => getMetadataOwner('key', false as any, 'prop')).toThrow();
  });

  it(`should return null for not exist key`, () => {
    expect(getMetadataOwner('foo', Object.create({}))).toBeNull();
    expect(getMetadataOwner('key', class {
    }, 'prop')).toBeNull();
    expect(getMetadataOwner(Symbol('foo'), Object.create(null), Symbol('foo'))).toBeNull();
  });

  it(`should return key owner`, () => {
    class Some {
    }

    class Other extends Some {
    }

    class Anther extends Other {
    }

    let propSym: symbol = Symbol('prop');

    defineMetadata('value', 'bar', Anther, 'foo');
    defineMetadata('foo', 'bar', Some);
    defineMetadata(String, 'car', Some, propSym);
    defineMetadata(Number, 1, Other, 'prop');
    defineMetadata(Number, -1, Anther, 'prop');
    defineMetadata(String, 'beer', Other, propSym);
    defineMetadata('jeep', true, Other);

    expect(getMetadataOwner('value', Anther, 'foo')).toBe(Anther);
    expect(getMetadataOwner('value', Other, 'foo')).toBeNull();
    expect(getMetadataOwner('value', Some, 'foo')).toBeNull();
    expect(getMetadataOwner(String, Anther, propSym)).toBe(Other);
    expect(getMetadataOwner(String, Other, propSym)).toBe(Other);
    expect(getMetadataOwner(String, Some, propSym)).toBe(Some);
    expect(getMetadataOwner(Number, Anther, 'prop')).toBe(Anther);
    expect(getMetadataOwner(Number, Other, 'prop')).toBe(Other);
    expect(getMetadataOwner(Number, Some, 'prop')).toBeNull();
    expect(getMetadataOwner('jeep', Anther)).toBe(Other);
    expect(getMetadataOwner('jeep', Other)).toBe(Other);
    expect(getMetadataOwner('jeep', Some)).toBeNull();
  });
});
