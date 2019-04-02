/*!
 * @module @ganuz/construct/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import construct from '@ganuz/construct';

declare global {
  interface Reflect {
    construct: typeof construct;
  }
}

getGlobal<any>('Reflect', {}, true).construct = construct;
