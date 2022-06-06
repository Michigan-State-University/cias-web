import { liveChatReducerKey } from './liveChat/reducer';
import { LiveChatState } from './liveChat/types';

export type RootState = {
  [liveChatReducerKey]: LiveChatState;
};
