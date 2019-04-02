/*!
 * @module @ganuz/set/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import set from '@ganuz/set';

declare global {
  interface Reflect {
    set: typeof set;
  }
}

getGlobal<any>('Reflect', {}, true).set = set;
