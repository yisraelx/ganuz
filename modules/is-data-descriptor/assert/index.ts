/*!
 * @module @ganuz/is-data-descriptor/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isDataDescriptor from '@ganuz/is-data-descriptor';

/**
 * Assert that `value` is data descriptor.
 *
 * @param value - The value to check.
 * @returns Returns `value` if `value` is data descriptor.
 * @throws Throws if `value` is not data descriptor.
 * @example
 *
 *  assertDataDescriptor(undefined); // throw TypeError
 *  assertDataDescriptor('foo'); // throw TypeError
 *  assertDataDescriptor(true); // throw TypeError
 *  assertDataDescriptor({}); // throw TypeError
 *  assertDataDescriptor({value: undefined}); // => {value: undefined}
 *  assertDataDescriptor({writable: true}); // => {writable: true}
 *  assertDataDescriptor({value: 67, get() {}}); // => {value: 67, get() {}}
 *
 */
// @ts-ignore
declare function assertDataDescriptor<TValue>(value: TValue): TValue;

// @ts-ignore
let assertDataDescriptor =
  assertify(isDataDescriptor, (value: any) => TypeError(`'${ value }' is not a data descriptor object.`));

export default assertDataDescriptor;
