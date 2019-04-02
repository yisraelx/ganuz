/*!
 * @module @ganuz/each-prototype-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import getPrototypeOf from '@ganuz/get-prototype-of';

/**
 * Invokes `callback` for each proto in the prototype chain of `target`.
 *
 * @see https://mdn.io/prototype_chain
 * @param target - A target to iteratee of is prototype chain.
 * @param callback - A function to invokes of each proto of `target`.
 * @returns Returns the given `target`.
 * @throws Throws if `target` is primitive.
 * @throws Throws if `callback` is not a callable function.
 * @example
 *
 *  eachPrototypeOf(null, p => p); // throw TypeError
 *  eachPrototypeOf({[Symbol.toStringTag]: 'Some'}, p => p); // => Some{}
 *  eachPrototypeOf(class A{}, p => p); // => class A{}
 *
 * @example
 *
 *  let a = Object.create(null, {name: {value: 'bob'}});
 *  let b = Object.create(a, {name: {value: 'alice'}});
 *  let c = Object.create(b, {name: {value: 'john'}});
 *  let d = Object.create(c, {name: {value: 'alice'}});
 *
 *  let getProtoByName = (target, name) => (eachPrototypeOf(target, proto => !(proto.name === name && target = proto), target);
 *  getProtoByName(d, 'alice'); // => d
 *  getProtoByName(c, 'alice'); // => b
 *  getProtoByName(a, 'alice'); // => null
 *  getProtoByName(d, 'leonard'); // => null
 *
 *  eachPrototypeOf(c, console.log.bind(null, 'proto:'));
 *  // => 'proto: c'
 *  // => 'proto: b'
 *  // => 'proto: a'
 *  // => c
 *
 */
function eachPrototypeOf<TTarget extends object>(target: TTarget, callback: (proto: object) => boolean | any): TTarget {
  assertTypeOf(target, [$function, $object]);
  assertTypeOf(callback, $function);

  let proto: object = target;

  while (proto && callback(proto) !== false) {
    proto = getPrototypeOf(proto);
  }

  return target;
}

export default eachPrototypeOf;
