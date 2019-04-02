/*!
 * @module @ganuz/get-prototype-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

let Object_getPrototypeOf: ObjectConstructor['getPrototypeOf'] = Object.getPrototypeOf;

/**
 * Get `target` prototype.
 *
 * @see https://mdn.io/Reflect.getPrototypeOf
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.getprototypeof
 * @param target - The target to get the proto.
 * @returns Return the proto of the given `target`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getPrototypeOf(null); // throw TypeError
 *  getPrototypeOf(1); // throw TypeError
 *  getPrototypeOf(Object.create(null)); // => null
 *  getPrototypeOf(Object.create({foo: 'bar'})); // => Object{foo: 'bar'}
 *  getPrototypeOf(Object('foo')); // => String.prototype
 *  getPrototypeOf({}); // => Object.prototype
 *
 */
function getPrototypeOf(target: object): object | null {
  assertTypeOf(target, [$function, $object]);
  return Object_getPrototypeOf(target);
}

// @ts-ignore
getPrototypeOf = getGlobal('Reflect.getPrototypeOf', getPrototypeOf);

export default getPrototypeOf;
