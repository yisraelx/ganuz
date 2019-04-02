/*!
 * @module @ganuz/set
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import isTypeOf from '@pakal/is-type-of';
import { $function, $object } from '@pakal/type-of';
import apply from '@ganuz/apply';
import defineProperty from '@ganuz/define-property';
import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';
import getPropertyDescriptor from '@ganuz/get-property-descriptor';
import toDataDescriptor from '@ganuz/to-data-descriptor';

/**
 * Set `value` to `target` property `property`.
 *
 * @see https://mdn.io/Reflect.set
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.set
 * @param target - The target of the `property`.
 * @param property - The property key of the property.
 * @param value - The value to set.
 * @param [receiver = `target`] - The thisArg for invokes setter function.
 * @returns Returns the `true` if the value is set on `property` of `receiver`, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  set(null, 'foo', 'bar'); // throw TypeError
 *  set({}, 'foo', 'bar'); // => true
 *  set({color: 'blue'}, 'color', 'green'); // => true
 *  set(v => v, Symbol('foo'), 'bar'); // => true
 *  set({}, 'foo', 'bar', {}); // => true
 *  set(Object.freeze({}), 'foo', 'bar', {}); // => true
 *  set(Object.freeze({foo: 'bar'}), 'foo', 'bar'); // => false
 *  set({}, 'foo', 'bob', {get(){}, set(v){}}); // => false
 *  set({}, 'foo', 'bar', 69); // => false
 *  set({get foo(){}}, 'foo', 'bar'); // => false
 *  set({get foo(){}}, 'foo', 'bar', {}); // => false
 *  set(Object.preventExtensions({}), 'foo', 'bar'); // => false
 *  set(Object.preventExtensions({}), 'foo', 'bar', {}); // => false
 *  set(Object.create(null, {foo: {value: 'bar'}}), 'foo', 'bob'); // => false
 *  set(Object.create(null, {foo: {value: 'bar'}}), 'foo', 'bob', {}); // => false
 *  set(Object.create(Object.create(null, {foo: {value: 'bar'}})), 'foo', 'bob'); // => false
 *  set(Object.freeze({}), 'foo', 'bar', {}); // => true
 *  set({}, 'foo', 'bob', Object.create(null, {foo: {value: 'bar'}})); // => false
 *
 * @example
 *
 *  let object = {
 *      set name(name){ this._name = name; },
 *      _name: 'bob'
 *  };
 *  let other = {_name: 'alice'};
 *
 *  set(object, 'name', 'john', other); // => true
 *  console.log(object._name); // => 'bob'
 *  console.log(other._name); // => 'john'
 *
 * @example
 *
 *  let object = {
 *      set color(color){ this._color = color; },
 *      _color: 'blue'
 *   };
 *  let other = Object.freeze({_color: 'red'});
 *
 *  set(object, 'color', 'green', other); // => true (in 'use strict' mode it will throw TypeError)
 *  console.log(object._color); // => 'blue'
 *  console.log(other._color); // => 'red'
 *
 * @example
 *
 *  let object = {num: 69}
 *  let anther = {
 *      get num(){
 *          return this._num;
 *      },
 *      set num(num){
 *          this._num = num;
 *      },
 *      _num: -1
 *  }
 *
 *  set(object, 'num', 77, anther); // => false
 *  console.log(object.num); // => 69
 *  console.log(other.num); // => -1
 *
 */
function set(target: object, property: PropertyKey, value: any, receiver?: object): boolean;
function set(target: object, property: PropertyKey, value: any): boolean {
  let hasReceiver: boolean = arguments.length > 3;
  let receiver = hasReceiver ? arguments[3] : target;
  let descriptor: PropertyDescriptor = getPropertyDescriptor(target, property);
  let {set, writable}: PropertyDescriptor = descriptor || {};

  if ((!!descriptor && !writable && !set) || !isTypeOf(receiver, [$function, $object])) {
    return false;
  }

  if (hasReceiver) {
    descriptor = getOwnPropertyDescriptor(receiver, property);
    if (descriptor) {
      let {get, set, writable}: PropertyDescriptor = descriptor;
      if (get || set || writable === false) {
        return false;
      }
    }
  }

  return set ? (apply(set, receiver, [value]), true) : defineProperty(receiver, property, toDataDescriptor(value, descriptor));
}

// @ts-ignore
set = getGlobal('Reflect.set', set);

export default set;
