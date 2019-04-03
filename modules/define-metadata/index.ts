/*!
 * @module @ganuz/define-metadata
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import _getMetadataMap from '@ganuz/_get-metadata-map';

/**
 *
 * @resource https://rbuckton.github.io/reflect-metadata/#reflect.definemetadata
 * @remarks It is based on es6 `WeakMap` and `Map` no need for polyfill (built-in library support).
 * @param key - The metadata key.
 * @param value - The metadata value.
 * @param target - The target in which to define the metadata.
 * @param property - The property of target in which to define the metadata.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  defineMetadata('key', 'value', null, 'prop'); // throw TypeError
 *  defineMetadata('foo', 'bar', {}); // => void
 *  defineMetadata('key', 'value', class {}, 'prop'); // => void
 *
 * @example
 *
 *  class A{}
 *  class B extends A{}
 *
 *  defineMetadata('color', 'red', B);
 *  defineMetadata(Number, 45, A);
 *  getMetadata('color', A); // => undefined
 *  getMetadata('color', B); // => 'red'
 *  getMetadata(Number, A); // => 45
 *  getMetadata(Number, B); // => 45
 *
 *  defineMetadata('color', 'green', A);
 *  defineMetadata(Number, 0x69, B);
 *  getMetadata('color', A); // => 'green'
 *  getMetadata('color', B); // => 'red'
 *  getMetadata(Number, A); // => 45
 *  getMetadata(Number, B); // => 105
 *
 */
function defineMetadata(key: any, value: any, target: object, property?: PropertyKey): void {
  _getMetadataMap(target, property, true).set(key, value);
}

export default defineMetadata;
