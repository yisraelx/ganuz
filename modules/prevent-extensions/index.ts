/*!
 * @module @ganuz/prevent-extensions
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import assertTypeOf from '@pakal/is-type-of/assert';
import tryify from '@pakal/tryify';
import { $function, $object } from '@pakal/type-of';

let Object_preventExtensions: ObjectConstructor['preventExtensions'] = Object.preventExtensions;

/**
 * @internal
 * @resource https://www.ecma-international.org/ecma-262/#sec-object.preventextensions
 * @remarks It wraps for 19.1.2.17 Object.preventExtensions ( O ) -> "3. If status is false, throw a TypeError exception".
 */
let _preventExtensions: (target: object) => boolean = tryify(Object_preventExtensions);

/**
 *
 * @see https://mdn.io/Reflect.preventExtensions
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.preventextensions
 * @param target - A object to prevent extensions.
 * @returns Returns `true` if the target is set to prevent extensions, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  preventExtensions('foo'); // throw TypeError
 *  preventExtensions(null); // throw TypeError
 *  preventExtensions(v => v); // => true
 *
 *  (() => {
 *      'use strict';
 *      let object = {};
 *      preventExtensions(object); // => true
 *      object.foo = 'bar'; // throw TypeError
 *  })()
 *
 */
function preventExtensions(target: object): boolean {
  assertTypeOf(target, [$function, $object]);
  return _preventExtensions(target);
}

// @ts-ignore
preventExtensions = getGlobal('Reflect.preventExtensions', preventExtensions);

export default preventExtensions;
