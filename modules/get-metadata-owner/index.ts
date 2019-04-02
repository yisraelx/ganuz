/*!
 * @module @ganuz/get-metadata-owner
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import findPrototypeOf from '@ganuz/find-prototype-of';
import hasOwnMetadata from '@ganuz/has-own-metadata';

/**
 * @param key - The metadata key in which to look for the owner.
 * @param target - The target in which to look for the metadata owner.
 * @param property - The property of target in which to look for the metadata owner.
 * @returns Returns the owner of metadata `key` in metadata of the prototype chain if it exists, otherwise `null`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getMetadataOwner('foo', NaN, 'prop'); // throw TypeError
 *  getMetadataOwner('foo', {}); // => null
 *  getMetadataOwner('foo', class {}, 'prop'); // => null
 *
 * @example
 *
 *  class A {}
 *  class B extends A {}
 *  class C extends B {}
 *
 *  defineMetadata('a', 1, A);
 *  defineMetadata('b', 2, B);
 *  defineMetadata('c', 3, C);
 *
 *  getMetadataOwner('a', C); // => A
 *  getMetadataOwner('b', A); // => null
 *  getMetadataOwner('b', B); // => B
 *
 *  defineMetadata('color', 'red', A);
 *  defineMetadata('color', 'blue', C);
 *
 *  getMetadataOwner('color', A); // => A
 *  getMetadataOwner('color', B); // => A
 *  getMetadataOwner('color', C); // => C
 *
 *  defineMetadata('foo', 'bar', B);
 *
 *  getMetadataOwner('foo', A); // => null
 *  getMetadataOwner('foo', B); // => B
 *  getMetadataOwner('foo', C); // => B
 */
function getMetadataOwner(key: any, target: object, property?: PropertyKey): object | null {
  return findPrototypeOf(target, (proto: object) => hasOwnMetadata(key, proto, property));
}

export default getMetadataOwner;
