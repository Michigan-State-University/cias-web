import { AnswersAction } from './answers';
import { LiveChatAction } from './liveChat';

export type RootAction = AnswersAction | LiveChatAction;
