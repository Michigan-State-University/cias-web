/* eslint-disable no-param-reassign */
import { Draft } from 'immer';
import cloneDeep from 'lodash/cloneDeep';

import { findIndexById } from 'utils/arrayUtils';

/**
 * Update Immer draft item from collection based on the `id`
 *
 * @param {Draft<T[]>} draftCollection
 * @param id
 * @param {function(item: T, index: number): Object|Object} updater Function returning Object and taking `item` and `index` or an Object to assign to
 * @template T
 */
export const updateItemById = (draftCollection, id, updater) => {
  const index = findIndexById(draftCollection, id);

  if (index !== -1)
    switch (updater.constructor) {
      case Function:
        draftCollection[index] = updater(
          cloneDeep(draftCollection[index]),
          index,
        );
        break;
      case Object:
      default:
        draftCollection[index] = updater;
        break;
    }
};

/**
 * Delete Immer draft item from collection based on the `id`
 *
 * @param {Draft<T[]>} draftCollection
 * @param id
 * @template T
 */
export const deleteItemById = (draftCollection, id) => {
  const index = findIndexById(draftCollection, id);

  if (index !== -1) draftCollection.splice(index, 1);
};
