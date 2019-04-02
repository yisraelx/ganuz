/*!
 * @module @ganuz/is-definable
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isConfigurable from '@ganuz/is-configurable';
import isExtensible from '@ganuz/is-extensible';

/**
 * Checks if `property` of `target` is definable.
 *
 * @param target - A target to check.
 * @param property - A property key to check.
 * @returns Returns `true` if `property` of `target` is definable, otherwise `false`.
 * @throws Throws if target is not object.
 * @example
 *
 *  isDefinable(null, 'prop'); // throw TypeError
 *  isDefinable({}, 'foo'); // => true
 *  isDefinable({foo: 'bar'}, 'foo'); // => true
 *  isDefinable({get some(){}}, 'some'); // => true
 *  isDefinable(Object.create({}, {color: {value: 'red', writable: false, configurable: true}}), 'foo'); // => true
 *  isDefinable(Object.create({}, {foo: {value: 'bar', writable: true, configurable: false}}), 'foo'); // => false
 *  isDefinable(Object.preventExtensions({num: 88}), 'num'); // => false
 *  isDefinable(Object.seal({}), 'car'); // => false
 *
 */
function isDefinable(target: object, property: PropertyKey): boolean {
  return isExtensible(target) && isConfigurable(target, property);
}

export default isDefinable;
