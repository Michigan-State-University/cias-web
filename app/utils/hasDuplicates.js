/**
 * @param  {Array<any>} array input array
 * @returns {boolean} `true` if array has duplicates, `false` otherwise
 */
export const hasDuplicates = array => new Set(array).size !== array.length;
