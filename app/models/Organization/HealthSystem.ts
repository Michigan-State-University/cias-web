import { User } from 'models/User';

import { HealthClinic } from './HealthClinic';

export type HealthSystem = {
  id: string;
  name: string;
  organizationId: string;
  deleted: boolean;
  healthSystemAdmins: User[];
  healthClinics: HealthClinic[];
};
