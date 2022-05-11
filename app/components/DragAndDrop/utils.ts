import get from 'lodash/get';

import { reorder } from 'utils/reorder';

import { TSelector } from './types';

export const selectId = <T>(
  item: T,
  selector: TSelector,
  index: number,
): string => {
  if (selector === null) return `${index}`;

  if (typeof selector === 'string') return get(item, selector);

  return selector(item);
};

export const selectIndex = <T>(
  items: T[],
  id: string,
  selector: TSelector,
): number =>
  items.findIndex((item, index) => selectId(item, selector, index) === id);

export const reorderItems = <T>(
  items: T[],
  dragFromId: string,
  dragToId: string,
  selector: TSelector,
): { items: T[]; hasChanged: boolean } => {
  if (dragFromId === dragToId) return { items, hasChanged: false };

  const dragFromIndex = selectIndex(items, dragFromId, selector);
  const dragToIndex = selectIndex(items, dragToId, selector);

  if (dragFromIndex < 0 || dragToIndex < 0) return { items, hasChanged: false };

  return {
    items: reorder(items, dragFromIndex, dragToIndex),
    hasChanged: true,
  };
};
