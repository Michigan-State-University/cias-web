import { liveChatReducerKey } from './liveChat/reducer';
import { LiveChatState } from './liveChat/types';
import { chatWidgetReducerKey } from './chatWidget/reducer';
import { ChatWidgetState } from './chatWidget/types';
import { navigatorSetupReducerKey } from './navigatorSetup/reducer';
import { NavigatorSetupState } from './navigatorSetup/types';
import { notificationsReducerKey } from './notifications/reducer';
import { NotificationsState } from './notifications/types';
import { answersReducerKey } from './answers/reducer';
import { AnswersState } from './answers/types';
import { tlfbReducerKey } from './tlfb/reducer';
import { TlfbState } from './tlfb/types';

export type RootState = {
  [liveChatReducerKey]: LiveChatState;
  [chatWidgetReducerKey]: ChatWidgetState;
  [navigatorSetupReducerKey]: NavigatorSetupState;
  [notificationsReducerKey]: NotificationsState;
  [answersReducerKey]: AnswersState;
  [tlfbReducerKey]: TlfbState;
};
