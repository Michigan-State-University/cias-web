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
 * @param {string} id
 */
export const findIndexById = (array, id) =>
  array.findIndex(({ id: itemId }) => id === itemId);

/**
 * @param {Array<any>} array
 * @param {string} id
 */
export const findById = (array, id) =>
  array.find(({ id: itemId }) => id === itemId);
