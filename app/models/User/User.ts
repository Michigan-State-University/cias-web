import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export enum UserRoles {
  ADMIN = 'admin',
  RESEARCHER = 'researcher',
  PARTICIPANT = 'participant',
  GUEST = 'guest',
  PREVIEW_SESSION = 'preview_session',
  THIRD_PARTY = 'third_party',
  HEALTH_CLINIC_ADMIN = 'health_clinic_admin',
  HEALTH_SYSTEM_ADMIN = 'health_system_admin',
  ORGANIZATION_ADMIN = 'organization_admin',
  E_INTERVENTION_ADMIN = 'e_intervention_admin',
  TEAM_ADMIN = 'team_admin',
}

export interface User {
  active: boolean;
  email: string;
  emailNotification: boolean;
  feedbackCompleted: boolean;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
  phoneName: Nullable<string>;
  roles: UserRoles[];
  smsNotification: boolean;
  teamId: Nullable<string>;
  teamName: Nullable<string>;
  abilityToCreateCatMh: boolean;
}

export type UserDTO = CamelToSnakeOmitId<User>;
