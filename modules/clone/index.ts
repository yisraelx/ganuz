/*!
 * @module @ganuz/clone
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getOwnPropertyDescriptors from '@ganuz/get-own-property-descriptors';
import getPrototypeOf from '@ganuz/get-prototype-of';

let Object_create: ObjectConstructor['create'] = Object.create;

/**
 * Clone `target` object.
 *
 * @param target - A target object to clone.
 * @returns Returns clone of `target`.
 * @throws Throws if `target` is not object.
 * @example
 *
 *  let objectDescriptors = {
 *     numbers: {value: [1, 3, 5], enumerable: true},
 *     [Symbol.toStringTag]: {get(){ return 'Some'; } , configurable: true},
 *  };
 *  let object = Object.create(null, descriptors);
 *  let cloneObject = clone(object);
 *  let cloneDescriptors = Object.getOwnPropertyDescriptors(cloneObject);
 *
 *  object === cloneObject; // => false
 *  Object.prototype.isPrototypeOf.call(object, cloneObject); // => false
 *  Object.getPrototypeOf(cloneObject); // => null
 *  object.numbers ==== cloneObject.numbers; // => true
 *  objectDescriptors[Symbol.toStringTag].get === cloneDescriptors[Symbol.toStringTag].get; // => true
 *  isDeepEqual(objectDescriptors, cloneDescriptors); // => true
 *
 * @example
 *
 *  class Some{
 *      data = {foo: 'bar'};
 *      method(){}
 *  }
 *
 *  let some = new Some();
 *  let cloneSome = clone(some);
 *
 *  some === cloneSome; // => false
 *  getPrototypeOf(cloneSome) === Some.prototype; // => true
 *  cloneSome.constructor === Some; // => true
 *  cloneSome instanceof Some; // => true
 *  some.data === cloneSome.data; // => true
 *  Object.getOwnPropertyNames(cloneSome); // => ['data'];
 *
 */
function clone<TTarget extends object>(target: TTarget): TTarget {
  let proto: object = getPrototypeOf(target);
  let properties: PropertyDescriptorMap = getOwnPropertyDescriptors(target);
  return Object_create(proto, properties);
}

export default clone;
