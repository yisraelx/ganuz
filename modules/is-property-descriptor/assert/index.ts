/*!
 * @module @ganuz/is-property-descriptor/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isPropertyDescriptor from '@ganuz/is-property-descriptor';

/**
 * Assert that `value` is property descriptor.
 *
 * @param value - The value to check.
 * @returns Returns `value` if `value` is valid property descriptor.
 * @throws Throws if `value is not valid property descriptor.
 * @example
 *
 *  assertPropertyDescriptor(null); // throw TypeError
 *  assertPropertyDescriptor(false); // throw TypeError
 *  assertPropertyDescriptor({set: []}); // throw TypeError
 *  assertPropertyDescriptor({get() {}, writable: false}); // throw TypeError
 *  assertPropertyDescriptor({set: undefined, value: 'foo'}); // throw TypeError
 *  assertPropertyDescriptor({}); // => {}
 *  assertPropertyDescriptor({get: undefined}); // => {get: undefined}
 *  assertPropertyDescriptor({enumerable: true}); // => {enumerable: true}
 *  assertPropertyDescriptor({value: NaN}); // => {value: NaN}
 *
 */
// @ts-ignore
declare function assertPropertyDescriptor<TValue>(value: TValue): TValue;

// @ts-ignore
let assertPropertyDescriptor =
  assertify(isPropertyDescriptor, (value: any) => TypeError(`'${ value }' is not a property descriptor object.`));

export default assertPropertyDescriptor;
