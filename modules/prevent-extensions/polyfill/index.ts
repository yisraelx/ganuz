/*!
 * @module @ganuz/prevent-extensions/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import preventExtensions from '@ganuz/prevent-extensions';

declare global {
  interface Reflect {
    preventExtensions: typeof preventExtensions;
  }
}

getGlobal<any>('Reflect', {}, true).preventExtensions = preventExtensions;
