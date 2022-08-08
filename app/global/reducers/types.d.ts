import { AnswersAction } from './answers';
import { LiveChatAction } from './liveChat';
import { NavigatorSetupAction } from './navigatorSetup';

export type RootAction = AnswersAction | LiveChatAction | NavigatorSetupAction;
