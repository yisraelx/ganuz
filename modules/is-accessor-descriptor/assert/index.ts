/*!
 * @module @ganuz/is-accessor-descriptor/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isAccessorDescriptor from '@ganuz/is-accessor-descriptor';

/**
 * Assert that `value` is accessor descriptor.
 *
 * @param value - The value to check.
 * @returns Returns `true` if `descriptor` is accessor descriptor.
 * @throws Throws if `value` is not accessor descriptor.
 * @example
 *
 *  assertAccessorDescriptor(null); // throw
 *  assertAccessorDescriptor('foo'); // throw
 *  assertAccessorDescriptor({}); // throw
 *  assertAccessorDescriptor({get: undefined}); // => {get: undefined}
 *  assertAccessorDescriptor({set(v) {}, value: 35}); // => {set(v) {}, value: 35}
 *
 */
// @ts-ignore
declare function assertAccessorDescriptor<TValue>(value: TValue): TValue;

// @ts-ignore
let assertAccessorDescriptor =
  assertify(isAccessorDescriptor, (value: any) => TypeError(`'${ value }' is not a accessor descriptor object.`));

export default assertAccessorDescriptor;
