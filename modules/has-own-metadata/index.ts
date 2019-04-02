/*!
 * @module @ganuz/has-own-metadata
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import _getMetadataMap from '@ganuz/_get-metadata-map';

/**
 *
 * @resource https://rbuckton.github.io/reflect-metadata/#reflect.hasownmetadata
 * @remarks It is based on es6 `WeakMap` and `Map` no need for polyfill (built-in library support).
 * @param key - The metadata key to check.
 * @param target - The target in which to look for the metadata key.
 * @param property - The property of target in which to look for the metadata key.
 * @returns Returns `true` if `key` exists in metadata of target, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  hasOwnMetadata('key', null, 'prop'); // throw TypeError
 *  hasOwnMetadata('key', class {}, 'prop'); // => false
 *
 *  class C{}
 *  defineMetadata('foo', 'bar', C);
 *  hasOwnMetadata('foo', C); // => true
 *
 *  @example
 *
 *   let a = Object.create(null);
 *   let b = Object.create(a);
 *
 *   defineMetadata(BigInt, 55n, a);
 *   defineMetadata('foo', 'bar', a);
 *   defineMetadata(BigInt, -15n, b);
 *   defineMetadata('drink', 'beer', b);
 *
 *   hasOwnMetadata(BigInt, a); // => true
 *   hasOwnMetadata('foo', a); // => true
 *   hasOwnMetadata('drink', a); // => false
 *   hasOwnMetadata(BigInt, b); // => true
 *   hasOwnMetadata('foo', b); // => false
 *   hasOwnMetadata('drink', b); // => true
 *
 */
function hasOwnMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return _getMetadataMap(target, property).has(key);
}

export default hasOwnMetadata;
