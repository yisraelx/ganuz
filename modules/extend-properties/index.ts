/*!
 * @module @ganuz/extend-properties
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import defineProperty from '@ganuz/define-property';
import eachProperties from '@ganuz/each-properties';
import hasOwn from '@ganuz/has-own';

/**
 * Copy `source` own property descriptors to `target` (it will not copy duplicated entries).
 *
 * @param target - The object to define the properties of `source`.
 * @param source - The object to copy is properties to `target`.
 * @returns Returns the given `target`.
 * @throws Throws if `target` or `source` is primitive.
 * @example
 *
 *  extendsProperties(null, {}); // throw TypeError
 *  extendsProperties({}, 'foo'); // throw TypeError
 *  extendsProperties({color: 'blue', num: 1}, {color: 'red', foo: 'bar'}); // => {color: 'blue', num: 1, foo: 'bar'}
 *  extendsProperties({foo: 'bar'}, {[Symbol.toStringTag]: 'Tag'}); // => Tag {foo: 'bar'}
 *  extendsProperties(Object.preventExtensions({name: 'bob'}), {name: 'alice', num: 9}); // => {name: 'bob'}
 *  extendsProperties({tea: true}, Object.create({foo: 'bar'}, {jeep: {value: false}})); // => {tea: true, jeep: true}
 *  getOwnPropertyDescriptor(extendsProperties({}, {set some(s){ this._s = s; }}), 'some'); // => {set(s){ this._s = s; }, ...}
 *
 */
function extendProperties<TTarget extends object, TSource extends object>(target: TTarget, source: TSource): TSource & TTarget {
  assertTypeOf(target, [$function, $object]);

  eachProperties(source, (descriptor: PropertyDescriptor, property: PropertyKey) => {
    if (!hasOwn(target, property)) {
      defineProperty(target, property, descriptor);
    }
  });

  return target as any;
}

export default extendProperties;
