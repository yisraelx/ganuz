/*!
 * @module @ganuz/delete-property
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import assertTypeOf from '@pakal/is-type-of/assert';
import safify from '@pakal/safify';
import { $function, $object } from '@pakal/type-of';

/**
 * @internal
 */
let _delete: (target: object, property: PropertyKey) => boolean = safify((target: object, property: PropertyKey) => delete target[property], false);

/**
 * Delete `property` of `target`.
 *
 * @see https://mdn.io/Reflect.deleteProperty
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.deleteproperty
 * @param target - The target of the property.
 * @param property - The property key of the property.
 * @returns Returns `true` if `property` is delete from `target`, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  deleteProperty(55, 'foo'); // => throw TypeError
 *  deleteProperty({foo: 'bar'}, 'foo'); // => true
 *  deleteProperty([0, 1, 2], 0); // => true
 *  deleteProperty(Object.create(null, {foo: {value: 'bar'}}), 'foo'); // => false
 *  deleteProperty(Object.seal({foo: 'bar'}), 'foo'); // => false
 *
 */
function deleteProperty(target: object, property: PropertyKey): boolean {
  assertTypeOf(target, [$function, $object]);
  return _delete(target, property);
}

// @ts-ignore
deleteProperty = getGlobal('Reflect.deleteProperty', deleteProperty);

export default deleteProperty;
