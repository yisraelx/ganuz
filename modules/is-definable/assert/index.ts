/*!
 * @module @ganuz/is-definable/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isDefinable from '@ganuz/is-definable';

/**
 * Assert that `property` of `target` is definable.
 *
 * @param target - A target to check.
 * @param property - A property key to check.
 * @returns Returns `target` if `property` of `target` is definable.
 * @throws Throws if `property` of `target` is not definable.
 * @example
 *
 *  assertDefinable({color: 'red'}, 'color'); // => {color: 'red'};
 *  assertDefinable([1], 1); // => [1];
 *  assertDefinable(Object.freeze({foo: 'bar'}), 'foo'); // throw TypeError
 *  assertDefinable(Object.create(null, {foo: {value: 'bar'}}), foo); // throw TypeError
 *
 */
// @ts-ignore
declare function assertDefinable<TTarget extends object>(target: TTarget, property: PropertyKey): TTarget;

// @ts-ignore
let assertDefinable =
  assertify(isDefinable, (target: object, property: PropertyKey) => TypeError(`'${ String(property) }' of '${ target }' is not a definable.`));

export default assertDefinable;
