/*!
 * @module @ganuz/construct
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import isNative from '@pakal/is-native';
import isTypeOf from '@pakal/is-type-of';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object } from '@pakal/type-of';
import apply from '@ganuz/apply';
import setPrototypeOf from '@ganuz/set-prototype-of';

let Object_create: ObjectConstructor['create'] = Object.create;
let Function$_bind: Function['bind'] = Function.prototype.bind;

/**
 *
 * @see https://mdn.io/Reflect.construct
 * @resource https://www.ecma-international.org/ecma-262/#sec-reflect.construct
 * @resource https://www.ecma-international.org/ecma-262/#sec-function-constructor
 * @param target - A function to invokes.
 * @param args - A args list to pass to `target` invokes (can gets `ArrayLike`).
 * @param [newTarget = target] - A constructor class to create the instance.
 * @returns if `target` invokes returns an object it will returns the object else if exist `newTarget` it will returns instance of `newTarget` else  it will returns instance of `target`.
 * @throws Throws if `target` is not a constructor.
 * @throws Throws if `args` is not object.
 * @throws Throws if `newTarget` is not a constructor.
 * @example
 *
 *  class A{
 *      public color: string;
 *      constructor(public a: string){}
 *  }
 *  A.prototype.color = 'blue';
 *
 *  class B{
 *      public color: string;
 *      constructor(public b: string){}
 *  }
 *  B.prototype.color = 'red';
 *
 *  construct(v => v, []); // throw TypeError('target...')
 *  construct(A, void 0, B); // throw TypeError('args...')
 *  construct(A, [], v => v); // throw TypeError('newTarget...')
 *  construct(function C(...args){this.args = args;}, [1, 2, 3]); // => A{args: [1, 2, 3]}
 *  construct(function D(){ return 'foo'; }, [], function E(){}); // => E{}
 *  construct(function F(){ return Object('foo'); }, [], function G(){}); // => String('foo')
 *  construct(function H(){ this.h = this instanceof H;}, [], function I(){}); // => I{h: false}
 *  construct(A, {0: 1, length: '1'}); // => A{color: 'blue', a: 1}
 *  construct(A, [2], B); // => B{color: 'red', a: 2}
 *
 *  let logInstanceOf = construct(Function, ['instance, Constructor', 'console.log(instance instanceof Constructor);'], A);
 *  logInstanceOf.length; // => 2
 *  logInstanceOf(logInstanceOf, A); // => true
 *  logInstanceOf(logInstanceOf, Function); // => false
 *  typeof logInstanceOf === 'function'; // => true
 *
 *  let b = construct(Array, [5], B);
 *  b instanceof A; // => true
 *  b instanceof B; // => true
 *  b instanceof Array; // => false
 *  Array.isArray(b); // => true
 *  String(b); // => '[object Array]';
 *  b.color; // => 'red'
 *  b.length; // => 5
 *  b[9] = 6;
 *  b.length; // => 10
 *
 */
function construct<TTarget extends new(...args: any[]) => any>(target: TTarget, args: ConstructorParameters<TTarget>): InstanceType<TTarget>;
function construct<TTarget extends new(...args: any[]) => any, TNewTarget extends new(...args: any[]) => any>(target: TTarget, args: ConstructorParameters<TTarget>, newTarget: TNewTarget): InstanceType<TNewTarget>;
function construct<TTarget extends (this: InstanceType<TNewTarget>, ...args: any[]) => any, TNewTarget extends new(...args: any[]) => any>(target: TTarget, args: Parameters<TTarget>, newTarget: TNewTarget): ReturnType<TTarget> extends object ? ReturnType<TTarget> : InstanceType<TNewTarget>;
function construct(target: Function, args: ArrayLike<any>, newTarget?: Function): Object;
function construct(target: Function, args: ArrayLike<any>, newTarget?: Function): object {
  assertTypeOf(target, $function);
  let proto = arguments.length > 2 && target !== newTarget && assertTypeOf(newTarget, $function).prototype;

  // if target is native constructor, the instance will be created from the native constructor to make the instance as the native type.
  if (isNative(target) || !proto) {
    let instance: object = new (Function$_bind.apply(target, [null].concat(args)));
    // if it native and has a newTarget then set the newTarget proto.
    return (proto && setPrototypeOf(instance, proto), instance);
  }

  let instance: object = Object_create(proto);
  let result: any = apply(target, instance, args);

  return isTypeOf(result, [$function, $object]) ? result : instance;
}

// @ts-ignore
construct = getGlobal('Reflect.construct', construct);

export default construct;
