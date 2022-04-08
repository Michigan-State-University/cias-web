import get from 'lodash/get';

import { reorder } from 'utils/reorder';

export const selectId = (item, selector) => {
  if (typeof selector === 'string') return get(item, selector);

  return selector(item);
};

export const reorderItems = (items, dragFromId, dragToId, selector) => {
  if (dragFromId === dragToId) return { items, hasChanged: false };

  const dragFromIndex = items.findIndex(
    item => selectId(item, selector) === dragFromId,
  );
  const dragToIndex = items.findIndex(
    item => selectId(item, selector) === dragToId,
  );

  if (dragFromIndex < 0 || dragToIndex < 0) return { items, hasChanged: false };

  return {
    items: reorder(items, dragFromIndex, dragToIndex),
    hasChanged: true,
  };
};
