/*!
 * @module @ganuz/has-own
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

let Object$_hasOwnProperty: Object['hasOwnProperty'] = Object.prototype.hasOwnProperty;

/**
 * Checks if `target` has own `property`.
 *
 * @see https://mdn.io/Object.hasOwnProperty
 * @resource https://www.ecma-international.org/ecma-262/#sec-object.prototype.hasownproperty
 * @param target - A target to check if own the property.
 * @param property - A property key to check if `target` own.
 * @returns Returns `true` if `target` own the `property`, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  hasOwn(null, 'foo'); // throw TypeError
 *  hasOwn(undefined, 0); // throw TypeError
 *  hasOwn('foo', 'toString'); // throw TypeError
 *  hasOwn([], 'length'); // => true
 *  hasOwn(Object, 'create'); // => true
 *  hasOwn({foo: 'bar'}, 'foo'); // => true
 *  hasOwn(Object.create({foo: 'bar'}), 'foo'); // => false
 *
 */
function hasOwn(target: object, property: PropertyKey): boolean {
  return Object$_hasOwnProperty.call(assertTypeOf(target, [$function, $object]), property);
}

export default hasOwn;
