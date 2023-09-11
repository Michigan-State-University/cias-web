import { PhoneAttributes } from 'models/Phone';

import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

import { Roles } from './RolesManager';

export interface User {
  active: boolean;
  email: string;
  emailNotification: boolean;
  feedbackCompleted: boolean;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
  phone: Nullable<PhoneAttributes>;
  roles: Roles[];
  smsNotification: boolean;
  teamId: Nullable<string>;
  teamName: Nullable<string>;
  quickExitEnabled: boolean;
  timeZone: string;
  description: string;
  avatarUrl: Nullable<string>;
  adminsTeamIds: string[];
  organizableId: Nullable<string>;
  healthClinicsIds: Nullable<string[]>;
}

export type SimpleUser = Pick<
  User,
  'avatarUrl' | 'firstName' | 'id' | 'lastName' | 'email'
>;

export type UserDTO = CamelToSnakeOmitId<User>;
