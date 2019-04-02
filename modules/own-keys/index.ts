/*!
 * @module @ganuz/own-keys
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

let Object_getOwnPropertyNames: ObjectConstructor['getOwnPropertyNames'] = Object.getOwnPropertyNames;
let Object_getOwnPropertySymbols: ObjectConstructor['getOwnPropertySymbols'] = Object.getOwnPropertySymbols;

/**
 * Get `target` own keys (names and symbols).
 *
 * @see https://mdn.io/Reflect.ownKeys
 * @see https://mdn.io/Object.getOwnPropertyNames
 * @see https://mdn.io/Object.getOwnPropertySymbols
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.ownkeys
 * @param target - The target that own the properties.
 * @returns Returns array of `target` properties keys names and symbols.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  ownKeys('foo'); // => throw TypeError
 *  ownKeys([1, 2, 3]); // => ['0', '1', '2', 'length']
 *  ownKeys({foo: 'bar'}); // => ['foo']
 *  ownKeys(Object.create({foo: 'bar'}), {color: {value: 'red'}}); // => ['color']
 *  ownKeys({foo: 'bar', get [Symbol('foo')]() { return this.foo; }}); // => ['foo', Symbol(foo)]
 *
 */
function ownKeys(target: object): PropertyKey[] {
  assertTypeOf(target, [$function, $object]);

  let keys: PropertyKey[] = Object_getOwnPropertyNames(target);

  // if symbols not support, the symbols will be string and it cover by names.
  if (Object_getOwnPropertySymbols) {
    let symbols: symbol[] = Object_getOwnPropertySymbols(target);
    keys = keys.concat(symbols);
  }

  return keys;
}

// @ts-ignore
ownKeys = getGlobal('Reflect.ownKeys', ownKeys);

export default ownKeys;
