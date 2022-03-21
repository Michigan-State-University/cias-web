/* eslint-disable no-param-reassign */
import { Draft } from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import assign from 'lodash/assign';

import { findIndexById } from 'utils/arrayUtils';
import { objectDifference } from 'utils/objectDifference';

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
  let updatedValue = null;

  if (index !== -1) {
    switch (updater.constructor) {
      case Function:
        updatedValue = updater(draftCollection[index], index);
        break;
      case Object:
      default:
        updatedValue = updater;
        break;
    }

    assignSourceDiffToTarget(updatedValue, draftCollection[index]);
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
 * @param {Draft<T[]>} assignFrom
 * @param {Draft<T[]>} assignTo
 * @param id
 * @template T
 */
export const assignDraftItemsById = (assignFrom, assignTo, id) => {
  const sourceIndex = findIndexById(assignFrom, id);
  const targetIndex = findIndexById(assignTo, id);

  if (sourceIndex !== -1 && targetIndex !== -1)
    assignSourceDiffToTarget(assignFrom[sourceIndex], assignTo[targetIndex]);
};

/**
 * Assign two Immer draft items in a collection
 *
 * @param {Draft<T|T[]>} assignFrom
 * @param {Draft<T|T[]>} assignTo
 * @template T
 */
export const assignDraftItems = (assignFrom, assignTo) => {
  if (Array.isArray(assignFrom)) {
    assignSourceDiffToTargetArray(assignFrom, assignTo);
  } else {
    assignSourceDiffToTarget(assignFrom, assignTo);
  }
};

/**
 * @param {Draft<T>} assignFrom
 * @param {Draft<T>} assignTo
 * @template T
 */
const assignSourceDiffToTarget = (assignFrom, assignTo) => {
  const sourceToTargetDiff = objectDifference(assignTo, assignFrom);
  const diffDeepClone = cloneDeep(sourceToTargetDiff);

  assign(assignTo, diffDeepClone);
};

/**
 * @param {Draft<T[]>} assignFrom
 * @param {Draft<T[]>} assignTo
 * @template T
 */
const assignSourceDiffToTargetArray = (assignFrom, assignTo) => {
  const fromLength = assignFrom.length;
  const toLength = assignTo.length;
  const commonLength = Math.min(fromLength, toLength);

  // edit common index items
  for (let i = 0; i < commonLength; i++) {
    assignSourceDiffToTarget(assignFrom[i], assignTo[i]);
  }

  const lengthDifference = toLength - fromLength;

  // arrays equal -> do nothing
  if (lengthDifference === 0) return;

  // source is smaller -> remove excess of items
  if (lengthDifference > 0) {
    assignTo.splice(fromLength);
  }
  // source is bigger -> add missing items
  else {
    const newItems = cloneDeep(assignFrom.slice(toLength));
    assignTo.push(...newItems);
  }
};
