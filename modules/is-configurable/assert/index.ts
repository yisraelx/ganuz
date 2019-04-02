/*!
 * @module @ganuz/is-configurable/assert
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertify from '@pakal/assertify';
import isConfigurable from '@ganuz/is-configurable';

/**
 * Assert that `property` of `target` is configurable.
 *
 * @param target - A target to check.
 * @param property - A property key to check.
 * @returns Returns `target` if `property` of `target` is configurable.
 * @throws Throws if `property` of `target` is not configurable.
 * @example
 *
 *  assertConfigurable({}, 'foo'); // => {}
 *  assertConfigurable({foo: 'bar'}, 'foo'); // => {foo: 'bar'}
 *  assertConfigurable(Object.create({}, {foo: {value: 'bar'}}), 'foo'); // throw TypeError
 *  assertConfigurable(Object.freeze({foo: 'bar'}), 'foo'); // throw TypeError
 *
 */
// @ts-ignore
declare function assertConfigurable<TTarget extends object>(target: TTarget, property: PropertyKey): TTarget;

// @ts-ignore
let assertConfigurable =
  assertify(isConfigurable, (target: object, property: PropertyKey) => TypeError(`'${ String(property) }' of '${ target }' is not a configurable.`));

export default assertConfigurable;
