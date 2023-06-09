import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { AnswersAction } from './answers/types';
import { LiveChatAction } from './liveChat/types';
import { NavigatorSetupAction } from './navigatorSetup/types';
import { NotificationsAction } from './notifications/types';
import { TlfbAction } from './tlfb/types';

export type WithReducer = Parameters<typeof useInjectReducer>[0];

export type WithSaga = Parameters<typeof useInjectSaga>[0];

export type RootAction =
  | AnswersAction
  | LiveChatAction
  | NavigatorSetupAction
  | NotificationsAction
  | TlfbAction;
