/*!
 * @module @ganuz/is-prototype-of/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isPrototypeOf from '@ganuz/is-prototype-of';

/**
 * Assert that `target` is prototype of `proto`.
 *
 * @param target - The target to check
 * @param proto - The proto to check.
 * @returns Returns `target` if `proto` is proto of `target`.
 * @throws Throws if `proto` is not proto of `target`.
 * @example
 *
 *  assertPrototypeOf({}, String.prototype); // throw TypeError
 *  assertPrototypeOf({foo: 'bar'}, Object.prototype); // => {foo: 'bar'}
 *
 */
// @ts-ignore
declare function assertPrototypeOf<TTarget extends object, TProto extends object>(target: TTarget, proto: TProto): TTarget;

// @ts-ignore
let assertPrototypeOf =
  assertify(isPrototypeOf, (value: any, proto: any) => TypeError(`'${ value }' is not prototype of '${ proto }'`));

export default assertPrototypeOf;
