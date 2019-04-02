/*!
 * @module @ganuz/get-property-descriptor
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';
import getPropertyOwner from '@ganuz/get-property-owner';

/**
 * Get property descriptor of `property` in `target` or prototype chain.
 *
 * @see https://mdn.io/prototype_chain
 * @param target - The target of the `property`.
 * @param property - The property which look for is descriptor.
 * @returns Returns the descriptor of `property` in `target` if `property` is exists, otherwise `undefined`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getPropertyDescriptor(null ,'prop'); // throw TypeError
 *  getPropertyDescriptor({foo: 'bar'} ,'foo'); // => {configurable: true, enumerable: true, writable: true, value: 'bar'}
 *  getPropertyDescriptor(Object.create({foo: 'bar'}) ,'foo'); // => {configurable: true, enumerable: true, writable: true, value: 'bar'}
 *
 * @example
 *
 *  class A { color: string = 'red'; }
 *  class B extends A {}
 *  class C extends B { color: string = 'green'; }
 *
 *  getPropertyDescriptor(A.prototype, 'color'); // => undefined
 *  getPropertyDescriptor(new A, 'color'); // => {configurable: true, enumerable: true, writable: true, value: 'red'}
 *  getPropertyDescriptor(new B, 'color'); // => {configurable: true, enumerable: true, writable: true, value: 'red'}
 *  getPropertyDescriptor(new C, 'color'); // => {configurable: true, enumerable: true, writable: true, value: 'green'
 *
 */
function getPropertyDescriptor(target: any, property: PropertyKey): PropertyDescriptor | undefined {
  let owner: object = getPropertyOwner(target, property);
  return owner ? getOwnPropertyDescriptor(owner, property) : undefined;
}

export default getPropertyDescriptor;
