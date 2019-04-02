/*!
 * @module @ganuz/is-enumerable
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

let Object$_propertyIsEnumerable: Object['propertyIsEnumerable'] = Object.prototype.propertyIsEnumerable;

/**
 * Checks if `property` of `target` is enumerable.
 *
 * @see https://mdn.io/PropertyDescriptor.enumerable
 * @resource https://www.ecma-international.org/ecma-262/#sec-object.prototype.propertyisenumerable
 * @param target - A target to check.
 * @param property - A property key to check.
 * @returns Returns `true` if `property` of `target` is enumerable, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  isEnumerable(null, 'foo'); // throw TypeError
 *  isEnumerable({foo: 'bar'}, 'foo'); // => true
 *  isEnumerable({[Symbol.for('foo')]: 'bar'}, Symbol.for('foo')); // => true
 *  isEnumerable({}, 'foo'); // => false
 *  isEnumerable(class {static method(){}}, 'method'); // => false
 *  isEnumerable(Object.create({foo: 'bar'})); // => false
 *  isEnumerable(Object.create({}, {foo: {value: 'bar'}})); // => false
 *
 */
function isEnumerable<TTarget extends object>(target: TTarget, property: PropertyKey): boolean {
  return Object$_propertyIsEnumerable.call(assertTypeOf(target, [$function, $object]), property);
}

export default isEnumerable;
