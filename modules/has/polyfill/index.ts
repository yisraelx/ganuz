/*!
 * @module @ganuz/has/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import has from '@ganuz/has';

declare global {
  interface Reflect {
    has: typeof has;
  }
}

getGlobal<any>('Reflect', {}, true).has = has;
