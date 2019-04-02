/*!
 * @module @ganuz/define-property/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import defineProperty from '@ganuz/define-property';

declare global {
  interface Reflect {
    defineProperty: typeof defineProperty;
  }
}

getGlobal<any>('Reflect', {}, true).defineProperty = defineProperty;
