/*!
 * @module @ganuz/to-property-descriptor
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import { $function, $object, $string } from '@pakal/type-of';
import hasOwn from '@ganuz/has-own';
import isAccessorDescriptor from '@ganuz/is-accessor-descriptor';

/**
 * @internal
 */
let _setOption = (newDescriptor: PropertyDescriptor, oldDescriptor: PropertyDescriptor, key: string, options: IPropertyDescriptorOptions, override: boolean) => {
  newDescriptor[key] = !!(!override && hasOwn(oldDescriptor, key) ? oldDescriptor[key] :
    isTypeOf(options, $object) ? hasOwn(options, key) && options[key] :
      isTypeOf(options, $string) ? options.indexOf(key[0]) > -1 :
        options);
};

export type IPropertyDescriptorOptions = PropertyDescriptor | string | boolean | any;

/**
 * Create `PropertyDescriptor` from `descriptor` and `options`.
 *
 * @see https://mdn.io/defineProperty#Description
 * @see https://mdn.io/Property_Accessors
 * @param descriptor - A base descriptor object to create a new descriptor object.
 * @param [options = false] - A descriptor options to set to `descriptor`,
 * it can be descriptor object (it will be ignores from {get, set, value}) and option that not set to be `false`,
 * or string that containing the first letter of the descriptor options keys ('', 'e', 'ec', 'wc', 'cwe', ...) for set to true,
 * or boolean to set to descriptor options value
 * @param [override = false] - If to override the current `descriptor` options {configurable, enumerable, writable} with `options`.
 * @returns Returns valid descriptor that create from `descriptor` and `options`.
 * @example
 *
 *  toPropertyDescriptor(); // => {configurable: false, enumerable: false, writable: false, value: undefined}
 *  toPropertyDescriptor({}, 1); // => {configurable: true, enumerable: true, writable: true, value: undefined}
 *  toPropertyDescriptor({}, {}); // => {configurable: false, enumerable: false, writable: false, value: undefined}
 *  toPropertyDescriptor({set(){}, enumerable: true}, false); // => {configurable: false, enumerable: true, get: undefined, set(){}}
 *  toPropertyDescriptor({get: undefined}, 'ewc'); // => {configurable: true, enumerable: true, get: undefined, set: undefined}
 *  toPropertyDescriptor({configurable: true, enumerable: true, writable: true, set(){}}, get: null); // => {configurable: false, enumerable: false, get: undefined, set(){}}
 *  toPropertyDescriptor({get: undefined, configurable: 0}, {enumerable: true, configurable: true}); // => {configurable: false, enumerable: true, get: undefined, set: undefined}
 *  toPropertyDescriptor({set: 55, get: Object, writable: true}, 'cw'); // => {configurable: true, enumerable: false, get: Object, set: undefined}
 *  toPropertyDescriptor({get(){}, set(){}, value: 'foo'}, true); // => {configurable: true, enumerable: true, get(){}, set(){}}
 *  toPropertyDescriptor({get(){}, value: undefined, writable: true}, 'c'); // => {configurable: true, enumerable: false, get(){}, set: undefined}
 *  toPropertyDescriptor({enumerable: 0, writable: false}, {configurable: [], writable: true}, true); // => {configurable: true, enumerable: false, writable: true, value: undefined}
 *  toPropertyDescriptor({configurable: false, enumerable: false, writable: false}, 'ec', true); // => {configurable: true, enumerable: true, writable: false, value: undefined}
 *
 */
function toPropertyDescriptor<TDescriptor extends (PropertyDescriptor | any)>(descriptor?: TDescriptor, options?: IPropertyDescriptorOptions, override?: boolean): PropertyDescriptor {
  descriptor = isTypeOf(descriptor, $object) ? descriptor : {} as any;

  let newDescriptor: any = {};

  _setOption(newDescriptor, descriptor, 'configurable', options, override);
  _setOption(newDescriptor, descriptor, 'enumerable', options, override);

  if (isAccessorDescriptor(descriptor)) {
    newDescriptor.get = isTypeOf(descriptor.get, $function) ? descriptor.get : undefined;
    newDescriptor.set = isTypeOf(descriptor.set, $function) ? descriptor.set : undefined;
  } else {
    newDescriptor.value = descriptor.value;
    _setOption(newDescriptor, descriptor, 'writable', options, override);
  }

  return newDescriptor;
}

export default toPropertyDescriptor;
