/*!
 * @module @ganuz/define-property-with
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isTypeOf from '@pakal/is-type-of';
import assertTypeOf from '@pakal/is-type-of/assert';
import tryify from '@pakal/tryify';
import { $function, $undefined } from '@pakal/type-of';
import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';

let Object_defineProperty: ObjectConstructor['defineProperty'] = Object.defineProperty;

let _defineProperty: ObjectConstructor['defineProperty'] = tryify(Object_defineProperty);

export type IDefinePropertyWithCallback<TTarget> = (oldDescriptor: PropertyDescriptor, newDescriptor: any | PropertyDescriptor, property: PropertyKey, target: TTarget) => PropertyDescriptor | void | any;

/**
 *
 * @param target - A target object to define the `property`.
 * @param property - The property key of the new property.
 * @param descriptor - The property descriptor of the new property.
 * @param callback - A function to adjust the old and new descriptor pre define.
 * @returns Returns `true` if the `property` is defined on `target`, otherwise `false`.
 * @throws Throws if `target` is not object.
 * @throws Throws if `callback` is not function.
 * @example
 *
 *  definePropertyWith(null, 'prop', {}, v => v); // throw TypeError
 *  definePropertyWith({}, 'prop', {}, () => {}); // => false
 *  definePropertyWith({}, 'prop', 'data', () => {}); // => false
 *  definePropertyWith({}, 'num', 77, (o, n) => n); // => false
 *  definePropertyWith({}, 'cup', {value: 'tea'}, o => o); // => false
 *  definePropertyWith(Object.freeze({}), 'num', {value: 55}, (o, n) => n); // => false
 *  definePropertyWith(Object.create({}, {str: {value: 'cool'}}), 'str', {value: 'fun'}, (o, n) => n); // => false
 *
 *  let object = {};
 *  definePropertyWith(object, 'prop', {}, (old, n) => n); // => true
 *  console.log(object); // => {prop: undefined}
 *
 *  let object2 = {};
 *  definePropertyWith(object2, 'foo', {value: 'bar'}, (old, n) => n); // => true
 *  console.log(object2); // => {foo: 'bar'}
 *
 *  let object3 = {};
 *  definePropertyWith(object3, 'foo', 'bar', (old, value) => ({value})); // => true
 *  console.log(object3); // => {foo: 'bar'}
 *
 *  let object4 = {color: 'pink'};
 *  definePropertyWith(object4, 'color', {value: 'green'}, old => old); // => true
 *  console.log(object4); // => {color: 'pink'}
 *
 *  let object5 = {color: 'red'};
 *  definePropertyWith(object5, 'color', {value: 'blue'}, () => {}); // => true
 *  console.log(object5); // => {color: 'blue'}
 *
 *  let object6 = {color: 'yellow', _default: 'black'};
 *  definePropertyWith(object6, 'color', 'pink', (o, n, p, t) => {value: n === 'pink' ? t['_default']: n}); // => true
 *  console.log(object6); // => {color: 'black'}
 *
 *  let object7 = {numbers: [0, 2]};
 *  definePropertyWith(object7, 'numbers', {value: [4, 6]}, ({value: o}, {value: n}) => Array.isArray(n) && o.push(...n)); // => true
 *  console.log(object7); // => {numbers: [0, 2, 4, 6]}
 *
 */
function definePropertyWith<TTarget extends object, TValue extends any, TCallback extends IDefinePropertyWithCallback<TTarget>>(target: TTarget, property: PropertyKey, descriptor: PropertyDescriptor | any, callback: TCallback): boolean {
  assertTypeOf(callback, $function);

  let oldDescriptor: PropertyDescriptor | undefined = getOwnPropertyDescriptor(target, property);
  let result: PropertyDescriptor | void = callback(oldDescriptor, descriptor, property, target);

  return _defineProperty(target, property, isTypeOf(result, $undefined) ? descriptor : result as PropertyDescriptor);
}

export default definePropertyWith;
