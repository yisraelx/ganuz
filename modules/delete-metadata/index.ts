/*!
 * @module @ganuz/delete-metadata
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import _getMetadataMap from '@ganuz/_get-metadata-map';

/**
 *
 * @resource https://rbuckton.github.io/reflect-metadata/#reflect.deletemetadata
 * @remarks It is based on es6 `WeakMap` and `Map` no need for polyfill (built-in library support).
 * @param key - The metadata key to delete.
 * @param target - The target in which to look for the metadata key.
 * @param property - The property of target in which to look for the metadata key.
 * @returns Returns `true` if `key` exists in metadata of target, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  deleteMetadata('foo', null); // throw TypeError
 *  deleteMetadata('key', {}, 'prop'); // => false
 *  class Some { \@Metadata('foo', 'bar') prop; }
 *  deleteMetadata('foo', new Some, 'prop'); // => false
 *  deleteMetadata('foo', Some.prototype, 'prop'); // => true
 *
 * @example
 *
 *  \@Metadata(color: 'red') class A {}
 *  class B extends A {}
 *  \@Metadata(color: 'green') class C extends B{}
 *
 *  deleteMetadata('color', B); // => false
 *  getMetadata('color', B); // => 'red'
 *  deleteMetadata('color', C); // => true
 *  getMetadata('color', C); // => 'red'
 *  deleteMetadata('color', C); // => false
 *  getMetadata('color', C); // => 'red'
 *  deleteMetadata('color', A); // => true
 *  getMetadata('color', C); // => undefined
 *
 */
function deleteMetadata(key: any, target: object, property?: PropertyKey): boolean {
  return _getMetadataMap(target, property).delete(key);
}

export default deleteMetadata;
