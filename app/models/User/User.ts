import { CamelToSnakeOmitId } from 'global/types/camelToSnake';
import { Roles } from './RolesManager/UserRoles';

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
  roles: Roles[];
  smsNotification: boolean;
  teamId: Nullable<string>;
  teamName: Nullable<string>;
}

export type UserDTO = CamelToSnakeOmitId<User>;
