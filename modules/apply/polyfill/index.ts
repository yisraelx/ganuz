/*!
 * @module @ganuz/apply/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import apply from '@ganuz/apply';

declare global {
  interface Reflect {
    apply: typeof apply;
  }
}

getGlobal<any>('Reflect', {}, true).apply = apply;

