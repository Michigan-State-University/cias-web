import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';

export const mapKeysDeep = (obj, cb) => {
  if (isArray(obj)) {
    return obj.map((innerObj) => mapKeysDeep(innerObj, cb));
  }
  if (isObject(obj)) {
    return mapValues(mapKeys(obj, cb), (val) => mapKeysDeep(val, cb));
  }
  return obj;
};
