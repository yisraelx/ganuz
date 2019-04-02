/*!
 * @module @ganuz/is-property-descriptor
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import { $function, $object, $undefined } from '@pakal/type-of';
import isAccessorDescriptor from '@ganuz/is-accessor-descriptor';
import isDataDescriptor from '@ganuz/is-data-descriptor';

let _isValidAccessFn = (descriptor: object, key: 'get' | 'set') => isTypeOf(descriptor[key], $undefined) || isTypeOf(descriptor[key], $function);

/**
 * Checks if `value` is property descriptor.
 *
 * @see https://mdn.io/PropertyDescriptor
 * @remarks To check the kind of the descriptor use {@link isDataDescriptor} or {@link isAccessorDescriptor}
 * @param value - The value to check.
 * @returns Returns `true` if `value` is valid property descriptor, otherwise `false`.
 * @example
 *
 *  isPropertyDescriptor(); // => false
 *  isPropertyDescriptor('foo'); // => false
 *  isPropertyDescriptor({}); // => true
 *  isPropertyDescriptor({color: 'red'}); // => true
 *  isPropertyDescriptor(class {}); // => true
 *  isPropertyDescriptor({value: undefined, foo: 'bar'}); // => true
 *  isPropertyDescriptor({get: undefined}); // => true
 *  isPropertyDescriptor({set: Object, enumerable: [0, 1, 2]}); // => true
 *  isPropertyDescriptor({get(){}, value: 55}); // => false
 *  isPropertyDescriptor({get: 'foo'}); // => false
 *  isPropertyDescriptor({get(){}, set: NaN}); // => false
 *  isPropertyDescriptor({get(){}, writable: undefined}); // => false
 *  isPropertyDescriptor({set(){}, value: undefined}); // => false
 *
 */
function isPropertyDescriptor(value: any): boolean {
  return isAccessorDescriptor(value) ?
    !isDataDescriptor(value) && _isValidAccessFn(value, 'get') && _isValidAccessFn(value, 'set') :
    isTypeOf(value, [$function, $object]);
}

export default isPropertyDescriptor;
