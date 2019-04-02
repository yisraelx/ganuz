/*!
 * @module @ganuz/_map
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';

interface IMapPolyfillEntry {
  next?: IMapPolyfillEntry | null;
  key?: any;
  value?: any;
}

let _set = (target: object, key: string, value: any) => (target[key] = value, target);
let $key: 'key' = 'key';
let $value: 'value' = 'value';
let $next: 'next' = 'next';
let empty;

/**
 * @resource https://www.ecma-international.org/ecma-262/#sec-map-objects
 * @remarks This is not a complete implement of es6 `Map`, it's a minimal implement for library needs.
 */
function _Map() {

  let head: IMapPolyfillEntry = empty;
  let current: IMapPolyfillEntry;
  let previous: IMapPolyfillEntry;

  let each = (cb: (entry: IMapPolyfillEntry) => boolean | any): IMapPolyfillEntry | null => {
    previous = empty;
    current = head;
    while (current && cb(current) !== false) {
      previous = current;
      current = previous[$next];
    }
    return current;
  };

  let find = (key: any): IMapPolyfillEntry | null => each(key !== key ? (entry) => entry[$key] === entry[$key] : (entry) => key !== entry[$key]);
  let has = (key): boolean => !!find(key);

  let map = {
    get: (key: any): any | undefined => find(key) && current[$value],
    set: (key: any, value: any) => (_set(find(key) || _set(head ? (previous[$next] = {}) : (head = {}), $key, key), $value, value), map),
    has,
    delete: (key: any): boolean => has(key) && (previous ? _set(previous, $next, current[$next]) : (head = head[$next]), true),
    forEach: (cb: (value: any, key: any) => any) => void each((entry) => cb(entry[$value], entry[$key]))
  };

  return map;
}

export default getGlobal<MapConstructor>('Map', _Map as any);
