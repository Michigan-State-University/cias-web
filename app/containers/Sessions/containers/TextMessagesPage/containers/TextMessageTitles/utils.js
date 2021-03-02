const MAX_ROWS = 5;
const MAX_COLUMNS = 3;
const MAX_ITEMS = MAX_ROWS * MAX_COLUMNS;
export const EMPTY_TILE = 'EMPTY_TILE';
export const ADD_TILE = 'ADD_TILE';

export const itemsMapper = textMessages => {
  let emptyItemsLength;
  const textMessagesLength = textMessages?.length ?? 0;
  const currentLength = textMessagesLength + 1;
  if (currentLength < MAX_ITEMS) emptyItemsLength = MAX_ITEMS - currentLength;
  else emptyItemsLength = 3 - (currentLength % MAX_COLUMNS);

  const emptyItems = [...Array(emptyItemsLength)].map((_, index) => ({
    id: index,
    type: EMPTY_TILE,
  }));
  const addItem = { id: ADD_TILE, type: ADD_TILE };
  return [addItem, ...textMessages, ...emptyItems];
};
