/*!
 * @module @ganuz/is-configurable
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';

const CONFIGURABLE_DEFAULT = {configurable: true};

/**
 * Checks if `property` of `target` is configurable.
 *
 * @see https://mdn.io/PropertyDescriptor.configurable
 * @param target - A target to check.
 * @param property - A property key to check.
 * @returns Returns `true` if `property` of `target` is configurable, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  isConfigurable(null, 'foo'); // throw TypeError
 *  isConfigurable({ foo: 'bar'}, 'foo'); // => true
 *  isConfigurable({}, 'foo'); // => true
 *  isConfigurable(class { static foo = 'bar'; }, 'foo'); // => true
 *  isConfigurable(Object.create(Object.create({}, {foo: {value: 'bar'}})), 'foo'); // => true
 *  isConfigurable(Object.create({}, {foo: {value: 'bar'}}), 'foo'); // => false
 *  isConfigurable([], 'length'); // => false
 *  isConfigurable(Object.freeze({foo: 'bar'}), 'foo'); // => false
 *
 */
function isConfigurable<TTarget extends object>(target: TTarget, property: PropertyKey): boolean {
  assertTypeOf(target, [$function, $object]);
  return (getOwnPropertyDescriptor(target, property) || CONFIGURABLE_DEFAULT).configurable;
}

export default isConfigurable;
