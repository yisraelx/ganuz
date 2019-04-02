/*!
 * @module @ganuz/each-properties
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import apply from '@ganuz/apply';
import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';
import ownKeys from '@ganuz/own-keys';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function } from '@pakal/type-of';

/**
 * Invokes `callback` for each own property (names and symbols) descriptor of `target`.
 *
 * @param target - A target to iteratee of is properties descriptors.
 * @param callback - A function to invokes of each property descriptor of `target`.
 * @returns Returns the given `target`.
 * @throws Throws if `target` is not object.
 * @throws Throws if `callback` is not a callable function.
 * @example
 *
 *  let target = Object.create({foo: 'bar'}, {
 *    [Symbol.toStringTag]: {value: 'Some'},
 *    fn: {value: String, writable: true},
 *    prop: {get(){}},
 *  });
 *
 *  eachProperties(target, (descriptor, property) => console.log(`${property}: ${isDataDescriptor(descriptor)}`) === target;
 *  // => 'Symbol(Symbol.toStringTag): true'
 *  // => 'fn: true'
 *  // => 'prop: false'
 *  // => true
 *
 * @example
 *
 *  let object = {a: 1, b: 2, c:3};
 *  eachProperties({a: 1, b: 2, c:3}, ({value}) => value !== 2 && console.log(value)) === object;
 *  // => 1
 *  // => true
 *
 */
function eachProperties<TTarget extends object>(target: TTarget, callback: (descriptor: PropertyDescriptor, key: PropertyKey, target: TTarget) => boolean | any): TTarget {
  assertTypeOf(callback, $function);

  let keys: PropertyKey[] = ownKeys(target);

  for (let key of keys) {
    let descriptor: PropertyDescriptor = getOwnPropertyDescriptor(target, key);
    if (apply(callback, undefined, [descriptor, key, target]) === false) {
      break;
    }
  }

  return target;
}

export default eachProperties;
