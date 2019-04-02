/*!
 * @module @ganuz/has-metadata
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getMetadataOwner from '@ganuz/get-metadata-owner';

/**
 *
 * @resource https://rbuckton.github.io/reflect-metadata/#reflect.hasmetadata
 * @remarks It is based on es6 `WeakMap` and `Map` no need for polyfill (built-in library support).
 * @param key - The metadata key to check.
 * @param target - The target in which to look for the metadata key.
 * @param property - The property of target in which to look for the metadata key.
 * @returns Returns `true` if `key` exists in metadata of target in the prototype chain, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  hasMetadata('foo', null); // throw TypeError
 *  hasMetadata('foo', {}); // => false
 *  class C{ \@Metadata(String, 'cool') [Symbol.for('some')]: string; }
 *  hasMetadata(String, C.prototype, Symbol.for('some')); // => true
 *
 * @example
 *
 *  class Some{}
 *  defineMetadata('foo', 'bar', Some);
 *  hasMetadata('foo', Some); // => true
 *  class Other extends Some {}
 *  hasMetadata('foo', Other); // => true
 *
 */
function hasMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return !!getMetadataOwner(key, target, property);
}

export default hasMetadata;
