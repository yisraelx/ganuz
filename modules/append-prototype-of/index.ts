/*!
 * @module @ganuz/append-prototype-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import eachPrototypeOf from '@ganuz/each-prototype-of';
import setPrototypeOf from '@ganuz/set-prototype-of';
import isNative from '@pakal/is-native';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $null, $object } from '@pakal/type-of';

/**
 * Append `proto` to the end of `target` prototype chain (end === the last proto that is not native).
 *
 * @see https://mdn.io/prototype_chain
 * @remarks it will append `proto` to `target` on the last proto of prototype chain that is not native.
 * @param target - The target in which to append `proto`.
 * @param proto - The new proto to append to `target`
 * @returns Returns `true` if `proto` is append to `target`, otherwise `false`.
 * @throws Throws if `target` is not object.
 * @throws Throws if `proto` is not of type 'object' or 'function' or 'null'.
 * @example
 *
 *  appendPrototypeOf(null, {}); // throw TypeError
 *  appendPrototypeOf({}, undefined); // => throw TypeError
 *  appendPrototypeOf({}, null); // => true
 *  appendPrototypeOf(class Foo{}, class Some{}); // => true
 *  appendPrototypeOf(Object.preventExtensions({foo: 'bar'}), null); // => false
 *  appendPrototypeOf(Object, function(){}); // => false
 *  appendPrototypeOf(Object.prototype, {}); // => false
 *  appendPrototypeOf(String.prototype, {}); // => false
 *  appendPrototypeOf(Object('foo'), {}); // => true
 *
 *  @example
 *
 *  let some = {color: 'red'};
 *  let other = Object.create(some, {name: {value: 'bob'}});
 *  let anther = Object.create(null, {foo: {value: 'bar'}});
 *
 *  getPrototypeOf(some); // => Object.prototype
 *  some instanceof Object; // => true
 *  getPrototypeOf(other) === some; // => true
 *  other instanceof Object; // => true
 *  getPrototypeOf(anther); // => null
 *
 *  appendPrototypeOf(other, anther); // => true
 *  getPrototypeOf(some) === anther; // => true
 *  some instanceof Object; // => false
 *  other instanceof Object; // => false
 *
 */
function appendPrototypeOf(target: object, proto: object | null): boolean {
  assertTypeOf(proto, [$object, $function, $null]);

  let last: object;
  eachPrototypeOf(target, (proto: object) => !isNative(proto) && (last = proto));

  return last && setPrototypeOf(last, proto);
}

export default appendPrototypeOf;
