/*!
 * @module @ganuz/get-own-property-descriptors
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import eachProperties from '@ganuz/each-properties';

/**
 * @internal
 * @resource https://www.ecma-international.org/ecma-262/#sec-object.getownpropertydescriptors
 */
let _getOwnPropertyDescriptorsPolyfill = (target: any): PropertyDescriptorMap => {
  let descriptors: PropertyDescriptorMap = {};

  eachProperties(target, (descriptor: PropertyDescriptor, property: PropertyKey) => {
    descriptors[property as any] = descriptor;
  });

  return descriptors;
};

let _getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || _getOwnPropertyDescriptorsPolyfill;

/**
 * Get own property descriptors of properties in `target`.
 *
 * @param target - The target of the properties.
 * @returns Returns `target` own properties descriptors.
 * @throws Throws if `target` is not object.
 * @example
 *
 *  getOwnPropertyDescriptors(null); // throw TypeError
 *  getOwnPropertyDescriptors({}); // => {}
 *  getOwnPropertyDescriptors([1]); // => {0: Descriptor{…}, length: Descriptor{…}}
 *  getOwnPropertyDescriptors({Symbol('foo'): 'bar', some(){}, get color(){}}); // => {Symbol('foo'): Descriptor{…}, some: Descriptor{…}, color: Descriptor{…}}
 *  getOwnPropertyDescriptors(Object.create({foo: 'bar'}, {color: {value: 'blue', enumerable: false}})); // => {color: Descriptor{…}}
 *
 */
function getOwnPropertyDescriptors<TTarget extends object>(target: TTarget): { [TProperty in keyof TTarget]: TypedPropertyDescriptor<TTarget[TProperty]> } & {[x: string]: PropertyDescriptor} {
  assertTypeOf(target, [$function, $object]);
  return _getOwnPropertyDescriptors(target) as any;
}

export default getOwnPropertyDescriptors;
