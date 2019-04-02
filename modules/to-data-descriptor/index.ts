/*!
 * @module @ganuz/to-data-descriptor
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import { $undefined } from '@pakal/type-of';
import toPropertyDescriptor, {
  IPropertyDescriptorOptions
} from '@ganuz/to-property-descriptor';

const DATA_DESCRIPTOR_DEFAULT_OPTIONS: PropertyDescriptor = toPropertyDescriptor({}, 'cew');

/**
 * Create data `PropertyDescriptor` from `options` and set `value` to descriptor.
 *
 * @see https://mdn.io/defineProperty#Description
 * @param value - A value to set to descriptor 'value' property.
 * @param [options = {configurable: true, enumerable: true, writable: true}] - The `options` param of {@link toPropertyDescriptor}.
 * @returns Returns valid data property descriptor that create from `value` and `options`.
 * @example
 *
 *  toDataDescriptor(); // => {configurable: true, enumerable: true, writable: true, value: undefined}
 *  toDataDescriptor(Symbol.for('foo')); // => {configurable: true, enumerable: true, writable: true, value: Symbol.for('foo')}
 *  toDataDescriptor({}, 0); // => {configurable: false, enumerable: false, writable: false, value: {}}
 *  toDataDescriptor(-1, {}); // => {configurable: false, enumerable: false, writable: false, value: -1}
 *  toDataDescriptor('foo', true); // => {configurable: true, enumerable: true, writable: true, value: 'foo'}
 *  toDataDescriptor(45, 'cw'); // => {configurable: true, enumerable: false, writable: true, value: 45}
 *  toDataDescriptor(Object, 74); // => {configurable: true, enumerable: true, writable: true, value: Object}
 *  toDataDescriptor(NaN, {configurable: true, get(){}}); // => {configurable: true, enumerable: false, writable: false, value: NaN}
 *  toDataDescriptor([0, 1, 2], {enumerable: 'foo', writable: 0, value: -1); // => {configurable: false, enumerable: true, writable: false, value: [0, 1, 2]}
 *
 */
function toDataDescriptor<TValue extends any>(value?: TValue, options?: IPropertyDescriptorOptions): TypedPropertyDescriptor<TValue> {
  return toPropertyDescriptor({value}, isTypeOf(options, $undefined) ? DATA_DESCRIPTOR_DEFAULT_OPTIONS : options, true);
}

export default toDataDescriptor;
