import { CamelToSnakeOmitId } from 'global/types/camelToSnake';
import { InterventionStatus, InterventionType } from 'models/Intervention';
import { AppFile } from 'models/File';
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
    files: AppFile[];
    liveChatEnabled: boolean;
    status: InterventionStatus;
  };
  lastAnswerDate: Nullable<string>;
  sessionsInIntervention: number;
  status: UserInterventionStatus;
  sessions: { data: Session[] };
  userSessions: { data: UserSession[] };
  containMultipleFillSession: boolean;
  healthClinicId: Nullable<string>;
}

export type UserInterventionDTO = CamelToSnakeOmitId<UserIntervention>;
