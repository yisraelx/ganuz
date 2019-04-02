/*!
 * @module @ganuz/is-instance-of/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isInstanceOf from '@ganuz/is-instance-of';

/**
 * Assert that `value` is instance of `constructor`.
 *
 * @param value - The value to check.
 * @param constructor - The class to check.
 * @returns Returns `value` if `value` is instance of `constructor`.
 * @throws Throws if `value` is not instance of `constructor`.
 * @example
 *
 *  assertInstanceOf(null, Object); // throw TypeError
 *  assertInstanceOf([], Function); // throw TypeError
 *  assertInstanceOf({}, String); // throw TypeError
 *  assertInstanceOf(['a', 'b', 'c'], Array); // => ['a', 'b', 'c']
 *  assertInstanceOf(/^[a-z]+$/i, RegExp); // => /^[a-z]+$/i
 *
 */
// @ts-ignore
declare function assertInstanceOf<TValue extends any, TConstructor extends (Function | {[Symbol.hasInstance]: (value: any) => boolean})>(value: TValue, constructor: TConstructor): TValue;

// @ts-ignore
let assertInstanceOf =
  assertify(isInstanceOf, (value: any, constructor: Function) => TypeError(`'${ value }' is not instance of '${ constructor }'.`));

export default assertInstanceOf;
