/*!
 * @module @ganuz/find-prototype-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import getPrototypeOf from '@ganuz/get-prototype-of';

/**
 * Find the first proto in the prototype chain of `target` by invokes `callback` on each proto.
 *
 * @see https://mdn.io/prototype_chain
 * @param target - The target in which to look for the proto.
 * @param callback - A function to invokes of each proto of `target`.
 * @returns Returns The first proto of `target` that the invokes of `callback` returned `true`, otherwise `null`.
 * @throws Throws if `target` is primitive.
 * @throws Throws if `callback` is not a callable function.
 * @example
 *
 *  findPrototypeOf(null, proto => proto); // throw TypeError
 *  findPrototypeOf({}, proto => proto); // => null
 *  findPrototypeOf({foo: 'bar', [Symbol.toStringTag]: 'Foo'}, proto => proto.foo); // => Foo{foo: 'bar'}
 *  findPrototypeOf(function (){}, proto => proto.hasOwnProperty('hasOwnProperty')); // => Object.prototype
 *
 * @example
 *
 *  let a = Object.create(null, {color: {value: 'red'}});
 *  let b = Object.create(a, {color: {value: 'blue'}});
 *  let c = Object.create(b, {color: {value: 'green'}});
 *
 *  findPrototypeOf(c, (proto) => proto.color === 'blue') === b; // => true
 *  findPrototypeOf(c, (proto) => proto.color === 'pink'); // => null
 *  findPrototypeOf(c, (proto) => console.log(`color: ${proto.color}`));
 *  // => 'color: green'
 *  // => 'color: blue'
 *  // => 'color: red'
 *  // => null
 *
 */
function findPrototypeOf(target: object, callback: (proto: object) => boolean | any): object | null {
  assertTypeOf(target, [$function, $object]);
  assertTypeOf(callback, $function);

  while (target && !callback(target)) {
    target = getPrototypeOf(target);
  }

  return target;
}

export default findPrototypeOf;
