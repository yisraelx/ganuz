/*!
 * @module @ganuz/get-metadata
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getMetadataOwner from '@ganuz/get-metadata-owner';
import getOwnMetadata from '@ganuz/get-own-metadata';

/**
 *
 * @resource https://rbuckton.github.io/reflect-metadata/#reflect.getmetadata
 * @remarks It is based on es6 `WeakMap` and `Map` no need for polyfill (built-in library support).
 * @param key - The metadata key of the value.
 * @param target - The target in which to look for the metadata key.
 * @param property - The property of target in which to look for the metadata key.
 * @returns Returns the value of `key` in metadata of the target in the prototype chain if it exists, otherwise `undefined`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getMetadata('foo', NaN, 'some'); // throw TypeError
 *  getMetadata(Symbol('foo'), {}, Symbol('some')); // => undefined
 *  getMetadata('foo', class {}); // => undefined
 *
 * @example
 *
 *  let some = Object.create(null);
 *  let other = Object.create(some);
 *
 *  defineMetadata(Symbol.for('colors'), {red: true}, some);
 *  defineMetadata(String, 'cool', other, Symbol.for('prop'));
 *
 *  getMetadata(Symbol.for('colors'), some); // => {red: true}
 *  getMetadata(String, some, Symbol.for('prop')); // => undefined
 *  getMetadata(Symbol.for('colors'), other); // => {red: true}
 *  getMetadata(String, other, Symbol.for('prop')); // => 'cool'
 *
 *  defineMetadata(String, 'fun', some, Symbol.for('prop'));
 *
 *  getMetadata(String, some, Symbol.for('prop')); // => 'fun'
 *  getMetadata(String, other, Symbol.for('prop')); // => 'cool'
 *
 */
function getMetadata(key: any, target: object, property?: PropertyKey): any | undefined {
  let owner: object = getMetadataOwner(key, target, property);
  return owner ? getOwnMetadata(key, owner, property) : undefined;
}

export default getMetadata;
