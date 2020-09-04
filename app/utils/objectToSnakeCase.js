import snakeCase from 'lodash/snakeCase';
import mapKeys from 'lodash/mapKeys';

const objectKeysToSnakeCase = obj => mapKeys(obj, (_, key) => snakeCase(key));

export default objectKeysToSnakeCase;
