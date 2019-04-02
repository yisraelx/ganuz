/*!
 * @module @ganuz/is-extensible
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

let Object_isExtensible: ObjectConstructor['isExtensible'] = Object.isExtensible;

/**
 * Checks if `target` is extensible.
 *
 * @see https://mdn.io/Reflect.isExtensible
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.isextensible
 * @param target - The target to check.
 * @returns Returns `true` if `target` is extensible, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  isExtensible(null); // throw TypeError
 *  isExtensible(1); // throw TypeError
 *
 *  isExtensible({}); // => true
 *  isExtensible(Object.freeze{}); // => false
 *  isExtensible(Object.seal{}); // => false
 *  isExtensible(Object.preventExtensions{}); // => false
 *
 */
function isExtensible<TTarget extends object>(target: TTarget): boolean {
  assertTypeOf(target, [$function, $object]);
  return Object_isExtensible(target);
}

// @ts-ignore
isExtensible = getGlobal('Reflect.isExtensible', isExtensible);

export default isExtensible;
