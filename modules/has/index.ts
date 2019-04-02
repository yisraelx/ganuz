/*!
 * @module @ganuz/has
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

/**
 * Checks if `target` has `property`.
 *
 * @see https://mdn.io/Reflect.has
 * @see https://mdn.io/Operators_in
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.has
 * @param target - A target to check if has a property.
 * @param property - A property key to check if `target` has the property.
 * @returns Returns `true` if `target` has the `property`, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  has([1], 0); // => true
 *  has(null, 'foo'); // throw TypeError
 *  has(v => v, 'prototype'); // => false
 *  has('foo', 'toString'); // throw TypeError
 *  has(1, 'valueOf'); // throw TypeError
 *  has({color: 'green'}, 'color'); // => true
 *  has(Object.create({foo: 'bar'}), 'foo'); // => true
 *
 */
function has(target: object, property: PropertyKey): boolean {
  assertTypeOf(target, [$function, $object]);
  return property in target;
}

// @ts-ignore
has = getGlobal('Reflect.has', has);

export default has;
