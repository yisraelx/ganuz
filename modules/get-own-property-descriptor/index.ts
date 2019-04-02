/*!
 * @module @ganuz/get-own-property-descriptor
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

let Object_getOwnPropertyDescriptor: ObjectConstructor['getOwnPropertyDescriptor'] = Object.getOwnPropertyDescriptor;

/**
 * Get own property descriptor of `property` in `target`.
 *
 * @see https://mdn.io/Reflect.getOwnPropertyDescriptor
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.getownpropertydescriptor
 * @param target - The target of the property.
 * @param property - The property key of the property.
 * @returns Returns The descriptor of `property` in `target` if `target` own the property, otherwise `undefined`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  getOwnPropertyDescriptor(null, 'foo'); // throw TypeError
 *  getOwnPropertyDescriptor('foo', 0); // throw TypeError
 *  getOwnPropertyDescriptor({foo: 'bar'}, 'foo'); // => PropertyDescriptor{...}
 *  getOwnPropertyDescriptor({}, 'foo'); // => undefined
 *  getOwnPropertyDescriptor(Object.create({foo: 'bar'}), 'foo'); // => undefined
 *
 */
function getOwnPropertyDescriptor<TValue extends any = any>(target: any, property: PropertyKey): TypedPropertyDescriptor<TValue> | undefined {
  assertTypeOf(target, [$function, $object]);
  return Object_getOwnPropertyDescriptor(target, property);
}

// @ts-ignore
getOwnPropertyDescriptor = getGlobal('Reflect.getOwnPropertyDescriptor', getOwnPropertyDescriptor);

export default getOwnPropertyDescriptor;
