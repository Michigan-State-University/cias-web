import { createAction } from 'typesafe-actions';

import { SET_CHAT_ENABLED, SET_CHAT_DISABLED } from './constants';

export const setChatEnabled = createAction(
  SET_CHAT_ENABLED,
  (action) => (interventionId: string) => action({ interventionId }),
);

export const setChatDisabled = createAction(
  SET_CHAT_DISABLED,
  (action) => () => action({}),
);
