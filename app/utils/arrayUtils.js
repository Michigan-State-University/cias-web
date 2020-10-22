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
