/*!
 * @module @ganuz/_weak-map
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import getGlobal from '@pakal/get-global';
import uniqueId from '@pakal/unique-id';
import _Map from '@ganuz/_map';
import defineProperty from '@ganuz/define-property';
import hasOwn from '@ganuz/has-own';
import isExtensible from '@ganuz/is-extensible';
import toDataDescriptor from '@ganuz/to-data-descriptor';

let Object_create: ObjectConstructor['create'] = Object.create;

const WEAK_MAP_SYMBOL = '@@__WEAK_MAP_KEY__@@';

let _init = (key) => {
  let bucket = Object_create(null);
  let _getMap = function (id, value?) {
    return arguments.length < 2 ? bucket[id] : void (bucket[id] = value);
  };
  defineProperty(key, WEAK_MAP_SYMBOL, toDataDescriptor(_getMap, 'c'));
  return _getMap;
};

/**
 * @resource https://www.ecma-international.org/ecma-262/#sec-weakmap-objects
 * @remarks This is not a complete implement of es6 `WeakMap`, it's a minimal implement for library needs.
 */
function _WeakMap() {
  let mapId = uniqueId();
  let extensibleMap = new _Map();

  return {
    get(key: object): any | undefined {
      return hasOwn(key, WEAK_MAP_SYMBOL) ? key[WEAK_MAP_SYMBOL](mapId) : !isExtensible(key) ? extensibleMap.get(key) : undefined;
    },
    set(key: object, value: any) {
      return ((hasOwn(key, WEAK_MAP_SYMBOL) || isExtensible(key)) ? (key[WEAK_MAP_SYMBOL] || _init(key))(mapId, value) : extensibleMap.set(key, value), this);
    }
  };
}

export default getGlobal<WeakMapConstructor>('WeakMap', _WeakMap as any);

