/*!
 * @module @ganuz/is-enumerable/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isEnumerable from '@ganuz/is-enumerable';

/**
 * Assert that `property` of `target` is enumerable.
 *
 * @param target - A target to check.
 * @param property - A property key to check.
 * @returns Returns `target` if `property` of `target` is enumerable.
 * @throws Throws if `property` of `target` is not enumerable.
 * @example
 *
 *  assertEnumerable({}, 'foo'); // => {}
 *  assertEnumerable({foo: 'bar'}, 'foo'); // => {foo: 'bar'}
 *  assertEnumerable(Object.create({foo: 'bar'}), 'foo'); // throw TypeError
 *  assertEnumerable(Object.create(null, {foo: {value: 'bar'}}), 'foo'); // throw TypeError
 *  assertEnumerable(Object, 'constructor'); // throw TypeError
 *
 */
// @ts-ignore
declare function assertEnumerable<TTarget extends object>(target: TTarget, property: PropertyKey): TTarget;

// @ts-ignore
let assertEnumerable =
  assertify(isEnumerable, (target: object, property: PropertyKey) => TypeError(`'${ String(property) }' of '${ target }' is not a enumerable.`));

export default assertEnumerable;
