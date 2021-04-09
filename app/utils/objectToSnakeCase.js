import snakeCase from 'lodash/snakeCase';
import { mapKeysDeep } from 'utils/mapKeysDeep';

const objectKeysToSnakeCase = (obj, omitKeys = []) =>
  mapKeysDeep(obj, (_, key) =>
    (omitKeys || []).includes(key) ? key : snakeCase(key),
  );

export default objectKeysToSnakeCase;
