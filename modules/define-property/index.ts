/*!
 * @module @ganuz/define-property
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import assertTypeOf from '@pakal/is-type-of/assert';
import tryify from '@pakal/tryify';
import { $function, $object } from '@pakal/type-of';
import assertPropertyDescriptor from '@ganuz/is-property-descriptor/assert';

let Object_defineProperty: ObjectConstructor['defineProperty'] = Object.defineProperty;

/**
 * @interface
 * @remarks It wraps for catch strict mode error of not configurable property or not extensions object.
 */
let _defineProperty: ObjectConstructor['defineProperty'] = tryify(Object_defineProperty);

/**
 *
 * @see https://mdn.io/Reflect.defineProperty
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.defineproperty
 * @param target - A target to define the property.
 * @param property - A property key of the new property.
 * @param descriptor - A descriptor of the new property.
 * @returns Returns `true` if the `property` is defined on `target`, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @throws Throws if `descriptor` is not valid property descriptor.
 * @example
 *
 *  defineProperty(null, 'foo', {value: 'bar'}); // throw TypeError
 *  defineProperty({}, 'foo', {value: 'bar', get: () => 'bar'}); // throw TypeError
 *  defineProperty({}, 'foo', {value: 'bar'}); // => true
 *  defineProperty(Object.freeze({}), 'foo', {value: 'bar'}); // => false
 *  defineProperty(Object.freeze({car: true}), 'foo', {car: true, enumerable: true}); // => true
 *  defineProperty(Object.create(null, {drink: {value: 'tea', writable: true}}), 'drink', {value: 'beer'}); // => true
 *  defineProperty(Object.create({}, {name: {value: 'bob', writable: true}}), 'name', {value: 'alice', configurable: false}); // => true
 *  defineProperty(Object.create(null, {color: {value: 'red'}}), 'color', {value: 'blue'}); // => false
 *  defineProperty(Object.create({}, {foo: {value: 'bar'}}), 'foo', {configurable: false}); // => true
 *
 * @example
 *
 *  let object = {color: 'red', get foo (){ return 'bar'; }};
 *
 *  defineProperty(object, 'name', {value: 'bob'}); // => true
 *  defineProperty(object, 'color', {value: 'yellow', writable: false}); // => true
 *  defineProperty(object, 'foo', {value: 'bar', configurable: false}); // => true
 *
 *  Object.getOwnPropertyDescriptors(object);
 *  // => {
 *  //     color: {value: 'yellow', configurable: true, enumerable: true, writable: false},
 *  //     foo: {value: 'bar', configurable: false, enumerable: true, writable: false},
 *  //     name: {value: 'bob', configurable: false, enumerable: false, writable: false}
 *  // }
 *
 */
function defineProperty<TTarget extends object, TValue extends any>(target: TTarget, property: PropertyKey, descriptor?: TypedPropertyDescriptor<TValue> & ThisType<TTarget>): boolean {
  assertTypeOf(target, [$function, $object]);
  assertPropertyDescriptor(descriptor);

  return _defineProperty(target, property, descriptor);
}

// @ts-ignore
defineProperty = getGlobal('Reflect.defineProperty', defineProperty);

export default defineProperty;
