import snakeCase from 'lodash/snakeCase';
import { mapKeysDeep } from 'utils/mapKeysDeep';

const objectKeysToSnakeCase = obj =>
  mapKeysDeep(obj, (_, key) => snakeCase(key));

export default objectKeysToSnakeCase;
