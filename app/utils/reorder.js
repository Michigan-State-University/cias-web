import { insertAt, removeAt } from 'utils/arrayUtils';

/**
 * Reorders a `list` by moving item from the `previous` position to the `next` position
 * @param {Array<any>} list
 * @param {number} previousIndex
 * @param {number} nextIndex
 * @returns {Array<any>} Returns new reordered list
 */
export const reorder = (list, previousIndex, nextIndex) => {
  const listCopy = [...list];
  const sourceItemCopy = { ...listCopy[previousIndex] };

  removeAt(listCopy, previousIndex);
  insertAt(listCopy, nextIndex, sourceItemCopy);

  return listCopy;
};
