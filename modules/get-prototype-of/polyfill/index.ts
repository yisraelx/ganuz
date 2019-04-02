/*!
 * @module @ganuz/get-prototype-of/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import getPrototypeOf from '@ganuz/get-prototype-of';

declare global {
  interface Reflect {
    getPrototypeOf: typeof getPrototypeOf;
  }
}

getGlobal<any>('Reflect', {}, true).getPrototypeOf = getPrototypeOf;
