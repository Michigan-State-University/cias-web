import { insertAt, removeAt } from 'utils/arrayUtils';

/**
 * Reorders a `list` by moving item from the `previous` position to the `next` position
 * Creates a copy of array, but PRESERVES object references
 */
export const reorder = <T>(
  list: T[],
  previousIndex: number,
  nextIndex: number,
): T[] => {
  const listCopy = [...list];
  const sourceItemCopy = listCopy[previousIndex];

  removeAt(listCopy, previousIndex);
  insertAt(listCopy, nextIndex, sourceItemCopy);

  return listCopy;
};
