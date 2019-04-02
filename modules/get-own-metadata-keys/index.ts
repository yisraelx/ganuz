/*!
 * @module @ganuz/get-own-metadata-keys
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import _getMetadataMap from '@ganuz/_get-metadata-map';

/**
 *
 * @resource https://rbuckton.github.io/reflect-metadata/#reflect.getownmetadatakeys
 * @remarks It is based on es6 `WeakMap` and `Map` no need for polyfill (built-in library support).
 * @param target - The target in which to look for the metadata keys.
 * @param property - The property of target in which to look for the metadata keys.
 * @returns Returns The metadata keys of the target.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getOwnMetadataKeys(null); // throw TypeError
 *  getOwnMetadataKeys({}); // => []
 *  class C{ \@Metadata(Number, 0) prop: string; }
 *  getOwnMetadataKeys(C.prototype, 'prop'); // => [Number]
 *
 * @example
 *
 *  class Some {}
 *
 *  class Other extends Some{}
 *
 *  defineMetadata(Number, 777, Some);
 *  defineMetadata('foo', 'bar', Some);
 *  defineMetadata('color', 'blue', Some, 'prop');
 *  defineMetadata(Object, null, Some, 'prop');
 *  defineMetadata(String, 'word', Other);
 *  defineMetadata(Function, Object, Other);
 *  defineMetadata('color', 'red', Other, 'prop');
 *
 *  getOwnMetadataKeys(Some); => [Number, 'foo']
 *  getOwnMetadataKeys(Some, 'prop'); => ['color', Object]
 *  getOwnMetadataKeys(Other); => [String, Function]
 *  getOwnMetadataKeys(Other, 'prop'); => ['color']
 *
 */
function getOwnMetadataKeys(target: object, property?: PropertyKey): any[] {
  let keys: any[] = [];
  _getMetadataMap(target, property).forEach((__, key: any) => keys.push(key));
  return keys;
}

export default getOwnMetadataKeys;
