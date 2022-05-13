import sortBy from 'lodash/sortBy';

import { Session } from 'models/Session';
import {
  UserInterventionDTO,
  UserIntervention,
} from 'models/UserIntervention/UserIntervention';
import { UserSession } from 'models/UserSession/UserSession';

import { jsonApiToObject, jsonApiToArray } from 'utils/jsonApiMapper';

export const parseUserIntervention = (
  userIntervention: UserInterventionDTO,
): {
  userIntervention: UserIntervention;
  sessions: Session[];
  userSessions: UserSession[];
} => {
  const parsedUserIntervention = jsonApiToObject(
    userIntervention,
    'userIntervention',
  );
  const sessions = sortBy(
    jsonApiToArray(parsedUserIntervention.sessions, 'session'),
    ['position'],
  );
  const userSessions = jsonApiToArray(
    parsedUserIntervention.userSessions,
    'userSession',
  );
  return { userIntervention: parsedUserIntervention, sessions, userSessions };
};
