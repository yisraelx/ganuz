/*!
 * @module @ganuz/get-property-owner
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import findPrototypeOf from '@ganuz/find-prototype-of';
import has from '@ganuz/has';
import hasOwn from '@ganuz/has-own';

/**
 * Get property owner of `property` in `target`.
 *
 * @see https://mdn.io/prototype_chain
 * @param target - The target in which to look for the `property` owner in the prototype chain.
 * @param property - The property which look for is owner.
 * @returns Returns the owner of `property` if exists, otherwise `null`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getPropertyOwner(null, 'prop'); // throw TypeError
 *  getPropertyOwner(Object, 'create'); // Object
 *  getPropertyOwner(async function() {}, 'bind'); // => Function.prototype
 *  getPropertyOwner({}, 'foo'); // => null
 *  getPropertyOwner(Object.create(null), 'hasOwnProperty'); // => null
 *
 */
function getPropertyOwner(target: any, property: PropertyKey): object | null {
  return has(target, property) ? findPrototypeOf(target, (proto: object) => hasOwn(proto, property)) : null;
}

export default getPropertyOwner;
