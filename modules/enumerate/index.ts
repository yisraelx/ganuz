/*!
 * @module @ganuz/enumerate
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import each from '@ganuz/each';
import eachPrototypeOf from '@ganuz/each-prototype-of';
import isEnumerable from '@ganuz/is-enumerable';

/**
 * Get `target` enumerable keys (names and symbols) of all properties in `target` and the prototype chain.
 *
 * @param target - The target to get the enumerable keys.
 * @returns Returns array of `target` enumerable properties keys names and symbols, own and non-own.
 * @throws Throws if `target` is not object.
 * @example
 *
 *  enumerate('foo'); // throw TypeError
 *  enumerate({foo: 'bar'}); // => ['foo']
 *  enumerate([1, 2, 3]); // => [0, 1, 2]
 *  enumerate(Object.create({[Symbol.toStringTag]: 'Some'}, {name: {value: 'moshe', enumerable: true}})); // => ['name', Symbol.toStringTag]
 *  enumerate(Object.create({get data() {}, drink: 'beer'}, {drink: {value: 'tea'}}}); // => ['data']
 *  enumerate(Object.create(Object.create({}, {color: {value: 'red'}}), {color: {value: 'blue', enumerable: true}}}); // => ['color']
 *
 */
function enumerate(target: object): PropertyKey[] {
  let keys: PropertyKey[] = [];
  let taken = {};

  eachPrototypeOf(target, (proto) =>
    each(proto, (__, key) =>
      void (!taken[key] && (taken[key] = 1) && isEnumerable(proto, key) && keys.push(key))
    )
  );

  return keys;
}

export default enumerate;
