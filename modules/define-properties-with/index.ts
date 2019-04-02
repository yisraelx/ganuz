/*!
 * @module @ganuz/define-properties-with
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import definePropertyWith, { IDefinePropertyWithCallback } from '@ganuz/define-property-with';
import each from '@ganuz/each';

/**
 *
 * @param target - A target object to define the properties.
 * @param descriptors - The descriptors of the new properties.
 * @param callback - A function to adjust the old and new descriptors pre define ({@link definePropertyWith} callback).
 * @returns Returns the given `target`.
 * @throws Throws if `target` or `descriptors` is not object.
 * @throws Throws if `callback` is not function.
 * @example
 *
 *  definePropertiesWith(null, {}, () => {}); // throw TypeError
 *  definePropertiesWith({}, {foo: {value: 'bar', get: () => 'bar'}}, () => {}); // throw TypeError
 *  definePropertiesWith({foo: 'bar'}, {}, () => {}); // => {foo: 'bar'};
 *  definePropertiesWith({}, {foo: {value: 'bar'}}, (o, n) => ({...n, get: () => 'bar'})); // => {}
 *  definePropertiesWith({jeep: false, name: 'alice'}, {name: {value: 'moshe'}, str: 'cool', num: {value: 94}}, () => NaN); // => {jeep: false, name: 'moshe', num: 94}
 *  definePropertiesWith({color: 'red'}, {color: 'blue'}, (o, value) => ({value})); // => {color: 'blue'};
 *  definePropertiesWith(Object.seal({name: 'bob'}), {foo: 'bar', name: 'guy'}, (o, value) => ({value})); // => {name: 'guy'};
 *  definePropertiesWith({drink: 'tea'}, {drink: 'beer', car: true}, (o, n) => {value: o && o.value || n}); // => {drink: 'tea', car: true};
 *  definePropertiesWith(Object.freeze({car: true}), {foo: {value: 'bar', car: {value: false}}}, (o, n) => n); // => {car: true}
 *
 * @example
 *
 *  let object = definePropertiesWith({}, {name: 'bob', color(){ return 'red'; }, (o, n) => ({[isFunction(n) ? 'get' : 'value']: n, configurable: true}));
 *
 *  Object.getOwnPropertyDescriptor(object); // => {
 *  //   name: {value: 'bob', configurable: true, enumerable: false, writable: false},
 *  //   color: {get: color(){ return 'red'; }, set: undefined, configurable: true, enumerable: false}
 *  // }
 *
 *  definePropertiesWith(object, {[Symbol('foo')]: 'bar', name(){ return 'alice' }, color: 'blue'}, (o, n) => ({[isFunction(n) ? 'get' : 'value']: n, enumerable: true}) === object; // => true
 *
 *  Object.getOwnPropertyDescriptor(object); // => {
 *  //   name: {get: name(){ return 'alice'; }, set: undefined, configurable: true, enumerable: true},
 *  //   color: {value: 'blue', configurable: true, enumerable: true, writable: false},
 *  //   [Symbol('foo')]: {value: 'bar', configurable: false, enumerable: true, writable: false}
 *  // }
 *
 */
function definePropertiesWith<TTarget extends object, TCallback extends IDefinePropertyWithCallback<TTarget>, TDescriptor extends (any | PropertyDescriptor)>(target: TTarget, descriptors: {[key: string]: TDescriptor}, callback: TCallback): TTarget {
  assertTypeOf(target, [$function, $object]);
  assertTypeOf(callback, $function);

  each(descriptors, (descriptor: TDescriptor, property: PropertyKey) => {
    definePropertyWith(target, property, descriptor, callback);
  });

  return target;
}

export default definePropertiesWith;
