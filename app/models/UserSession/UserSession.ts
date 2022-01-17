import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export enum UserSessionTypes {
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
  type: UserSessionTypes;
  scheduledAt: Nullable<string>;
}

export type UserSessionDTO = CamelToSnakeOmitId<UserSession>;
