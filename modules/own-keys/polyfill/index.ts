/*!
 * @module @ganuz/own-keys/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import ownKeys from '@ganuz/own-keys';

declare global {
  interface Reflect {
    ownKeys: typeof ownKeys;
  }
}

getGlobal<any>('Reflect', {}, true).ownKeys = ownKeys;
