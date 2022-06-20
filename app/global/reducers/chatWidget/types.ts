import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type ChatWidgetAction = ActionType<typeof actions>;

export type ChatWidgetState = {
  liveChatEnabled: boolean;
};
