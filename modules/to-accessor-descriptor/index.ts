/*!
 * @module @ganuz/to-accessor-descriptor
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import toPropertyDescriptor, { IPropertyDescriptorOptions, } from '@ganuz/to-property-descriptor';
import isTypeOf from '@pakal/is-type-of';
import { $undefined } from '@pakal/type-of';

const ACCESSOR_DESCRIPTOR_DEFAULT_OPTIONS: PropertyDescriptor = toPropertyDescriptor({}, 'c');

/**
 * Create accessor `PropertyDescriptor` from `options` and set `get` and `set` to descriptor.
 *
 * @see https://mdn.io/defineProperty#Description
 * @see https://mdn.io/Property_Accessors
 * @param get - A getter function to set to descriptor 'get' property (if is not a function it will be `undefined`).
 * @param set - A setter function to set to descriptor 'set' property (if is not a function it will be `undefined`).
 * @param [options = {configurable: true, enumerable: false}] - The `options` param of {@link toPropertyDescriptor}.
 * @returns Returns valid accessor property descriptor that create from `get`, `set` and `options`.
 * @example
 *
 *  toAccessorDescriptor(); // => {configurable: true, enumerable: false, get: undefined, set: undefined}
 *  toAccessorDescriptor(4, 'foo', 1); // => {configurable: true, enumerable: true, get: undefined, set: undefined}
 *  toAccessorDescriptor(() => true); // => {configurable: true, enumerable: false, get: () => true, set: undefined}
 *  toAccessorDescriptor(undefined, v => {}); // => {configurable: true, enumerable: false, get: undefined, set: v => {})
 *  toAccessorDescriptor(() => -1, v => {}); // => {configurable: true, enumerable: false, get: () => -1, set: v => {})
 *  toAccessorDescriptor(() => 45, 0, 'ew'); // => {configurable: false, enumerable: true, get: () => 45, set: undefined}
 *  toAccessorDescriptor(null, 'set', true); // => {configurable: true, enumerable: true, get: undefined, set: undefined}
 *  toAccessorDescriptor(1, 1, {enumerable: 58, writable: false, get: () => 'foo'); // => {configurable: false, enumerable: true, get: () => 45, set: undefined}
 *  toAccessorDescriptor(Object, Function, false); // => {configurable: false, enumerable: false, get: Object, set: Function}
 *  toAccessorDescriptor(0, v => {}, {}); // => {configurable: false, enumerable: false, get: undefined, set: v => {}}
 *
 */
function toAccessorDescriptor<TValue extends any>(get?: () => TValue | any, set?: (value: TValue) => void | any, options?: IPropertyDescriptorOptions): TypedPropertyDescriptor<TValue> {
  return toPropertyDescriptor({
    get,
    set
  }, isTypeOf(options, $undefined) ? ACCESSOR_DESCRIPTOR_DEFAULT_OPTIONS : options);
}

export default toAccessorDescriptor;
