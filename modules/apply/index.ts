/*!
 * @module @ganuz/apply
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';

let Function$_apply: Function['apply'] = Function.prototype.apply;

/**
 * Invokes `target` function with `thisArg` and `args`.
 *
 * @see https://mdn.io/Reflect.apply
 * @see https://mdn.io/Function.prototype.apply
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.apply
 * @resource https://www.ecma-international.org/ecma-262/#sec-function.prototype.apply
 * @param target - A function to invokes.
 * @param thisArg - A function `this` scope (if is `nil` and non-strict-mode it will be the global scope, in `ArrowFunction` it will be the this of the creation scope).
 * @param args - A args list to pass to `target` invokes (can gets `ArrayLike`).
 * @returns Returns the `target` invokes result.
 * @throws Throws if `target` is not a callable `Function`.
 * @throws Throws if `args` is primitive.
 * @example
 *
 *  apply(() => 'beer'); // => 'beer'
 *  apply(Math.abs, null, [-1]); // => 1
 *  apply(function get(key) { return this[key];}, {foo: 'bar'}, ['foo']); // => 'bar'
 *  apply(class {}); // throw Error(...);
 *
 *  (function(){
 *      apply(() => console.log(this)); // => Object
 *  }).call(Object));
 *
 */
function apply<TTarget extends (...args: any[]) => any>(target: TTarget, thisArg: null | undefined, args: Parameters<TTarget>): ReturnType<TTarget>;
function apply<TThisArg extends any, TTarget extends (this: TThisArg, ...args: any[]) => any>(target: TTarget, thisArg: TThisArg, args: Parameters<TTarget>): ReturnType<TTarget>;
function apply(target: Function, thisArg: any, args: ArrayLike<any>): any;
function apply(target: Function, thisArg: any, args: ArrayLike<any>): any {
  assertTypeOf(args, [$object, $function]);
  return Function$_apply.apply(target, [thisArg, args]);
}

// @ts-ignore
apply = getGlobal('Reflect.apply', apply);

export default apply;
