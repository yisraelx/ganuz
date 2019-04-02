/*!
 * @module @ganuz/is-instance-of
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

let Symbol_hasInstance: symbol = typeof Symbol !== 'undefined' ? Symbol.hasInstance : '@@hasInstance' as any;

/**
 * Checks if `value` is instance of `constructor`.
 *
 * @see https://mdn.io/instanceof
 * @see https://mdn.io/Symbol.hasInstance
 * @resource https://www.ecma-international.org/ecma-262/#sec-instanceofoperator
 * @param value - The value to check.
 * @param constructor - The class to check.
 * @returns Returns `true` if `value` is instance of `constructor`, otherwise `false`.
 * @throws Throws if `constructor` is not constructor.
 * @example
 *
 *  isInstanceOf('foo', null); // throw TypeError
 *  isInstanceOf('foo', {}); // throw TypeError
 *  isInstanceOf('foo', class { static [Symbol.hasInstance] = 'foo'; }}); // throw TypeError
 *  isInstanceOf(NaN, Number); // => false
 *  isInstanceOf({}, Object); // => true
 *  isInstanceOf(Object.create(null), Object); // => false
 *  isInstanceOf('some', {[Symbol.hasInstance]: (v) => v === 'some'}); // => true
 *
 * @example
 *
 *  let iframe = document.createElement('iframe');
 *  document.body.appendChild(iframe);
 *  let {Array: IFrameArray, Object: IFrameObject, Symbol: IFrameSymbol} = iframe.contentWindow;
 *
 *  isInstanceOf([], IFrameArray); // => false
 *
 *  // Note: In native `Symbol` ({Symbol.hasInstance]: 'S'})[IFrameSymbol.hasInstance] === 'S', but in most es6 `Symbol` polyfill ({Symbol.hasInstance]: 'S'})[IFrameSymbol.hasInstance] !== 'S' (in that case it will be `false`).
 *  isInstanceOf('some', Object.create(IFrameObject.prototype, {[IFrameSymbol.hasInstance]: {value: (v) => v === 'some'}})); // => true
 *
 */
function isInstanceOf<TValue extends any, TConstructor extends (Function | {[Symbol.hasInstance]: (value: any) => boolean})>(value: TValue, constructor: TConstructor): boolean {
  return (constructor && constructor[Symbol_hasInstance] != null && constructor[Symbol_hasInstance](value)) || value instanceof (constructor as Function);
}

export default isInstanceOf;
