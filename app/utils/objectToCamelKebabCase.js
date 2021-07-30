import startCase from 'lodash/startCase';
import replace from 'lodash/replace';
import { mapKeysDeep } from 'utils/mapKeysDeep';

const objectToCamelKebabCase = (obj) =>
  mapKeysDeep(obj, (_, key) => replace(startCase(key), ' ', '-'));

export default objectToCamelKebabCase;
