/*!
 * @module @ganuz/get
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import isTypeOf from '@pakal/is-type-of';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import apply from '@ganuz/apply';
import getPropertyDescriptor from '@ganuz/get-own-property-descriptor';
import has from '@ganuz/has';

/**
 * Get `target` property `property`.
 *
 * @see https://mdn.io/Reflect.get
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.get
 * @param target - The target of the property.
 * @param property - The property key of the property.
 * @param receiver - The thisArg for invokes getter function [default: `target`].
 * @returns Returns the value of `property` in `target`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  get(undefined, 'foo'); // throw TypeError
 *  get({foo: 'bar'}, 'foo'); // => 'bar'
 *  get(['a', 'b', 'c'], 1); // => 'b'
 *  get({get color(){ return this._c; }, _c: 'red'}, 'color', {_c: 'green'}); // => 'green'
 *  get({get color(){ return this._c; }, _c: 'red'}, 'color', 55); // => undefined
 *  get({name: 'bob'}, 'name', {name: 'alice'}); // => 'bob'
 *  get(Object.create(null), 'constructor'); // => undefined
 *
 */
function get(target: object, property: PropertyKey, receiver?: any): any | undefined;
function get(target: object, property: PropertyKey): any | undefined {
  assertTypeOf(target, [$function, $object]);

  if (has(target, property)) {
    let {get, value, writable}: PropertyDescriptor = getPropertyDescriptor(target, property);
    return writable == null && isTypeOf(get, $function) ? apply(get, arguments.length > 2 ? arguments[2] : target, []) : value;
  }
}

// @ts-ignore
get = getGlobal('Reflect.get', get);

export default get;
