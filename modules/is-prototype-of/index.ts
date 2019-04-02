/*!
 * @module @ganuz/is-prototype-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

let Object$_isPrototypeOf: Object['isPrototypeOf'] = Object.prototype.isPrototypeOf;

/**
 * Checks if `target` is prototype of `proto`.
 *
 * @see https://mdn.io/Object.prototype.isPrototypeOf
 * @resource https://www.ecma-international.org/ecma-262/#sec-object.prototype.isprototypeof
 * @param target - The target to check
 * @param proto - The proto to check.
 * @returns Returns `true` if `proto` is proto of `target`, otherwise `false`.
 * @throws Throws if `proto` is primitive.
 * @example
 *
 *  isPrototypeOf(Object.create(null), null); // throw TypeError
 *  isPrototypeOf('foo', String.prototype); // => false
 *  isPrototypeOf(Object(true), Boolean.prototype); // => true
 *  isPrototypeOf({}, Object.prototype); // => true
 *  class A{}
 *  class B extends A{}
 *  isPrototypeOf(B, A); // => true
 *  isPrototypeOf(new B, A.prototype); // => true
 *  isPrototypeOf(Object(1), Object.prototype); // => true
 *  isPrototypeOf(Object.create(null), Object.prototype); // => false
 *
 *  let iframe = document.createElement('iframe');
 *  document.body.appendChild(iframe);
 *  let {contentWindow: {Array: IFrameArray}} = iframe;
 *  isPrototypeOf([], IFrameArray.prototype); // => false
 *
 */
function isPrototypeOf<TTarget extends object, TProto extends object>(target: TTarget, proto: TProto): boolean {
  return Object$_isPrototypeOf.call(assertTypeOf(proto, [$function, $object]), target);
}

export default isPrototypeOf;
