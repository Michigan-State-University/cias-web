import { createContext } from 'react';

export const CopyModalContext = createContext({ interventionStatusFilter: [] });

export const InfiniteScrollContext = createContext({
  selectedItem: null,
  changeViewAction: null,
  selectAction: null,
  disableCopy: null,
  listIcon: null,
  disabledItemsIds: null,
});
