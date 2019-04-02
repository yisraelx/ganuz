/*!
 * @module @ganuz/define-metadata-with
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $undefined } from '@pakal/type-of';
import defineMetadata from '@ganuz/define-metadata';
import getOwnMetadata from '@ganuz/get-own-metadata';

/**
 *
 * @param key - The metadata key.
 * @param value - The metadata value.
 * @param callback - A function to adjust the old and new metadata pre define.
 * @param target - The target in which to define the metadata.
 * @param property - The property of target in which to define the metadata.
 * @throws Throws if `target` is not object.
 * @throws Throws if `callback` is not function.
 * @example
 *
 *  defineMetadataWith('key', 'data', () => {}, 'foo', 'prop'); // throw TypeError
 *  defineMetadataWith('key', 'data', {}, {}, 'prop'); // throw TypeError
 *  defineMetadataWith('key', 'data', () => {}, {}); // => void
 *  defineMetadataWith('key', 'data', (o, n) => o || n, {}, 'prop'); // => void
 *  defineMetadataWith('key', 'data', () => 'some', class {}); // => void
 *
 */
function defineMetadataWith(key: any, value: any, callback: (oldValue: any, newValue: any, key: any, target: object, property: PropertyKey) => void | any, target: object, property?: PropertyKey): void {
  assertTypeOf(callback, $function);

  let oldValue: any = getOwnMetadata(key, target, property);
  let result: any = callback(oldValue, value, key, target, property);
  if (!isTypeOf(result, $undefined)) {
    value = result;
  }

  defineMetadata(key, value, target, property);
}

export default defineMetadataWith;
