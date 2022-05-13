import { CamelToSnakeOmitId } from 'global/types/camelToSnake';
import { InterventionType } from 'models/Intervention/InterventionDto';
import { FileInfo } from 'models/Intervention';
import { Session } from 'models/Session/Session';
import { UserSession } from 'models/UserSession/UserSession';
import { UserInterventionStatus } from './StatusTypes';

export interface UserIntervention {
  id: string;
  completedSessions: number;
  blocked: boolean;
  intervention: {
    additionalText: string;
    name: string;
    type: InterventionType;
    logoUrl: Nullable<string>;
    imageAlt: Nullable<string>;
    id: string;
    files: FileInfo[];
  };
  lastAnswerDate: Nullable<string>;
  sessionsInIntervention: number;
  status: UserInterventionStatus;
  sessions: { data: Session[] };
  userSessions: { data: UserSession[] };
}

export type UserInterventionDTO = CamelToSnakeOmitId<UserIntervention>;
