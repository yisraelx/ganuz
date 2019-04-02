/*!
 * @module @ganuz/copy-properties
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import defineProperty from '@ganuz/define-property';
import eachProperties from '@ganuz/each-properties';

/**
 * Copy `source` own property descriptors to `target` (it will override duplicated entries).
 *
 * @param target - The object to define the properties of `source`.
 * @param source - The object to copy is properties to `target`.
 * @returns Returns the given `target`.
 * @throws Throws if `target` or `source` is primitive.
 * @example
 *
 *  copyProperties(null, {}); // throw TypeError;
 *  copyProperties({}, 'foo'); // throw TypeError;
 *  copyProperties({foo: 'bar', name: 'bob'}, {num: 5, name: 'alice'}); // => {foo: 'bar', name: 'alice', num: 5}
 *  copyProperties(Object.create(null, {color: {value: 'red'}}), {color: 'blue', num: -1}); // => {color: 'red', num: -1}
 *  copyProperties({tv: false}, Object.create({foo: 'bar'}, {car: true})); // => {tv: false, car: true}
 *  copyProperties(Object.freeze({tea: false}), {tea: true}); // => {tea: false}
 *  copyProperties(Object.seal({coffee: true}), {coffee: false}); // => {coffee: true}
 *  copyProperties({num: 5, str: undefined}, {num: undefined, str: 'some'}); // => {num: undefined, str: 'some'}
 *  copyProperties({get color(){ return this._c; }, set color(c) { this._c = c;}},{color: 'red'}); // => {color: 'red'}
 *  copyProperties({}, {[Symbol.toStringTag]: 'Some'}); // => Some{}
 *  copyProperties(copyProperties({color: 'blue'}, Object.create(null, {color: {value: 'red'}})), {color: 'pink'}); // => {color: 'red'}
 *
 */
function copyProperties<TTarget extends object, TSource extends object>(target: TTarget, source: TSource): TTarget & TSource {
  assertTypeOf(target, [$function, $object]);

  eachProperties(source, (descriptor: PropertyDescriptor, key: PropertyKey) => {
    defineProperty(target, key, descriptor);
  });

  return target as any;
}

export default copyProperties;
