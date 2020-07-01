import { mapKeys, snakeCase } from 'lodash';
const objectKeysToSnakeCase = obj => mapKeys(obj, (_, key) => snakeCase(key));
export default objectKeysToSnakeCase;
