/*!
 * @module @ganuz/get-own-property-descriptor/polyfill
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import getOwnPropertyDescriptor from '@ganuz/get-own-property-descriptor';

declare global {
  interface Reflect {
    getOwnPropertyDescriptor: typeof getOwnPropertyDescriptor;
  }
}

getGlobal<any>('Reflect', {}, true).getOwnPropertyDescriptor = getOwnPropertyDescriptor;
