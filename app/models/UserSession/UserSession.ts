import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export enum UserSessionType {
  CLASSIC = 'UserSession::Classic',
  CAT = 'UserSession::Cat',
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
  quickExitEnabled: boolean;
}

export type UserSessionDTO = CamelToSnakeOmitId<UserSession>;
