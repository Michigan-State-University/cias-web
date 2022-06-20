import { liveChatReducerKey } from './liveChat/reducer';
import { LiveChatState } from './liveChat/types';
import { chatWidgetReducerKey } from './chatWidget/reducer';
import { ChatWidgetState } from './chatWidget/types';

export type RootState = {
  [liveChatReducerKey]: LiveChatState;
  [chatWidgetReducerKey]: ChatWidgetState;
};
