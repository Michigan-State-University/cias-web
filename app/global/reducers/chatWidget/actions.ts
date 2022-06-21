import { createAction } from 'typesafe-actions';

import { SET_CHAT_ENABLED } from './constants';

export const setChatEnabled = createAction(
  SET_CHAT_ENABLED,
  (action) => (liveChatEnabled: boolean) => action(liveChatEnabled),
);
