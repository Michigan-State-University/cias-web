import intersection from 'lodash/intersection';

/**
 * @param {Array<any>} array
 * @param {number} index
 * @param {any} item
 */
export const insertAt = (array, index, item) => array.splice(index, 0, item);

/**
 * @param {Array<any>} array
 * @param {number} index
 */
export const removeAt = (array, index) => array.splice(index, 1);

/**
 * @param {Array<any>} array
 * @param {string | number} id
 */
export const findIndexById = (array, id) =>
  array.findIndex(({ id: itemId }) => id === itemId);

/**
 * @param {Array<any>} array
 * @param {string} id
 */
export const findById = (array, id) =>
  array.find(({ id: itemId }) => id === itemId);

/**
 * Check if two arrays overlap
 * @param  {Array<any>} array
 * @param  {Array<any>} otherArray
 * @returns {boolean} `true` if arrays overlap, `false` otherwise
 */
export const arraysOverlap = (array, otherArray) => {
  const mutualValues = intersection(array, otherArray);

  return mutualValues.length > 0;
};

/**
 * @param {Array<any>} array
 * @param {string} id
 */
export const removeById = (array, id) => {
  const index = findIndexById(array, id);
  removeAt(array, index);
};

/**
 * @param {Array<any>} array
 * @param {number} index
 */
export const isLast = (array, index) => index === array.length - 1;
