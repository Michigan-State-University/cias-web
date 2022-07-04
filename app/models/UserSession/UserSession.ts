import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

enum UserSessionTypes {
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
  liveChatEnabled: boolean;
  quickExitEnabled: boolean;
}

export type UserSessionDTO = CamelToSnakeOmitId<UserSession>;
