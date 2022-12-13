import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export enum UserSessionType {
  CLASSIC = 'UserSession::Classic',
  CAT_MH = 'UserSession::CatMh',
}

export interface UserSession {
  finishedAt: String;
  id: String;
  imageAlt: Nullable<String>;
  languageCode: String;
  languageName: String;
  lastAnswerAt: Nullable<String>;
  logoUrl: Nullable<String>;
  sessionId: String;
  type: UserSessionType;
  scheduledAt: Nullable<string>;
  liveChatEnabled: boolean;
  quickExitEnabled: boolean;
  userInterventionId?: Nullable<string>;
  filledOutCount: number;
}

export type UserSessionDTO = CamelToSnakeOmitId<UserSession>;
