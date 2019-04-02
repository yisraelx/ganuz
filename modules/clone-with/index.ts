/*!
 * @module @ganuz/clone-with
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import defineProperty from '@ganuz/define-property';
import eachProperties from '@ganuz/each-properties';
import getPrototypeOf from '@ganuz/get-prototype-of';
import isTypeOf from '@pakal/is-type-of';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $undefined } from '@pakal/type-of';

let Object_create: ObjectConstructor['create'] = Object.create;

/**
 * Clone `target` object with `callback`.
 *
 * @param target - A target object to clone.
 * @param callback - A function to invokes of each properties of `target`.
 * @returns Returns clone of `target`.
 * @throws Throws if `target` or `descriptors` is not object.
 * @throws Throws if `callback` is not function.
 * @example
 *
 *  cloneWith('foo', v => v); // throw TypeError
 *  cloneWith({foo: 'bar'}, () => 77); // throw TypeError
 *  cloneWith({foo: 'bar'}, () => {get: () => 'bar', writable: false}); // throw TypeError
 *  cloneWith({}, v => v); // => {}
 *  cloneWith({foo: 'bar'}, v => v); // => {foo: 'bar'}
 *  cloneWith({foo: 'bar'}, () => undefined); // => {foo: 'bar'}
 *  cloneWith([0, 1, 2, 3, 4], ({value: n}) => {value: n % 2 === 0 ? n : NaN}); // => [0, NaN, 2, NaN, 4]
 *  cloneWith({name: 'alice'}, d => ({...d, value: 'bob'})); // => {name: 'bob'}
 *
 *  @example
 *
 *   let proto = {data: 'data'};
 *   let object = {foo: 'bar',  get color(){ return 'blue'; }, id(v){ return v; }, set some(v){}};
 *   Object.setPrototype(object, proto);
 *
 *   let cloneObject = clone(object, ({value, get}, property, object) => {
 *      return {
 *          value: get ? get.call(object) : value,
 *          writable: true
 *      };
 *   });
 *
 *   Object.getPrototypeOf(cloneObject) === proto; // => true
 *   Object.getOwnPropertyDescriptors(cloneObject);
 *   // => {
 *   //   color: {value: 'blue', configurable: false, enumerable: false, writable: true},
 *   //   foo: {value: 'blue', configurable: false, enumerable: false, writable: true},
 *   //   id: {value(v){ return v; }, configurable: false, enumerable: false, writable: true}
 *   //   some: {value: undefined, configurable: false, enumerable: false, writable: true}
 *   // }
 *
 */
function cloneWith<TTarget extends object>(target: TTarget, callback: (descriptor: PropertyDescriptor, property: PropertyKey, target: TTarget) => PropertyDescriptor | void): TTarget {
  assertTypeOf(callback, $function);

  let proto: object | null = getPrototypeOf(target);
  let cloneTarget: TTarget = Object_create(proto);

  eachProperties(target, (descriptor: PropertyDescriptor, property: PropertyKey, target: TTarget) => {
    let result: PropertyDescriptor | void = callback(descriptor, property, target);
    defineProperty(cloneTarget, property, isTypeOf(result, $undefined) ? descriptor : result as PropertyDescriptor);
  });

  return cloneTarget;
}

export default cloneWith;
