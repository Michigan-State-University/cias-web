import isNullOrUndefined from './isNullOrUndefined';

const ARRAY_TYPE = 'array';
const OBJECT_TYPE = 'object';

/**
 * @param {array|object} data structure to spread
 * @param {string} explicitly stated type of data structure
 * @returns {array|object} data structure if it is possible to spread it or empty data structure
 */
const safeSpread = (dataStructure, type) => {
  if (
    dataStructure &&
    (Array.isArray(dataStructure) || typeof dataStructure === 'object')
  )
    return dataStructure;

  if (isNullOrUndefined(dataStructure) && type) {
    if (type === ARRAY_TYPE) return [];

    if (type === OBJECT_TYPE) return {};
  }

  return dataStructure;
};

export default safeSpread;
