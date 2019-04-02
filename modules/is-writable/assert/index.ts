/*!
 * @module @ganuz/is-writable/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isWritable from '@ganuz/is-writable';

/**
 * Assert that `property` of `target` is writable.
 *
 * @param target - A target to check.
 * @param property - A property key to check.
 * @returns Returns `target` if `property` of `target` is writable.
 * @throws Throws if `property` of `target` is not writable.
 * @example
 *
 *  assertWritable({}, 'foo'); // => {}
 *  assertWritable({foo: 'bar'}, 'foo'); // => {foo: 'bar'}
 *  assertWritable(Object.create({}, {foo: {value: 'bar'}}), 'foo'); // throw TypeError
 *  assertWritable(Object.freeze({foo: 'bar'}), 'foo'); // throw TypeError
 *
 */
// @ts-ignore
declare function assertWritable<TTarget extends object>(target: TTarget, property: PropertyKey): TTarget;

// @ts-ignore
let assertWritable =
  assertify(isWritable, (target: object, property: PropertyKey) => TypeError(`'${ String(property) }' of '${ target }' is not a writable.`));

export default assertWritable;
