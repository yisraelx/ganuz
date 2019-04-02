/*!
 * @module @ganuz/each
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function } from '@pakal/type-of';
import apply from '@ganuz/apply';
import ownKeys from '@ganuz/own-keys';

/**
 * Invokes `callback` for each own property (names and symbols) of `target`.
 *
 * @param target - A target to iteratee of is properties.
 * @param callback - A function to invokes of each property of `target`.
 * @returns Returns the given `target`.
 * @throws Throws if `target` is not object.
 * @throws Throws if `callback` is not a callable function.
 * @example
 *
 *  let target = Object.create({num: 55}, {
 *      name: {value: 'alice', writable: true},
 *      foo: {get(){ return 'bar'; },
 *      [Symbol('color')]: {value: 'red'}
 *  };
 *
 *  each(target, (value, key, object) => console.log(`object['${key}'] = ${object[key]};`) === target;
 *  // => 'object['name'] = 'alice';'
 *  // => 'object['foo'] = 'bar';'
 *  // => 'object['Symbol(color)'] = 'red';'
 *  // => true
 *
 * @example
 *
 *  let array = [6, -1, NaN, 88, 0.5];
 *
 *  each(array, (value) => value === value && console.log(value)) === array;
 *  // => 6
 *  // => -1
 *  // => true
 *
 */
function each<TTarget extends object>(target: TTarget, callback: (value: any, key: PropertyKey, target: TTarget) => boolean | any): TTarget {
  assertTypeOf(callback, $function);

  let keys: PropertyKey[] = ownKeys(target);

  for (let key of keys) {
    let value: any = target[key];
    if (apply(callback, undefined, [value, key, target]) === false) {
      break;
    }
  }

  return target;
}

export default each;
