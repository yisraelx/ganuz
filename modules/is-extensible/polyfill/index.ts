/*!
 * @module @ganuz/is-extensible/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import isExtensible from '@ganuz/is-extensible';

declare global {
  interface Reflect {
    isExtensible: typeof isExtensible;
  }
}

getGlobal<any>('Reflect', {}, true).isExtensible = isExtensible;
