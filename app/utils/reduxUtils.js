/* eslint-disable no-param-reassign */
import { Draft } from 'immer';

import { findIndexById } from 'utils/arrayUtils';

/**
 * Update Immer draft item from collection based on the `id`
 *
 * @param {Draft<T[]>} draftCollection
 * @param id
 * @param {Object|function(item: T, index: number):Object} updater Function returning Object and taking `item` and `index` or an Object to assign to
 * @template T
 */
export const updateItemById = (draftCollection, id, updater) => {
  const index = findIndexById(draftCollection, id);

  if (index !== -1)
    switch (updater.constructor) {
      case Function:
        draftCollection[index] = updater(draftCollection[index], index);
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

/**
 * Assign two Immer draft items in a collection based on the `id`
 *
 * @param {Draft<T[]>} sourceDraft
 * @param {Draft<T[]>} targetDraft
 * @param id
 * @template T
 */
export const assignDraftItemsById = (sourceDraft, targetDraft, id) => {
  const sourceIndex = findIndexById(sourceDraft, id);
  const targetIndex = findIndexById(targetDraft, id);

  if (sourceIndex !== -1 && targetIndex !== -1)
    targetDraft[targetIndex] = sourceDraft[sourceIndex];
};
