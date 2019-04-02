/*!
 * @module @ganuz/_get-metadata-map
 * @copyright © Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import _Map from '@ganuz/_map';
import _WeakMap from '@ganuz/_weak-map';
import isTypeOf from '@pakal/is-type-of';
import assertTypeOf from '@pakal/is-type-of/assert';
import { $function, $object, $symbol, $undefined } from '@pakal/type-of';

let Object_create: ObjectConstructor['create'] = Object.create;

export type IMetadataMap = Map<any, any>;
export type IPropertiesMap = {[key: string]: IMetadataMap};
export type ITargetsMap = WeakMap<object, IPropertiesMap>;

const METADATA_TARGET_KEY = '@@__TARGET_METADATA_KEY__@@';
const MOCK_METADATA_MAP: IMetadataMap = new _Map();
MOCK_METADATA_MAP.set = (() => {
}) as any;
const TARGETS_MAP: ITargetsMap = new _WeakMap();

/**
 * @remarks
 * It uses object to 'propertiesMap' because, according to the spec,
 * `property` can only be of type 'string' or 'symbol' or 'undefined'.
 * @param target - The target object of the map.
 * @param [property = TARGET_KEY] - The property key of the map.
 * @param [toCreate = false] - If map not exist, it should create new map.
 * @returns Returns The metadata map of the `property` in `target` or if map not exist and `toCreate` is `false` it will returns fake map.
 * @throws Throws if `target` is not object.
 */
function _getMetadataMap(target: object, property?: PropertyKey, toCreate?: boolean): IMetadataMap {
  assertTypeOf(target, [$object, $function]);

  let propertiesMap: IPropertiesMap = TARGETS_MAP.get(target); // scope(METADATA_KEY, target)

  if (!propertiesMap) {
    if (!toCreate) {
      return MOCK_METADATA_MAP;
    }

    TARGETS_MAP.set(target, propertiesMap = Object_create(null));
  }

  property = isTypeOf(property, $undefined) ? METADATA_TARGET_KEY : isTypeOf(property, $symbol) ? property : String(property);

  return propertiesMap[property as any] || (toCreate ? (propertiesMap[property as any] = new _Map()) : MOCK_METADATA_MAP);
}

export default _getMetadataMap;
