/*!
 * @module @ganuz/set-prototype-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import extendProperties from '@ganuz/extend-properties';
import getOwnPropertyDescriptors from '@ganuz/get-own-property-descriptors';
import getGlobal from '@pakal/get-global';
import isTypeOf from '@pakal/is-type-of';
import assertTypeOf from '@pakal/is-type-of/assert';
import tryify from '@pakal/tryify';
import { $function, $null, $object } from '@pakal/type-of';

let Object_create: ObjectConstructor['create'] = Object.create;
let Object_setPrototypeOf: ObjectConstructor['setPrototypeOf'] = Object.setPrototypeOf;

/**
 * @internal
 * @see https://mdn.io/__proto__
 * @remarks A support for old browser that not have `setPrototypeOf` method but have `__proto__` property.
 */
let _setProto = (target, proto) => target.__proto__ = proto;

/**
 * @internal
 * @see https://mdn.io/prototype
 * @remarks A support for old browser that not have `setPrototypeOf` method and not have `__proto__` property.
 */
let _setPrototype = (target, proto) =>
  isTypeOf(target, $function) ?
    extendProperties(target, proto) :
    (target.prototype = Object_create(proto, getOwnPropertyDescriptors(target)));

/**
 * @internal
 * @remarks
 *  A support for old browser.
 *  It wraps for catch strict mode error of not extensions object.
 */
let _setPrototypeOf = tryify(Object_setPrototypeOf ? Object_setPrototypeOf :
  {__proto__: []} instanceof Array ? _setProto :
    (target, proto) => isTypeOf(target, $function) ? extendProperties(target, proto) : _setPrototype(target, proto));

/**
 * Set `proto` to `target` prototype.
 *
 * @see https://mdn.io/Reflect.setPrototypeOf
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.setprototypeof
 * @remarks this method compatibility >= IE9
 * @param target - The target in which to set `proto`.
 * @param proto - The new proto to set to `target`.
 * @returns Returns `true` if `proto` is set to `target`, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @throws Throws if `proto` is not of type 'object' or 'function' or 'null'.
 * @example
 *
 *  setPrototypeOf(null, {}); // throw TypeError
 *  setPrototypeOf({}, 78); // throw TypeError
 *  setPrototypeOf({}, null); // => true
 *  setPrototypeOf({}, []); // => true
 *  setPrototypeOf(Object('foo'), Number.prototype); // => true
 *  setPrototypeOf(Object.freeze(Object.create(null)), null); // => true
 *  setPrototypeOf(Object.freeze({}), Object.prototype); // => true
 *  setPrototypeOf(Object.freeze({}), {}); // => false
 *  setPrototypeOf(Object.freeze({}), null); // => false
 *  setPrototypeOf(Object.freeze(Object.create(null)), Object.prototype); // => false
 *
 * @example
 *
 *  let a = {};
 *  let b = {};
 *
 *  setPrototypeOf(a, null);
 *  setPrototypeOf(b, a);
 *
 *  getPrototypeOf(a); // => null
 *  getPrototypeOf(b); // => a
 *
 */
function setPrototypeOf(target: object, proto: null | object): boolean {
  assertTypeOf(target, [$function, $object]);
  assertTypeOf(proto, [$function, $object, $null]);
  return _setPrototypeOf(target, proto);
}

// @ts-ignore
setPrototypeOf = getGlobal('Reflect.setPrototypeOf', setPrototypeOf);

export default setPrototypeOf;
