/*!
 * @module @ganuz/scope
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import _WeakMap from '@ganuz/_weak-map';

let Object_create: ObjectConstructor['create'] = Object.create;

let SCOPES: WeakMap<object, {[id: string]: object}> = new _WeakMap();

/**
 * @internal
 */
let _getScope = (id, target) => {
  let scopes = SCOPES.get(target) || SCOPES.set(target, Object_create(null)).get(target);
  return scopes[id] || (scopes[id] = Object_create(null));
};

/**
 * Create scope of `id` in `target` or Access scope of `id` in `target`.
 *
 * @see https://mdn.io/WeakMap
 * @remarks It is based on es6 `WeakMap` no need for polyfill (built-in library support).
 * @param id - The scope id.
 * @param target - The target of the scope.
 * @returns Returns the scope of `id` in `target`.
 * @example
 *
 *  let $ = scope('some')
 *
 *  class Cool {
 *      constructor(color: string){
 *          $(this).color = color;
 *      }
 *
 *      log() {
 *          let {color} = $(this);
 *          console.log(`color: ${color}`);
 *      }
 *  }
 *
 *  let cool = new Cool('green');
 *  cool.log(); => 'color: green'
 *  $(cool).color = 'blue';
 *  cool.color = 'red';
 *  cool.log(); => 'color: blue'
 *  scope('some', cool).color = 'pink';
 *  cool.log(); => 'color: pink'
 *  Object.keys($(cool)); // => ['color']
 *
 *  @example
 *
 *   let target = {};
 *   let scopeGetter = scope();
 *   let $scope = scopeGetter(target);
 *   let scopeSomeGetter = scope('some');
 *   let $scopeSome = scopeSomeGetter(target);
 *
 *   $scope === $scopeSome; // => false
 *   $scopeSome === scopeGetter(target); // => true
 *   $scopeSome === scope('some', target); // => true
 *   typeof $scopeSome === 'object'; // => true
 *
 *  @example
 *
 *    let $info = scope('info')
 *
 *    class Person {
 *      set name(name: string){
 *          $info(target).name = name;
 *      }
 *
 *      equals(other: Person): boolean {
 *        return $info(this).name === $info(other).name;
 *      }
 *    }
 *
 *   let person = new Person;
 *   let person2 = new Person;
 *   let person3 = new Person;
 *
 *   person.name = 'bob';
 *   person2.name = 'alice';
 *   person3.name = 'bob';
 *
 *   person.equals(person2); // => false
 *   person2.equals(person3); // => false
 *   person3.equals(person1); // => true
 *
 */
function scope<TScope extends any>(id: string | symbol | number, target: object): TScope;
function scope<TScope extends any>(id?: string | symbol | number): (target: object) => TScope;
function scope(id?: string | symbol | number, target?: object): any {
  return arguments.length > 1 ? _getScope(id, target) : (target: object) => _getScope(id, target);
}

export default scope;
