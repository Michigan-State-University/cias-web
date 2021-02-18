import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from 'utils/mapKeysDeep';

const objectToCamelCase = obj => mapKeysDeep(obj, (_, key) => camelCase(key));

export default objectToCamelCase;
