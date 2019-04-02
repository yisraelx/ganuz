/*!
 * @module @ganuz/get-own-metadata
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import _getMetadataMap from '@ganuz/_get-metadata-map';

/**
 *
 * @resource https://rbuckton.github.io/reflect-metadata/#reflect.getownmetadata
 * @remarks It is based on es6 `WeakMap` and `Map` no need for polyfill (built-in library support).
 * @param key - The metadata key of the value.
 * @param target - The target in which to look for the metadata key.
 * @param property - The property of target in which to look for the metadata key.
 * @returns Returns the value of `key` in metadata of the target if it exists, otherwise `undefined`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getOwnMetadata('key', null, 'prop'); // throw TypeError
 *  getOwnMetadata('key', {}); // => undefined
 *  class Some{ \@Metadata('foo', 'bar') static prop: string; }
 *  getOwnMetadata('foo', Some, 'prop'); // => 'bar'
 *
 * @example
 *
 *  \@Metadata('foo', 'bar')
 *  class A {
 *      \@Metadata('name', 'bob') prop: string;
 *  }
 *
 *  \@Metadata('num', -97)
 *  class B extends A {
 *      \@Metadata('name', 'alice') prop: string;
 *  }
 *
 *  getOwnMetadata('foo', A); // => 'bar'
 *  getOwnMetadata('num', A); // => undefined
 *  getOwnMetadata('name', A.prototype, 'prop'); // => 'bob'
 *
 *  getOwnMetadata('foo', B); // => undefined
 *  getOwnMetadata('num', B); // => -97
 *  getOwnMetadata('name', B.prototype, 'prop'); // => 'alice'
 *
 */
function getOwnMetadata(key: any, target: object, property?: PropertyKey): any | undefined {
  return _getMetadataMap(target, property).get(key);
}

export default getOwnMetadata;
