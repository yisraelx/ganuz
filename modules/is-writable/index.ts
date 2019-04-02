/*!
 * @module @ganuz/is-writable
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';

const WRITABLE_DEFAULT = {writable: true};

/**
 * Checks if `property` of `target` is writable.
 *
 * @see https://mdn.io/PropertyDescriptor.writable
 * @param target - A target to check.
 * @param property - A property key to check.
 * @returns Returns `true` if `property` of `target` is writable, otherwise `false`.
 * @throws Throws if `target` is primitive.
 * @example
 *
 *  isWritable('foo', null); // throw TypeError
 *  isWritable(null, 'key'); // => throw TypeError
 *  isWritable({}, 'foo'); // => true
 *  isWritable({foo: 'bar'}, 'foo'); // => true
 *  isWritable([0, 1, 2]], 1); // => true
 *  isWritable(Object.freeze({color: 'red'}), 'foo') => false
 *  isWritable(Object.create(null, {a: {value: 1}}), 'a'); // => false
 *  isWritable(Object.create(Object.create(null, {a: {value: 1}})), 'a'); // => true
 *
 */
function isWritable<TTarget extends any>(target: TTarget, property: PropertyKey): boolean {
  return (getOwnPropertyDescriptor(target, property) || WRITABLE_DEFAULT).writable;
}

export default isWritable;
