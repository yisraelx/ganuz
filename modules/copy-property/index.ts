/*!
 * @module @ganuz/copy-property
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import defineProperty from '@ganuz/define-property';
import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';

/**
 * Copy `sourceProperty` property descriptor of `source` to `targetProperty` of `target`.
 *
 * @param target - The target to define the property.
 * @param targetProperty - The property key of the new property.
 * @param source - The source object.
 * @param [sourceProperty = targetProperty] - the source property key.
 * @returns Returns `true` if the `sourceProperty` of `source is define to `targetProperty` of `target`, otherwise `false`.
 * @throws Throws if `target` or `source` is not object.
 * @example
 *
 *  copyProperty(null, 'foo', {}); // throw TypeError
 *  copyProperty({}, 'foo', {}); // => false
 *  copyProperty({}, Symbol.for('foo'), {[Symbol.for('foo')]: 'bar'}); // => true
 *  copyProperty({}, 'a', ['A'], 1); // => true
 *  copyProperty({color: 'red'}, 'color', class {static color = 'blue'; }); // => true
 *  copyProperty(Object.seal({name: 'bob'}), 'name', {color: 'alice'}); // => false
 *  copyProperty(Object.create({}, {num: {value: -1}}), 'num', {num: 17}); // => false
 *
 * @example
 *
 *  let colorSym = Symbol('color');
 *  let target = {};
 *  let source = Object.create({}, {
 *     color: { set(color){ this[colorSym] = color; }, enumerable: true},
 *     [colorSym]: {value: 'black', writable: true}
 *  });
 *
 *  copyProperty(target, '_color', source, 'color'); // => true
 *  copyProperty(target, colorSym, source); // => true
 *
 *  target._color = 'pink';
 *  source.color = 'blue';
 *
 *  console.log(source[colorSym]); // => 'blue'
 *
 *  Object.getOwnPropertyDescriptors(target);
 *  // => {_color: {
 *  //      get: undefined, set(color){ this[colorSym] = color; }, enumerable: true, configurable: false
 *  // }, [colorSym]: {
 *  //      value: 'pink', writable: true, enumerable: false, configurable: false
 *  // }}
 *
 */
function copyProperty<TSource extends object, TTarget extends object>(target: TTarget, targetProperty: PropertyKey, source: TSource, sourceProperty?: PropertyKey): boolean {
  assertTypeOf(target, [$function, $object]);
  let descriptor: PropertyDescriptor = getOwnPropertyDescriptor(source, arguments.length > 3 ? sourceProperty : targetProperty);
  return descriptor && defineProperty(target, targetProperty, descriptor);
}

export default copyProperty;
