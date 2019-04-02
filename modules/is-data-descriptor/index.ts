/*!
 * @module @ganuz/is-data-descriptor
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import { $function, $object } from '@pakal/type-of';
import hasOwn from '@ganuz/has-own';

/**
 * Checks if `value` is data descriptor.
 *
 * @see https://mdn.io/PropertyDescriptor
 * @remarks This function does not validate that it is a valid descriptor, it only checks if the properties of data descriptor exist,
 *  for description validation use {@link isPropertyDescriptor}.
 * @param value - The value to check.
 * @returns Returns `true` if `value` is a object and if the properties of data descriptor (value | writable) exist, otherwise `false`.
 * @example
 *
 *  isDataDescriptor(); // => false
 *  isDataDescriptor({}); // => false
 *  isDataDescriptor({foo: 'bar'}); // => false
 *  isDataDescriptor({writable: NaN}); // => true
 *  isDataDescriptor({value: 1980, color: 'green'}); // => true
 *  isDataDescriptor({value: undefined}); // => true
 *  isDataDescriptor({get(){}, value: undefined}); // => true
 *  isDataDescriptor({set(){}, writable: undefined}); // => true
 *  isDataDescriptor({set(){}, get(){}, value: 70n, writable: false}); // => true
 *
 */
function isDataDescriptor(value: any): boolean {
  return isTypeOf(value, [$function, $object]) && (hasOwn(value, 'value') || hasOwn(value, 'writable'));
}

export default isDataDescriptor;
