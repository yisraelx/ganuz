/*!
 * @module @ganuz/set-prototype-of/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import setPrototypeOf from '@ganuz/set-prototype-of';

declare global {
  interface Reflect {
    setPrototypeOf: typeof setPrototypeOf;
  }
}

getGlobal<any>('Reflect', {}, true).setPrototypeOf = setPrototypeOf;
