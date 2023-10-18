import { User } from 'models/User';

import { OrganizableInvitation } from './OrganizableInvitation';
import { HealthSystem } from './HealthSystem';

export type Organization = {
  id: string;
  name: string;
  eInterventionAdmins: User[];
  organizationAdmins: User[];
  organizationInvitations: OrganizableInvitation[];
  healthSystems: HealthSystem[];
};
