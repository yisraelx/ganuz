/*!
 * @module @ganuz/is-accessor-descriptor
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import { $function, $object } from '@pakal/type-of';
import hasOwn from '@ganuz/has-own';

/**
 * Checks if `value` is accessor descriptor.
 *
 * @see https://mdn.io/PropertyDescriptor
 * @remarks This function does not validate that it is a valid descriptor, it only checks if the properties of data descriptor exist,
 *  for description validation use {@link isPropertyDescriptor}.
 * @param value - The value to check.
 * @returns Returns `true` if `value` is a object and if the properties of accessor descriptor (get | set) exist, otherwise `false`.
 * @example
 *
 *  isAccessorDescriptor(); // => false
 *  isAccessorDescriptor({}); // => false
 *  isAccessorDescriptor({color: 'red'}); // => false
 *  isAccessorDescriptor({get: undefined}); // => true
 *  isAccessorDescriptor({get: undefined, enumerable: NaN}); // => true
 *  isAccessorDescriptor({get: []}); // => true
 *  isAccessorDescriptor({set: 78, value: {}}); // => true
 *  isAccessorDescriptor({get(){}, writable: true}); // => true
 *  isAccessorDescriptor({get: undefined, value: 88, writable: true}); // => true
 *
 */
function isAccessorDescriptor(value: any): boolean {
  return isTypeOf(value, [$function, $object]) && (hasOwn(value, 'get') || hasOwn(value, 'set'));
}

export default isAccessorDescriptor;
