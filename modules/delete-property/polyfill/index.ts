/*!
 * @module @ganuz/delete-property/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import deleteProperty from '@ganuz/delete-property';

declare global {
  interface Reflect {
    deleteProperty: typeof deleteProperty;
  }
}

getGlobal<any>('Reflect', {}, true).deleteProperty = deleteProperty;
