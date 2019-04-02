/*!
 * @module @ganuz/get/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import get from '@ganuz/get';

declare global {
  interface Reflect {
    get: typeof get;
  }
}

getGlobal<any>('Reflect', {}, true).get = get;
