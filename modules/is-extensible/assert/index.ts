/*!
 * @module @ganuz/is-extensible/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import isExtensible from '@ganuz/is-extensible';
import assertify from '@pakal/assertify';

/**
 * Assert that `target` is extensible.
 *
 * @param target - The target to check.
 * @returns Returns `target` if `target` is extensible.
 * @throws Throws if `target` is not extensible.
 * @example
 *
 *  assertExtensible(null); // throw TypeError
 *  assertExtensible(Object.freeze{}); // throw TypeError
 *  assertExtensible({}); // => {}
 *  assertExtensible([1, 2, 3]); // => [1, 2, 3]
 *
 */
// @ts-ignore
declare function assertExtensible<TTarget extends object>(target: TTarget): TTarget;

// @ts-ignore
let assertExtensible =
  assertify(isExtensible, (target: object) => TypeError(`'${ target }' is not extensible.`));

export default assertExtensible;
