/*!
 * @module @ganuz/get-metadata-keys
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import eachPrototypeOf from '@ganuz/each-prototype-of';
import getOwnMetadataKeys from '@ganuz/get-own-metadata-keys';

/**
 *
 * @resource https://rbuckton.github.io/reflect-metadata/#reflect.getmetadatakeys
 * @remarks It is based on es6 `WeakMap` and `Map` no need for polyfill (built-in library support).
 * @param target - The target in which to look for the metadata keys.
 * @param property - The property of target in which to look for the metadata keys.
 * @returns Returns The metadata keys of the target in the prototype chain.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getMetadataKeys('foo'); // throw TypeError
 *  getMetadataKeys({}, Symbol('some')); // => []
 *  getMetadataKeys(class {}); // => []
 *
 * @example
 *
 *  let a = {};
 *  let b = Object.setPrototypeOf({}, a);
 *
 *  defineMetadata('foo', 'bar', a);
 *  defineMetadata(Function, Object, a);
 *  defineMetadata(false, 'no', a, 'prop');
 *
 *  getMetadataKeys(a); => ['foo', Function]
 *  getMetadataKeys(a, 'prop'); => [false]
 *
 *  defineMetadata('foo', 'bob', b);
 *  defineMetadata(Symbol('color'), 'red', b);
 *  defineMetadata(0, null, b, 'prop');
 *  defineMetadata(NaN, false, b, 'prop');
 *
 *  getMetadataKeys(b); => ['foo', Function, Symbol('color')]
 *  getMetadataKeys(b, 'prop'); => [false, 0, NaN]
 *
 */
function getMetadataKeys(target: object, property?: PropertyKey): any[] {
  let result: any[] = [];

  eachPrototypeOf(target, (proto: object) => {

    let keys: any[] = getOwnMetadataKeys(proto, property);
    if (!result.length) {
      result = keys;
      return;
    }

    for (let key of keys) {
      if (result.indexOf(key) < 0) {
        result.push(key);
      }
    }
  });

  return result;
}

export default getMetadataKeys;
