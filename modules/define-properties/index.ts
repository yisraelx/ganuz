/*!
 * @module @ganuz/define-properties
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import defineProperty from '@ganuz/define-property';
import each from '@ganuz/each';
import assertPropertyDescriptor from '@ganuz/is-property-descriptor/assert';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

/**
 *
 * @param target - A target object to define the properties.
 * @param descriptors - A descriptors map of the new properties.
 * @returns Returns the given `target`.
 * @throws Throws if `target` or `descriptors` is not object.
 * @throws Throws if descriptor of `descriptors` is not valid property descriptor.
 * @example
 *
 *  defineProperties(null, {}); // throw TypeError
 *  defineProperties({}, {foo: {value: 'bar'}}); // => {foo: 'bar'}
 *  defineProperties({}, {[Symbol.toStringTag]: {get: () => 'Some'}}); // => Some{}
 *  defineProperties(Object.freeze({drink: 'tea'}), {color: {value: 'yellow'}}); // => {drink: 'tea'}
 *
 * @example
 *
 *  let object = {car: false};
 *
 *  defineProperties(object, {
 *      color: {value: 'red'},
 *      foo: {get: () => 'bar', writable: true},
 *      jeep: {value: true}
 *  }); // throw TypeError
 *
 *  console.log(object); // => {car: false}
 *
 * @example
 *
 *  let object = Object.create(null, {
 *      num: {value: 3, configurable: true},
 *      color: {value: 'pink', enumerable: true},
 *      drink: {value: 'tea', writable: true},
 *      word: {value: 'cool', writable: true},
 *      name: {value: 'bob', configurable: true, enumerable: true}
 *  });
 *
 *  defineProperties(object, {
 *      num: {value: -1},
 *      color: {value: 'red'},
 *      drink: {value: 'coffee', configurable: false},
 *      word: {value: 'fun', enumerable: true},
 *	    name: {value: 'alice'}
 *  }) === object; // => true
 *
 *  getOwnPropertyDescriptors(object);
 *  // => {
 *  //    num: {value: -1, configurable: true, enumerable: false, writable: false},
 *  //    color: {value: 'pink', configurable: false, enumerable: true, writable: false},
 *  //    drink: {value: 'coffee', configurable: false, enumerable: false, writable: true},
 *  //    word: {value: 'cool', configurable: false, enumerable: false, writable: true},
 *  //    name: {value: 'alice', configurable: true, enumerable: true, writable: false}
 *  // }
 *
 */
function defineProperties<TTarget extends object>(target: TTarget, descriptors: PropertyDescriptorMap): TTarget {
  assertTypeOf(target, [$function, $object]);

  each(descriptors, assertPropertyDescriptor);

  each(descriptors, (descriptor, property) => {
    defineProperty(target, property, descriptor);
  });

  return target;
}

export default defineProperties;
