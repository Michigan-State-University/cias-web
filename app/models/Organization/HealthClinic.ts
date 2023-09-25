import { User } from 'models/User';

import { OrganizableInvitation } from './OrganizableInvitation';

export type HealthClinic = {
  id: string;
  name: string;
  healthSystemId: string;
  deleted: boolean;
  healthClinicAdmins: User[];
  healthClinicInvitations: OrganizableInvitation[];
};
