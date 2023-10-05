import { PhoneAttributes } from 'models/Phone';

export type PredefinedParticipant = {
  id: string;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  fullName: Nullable<string>;
  phone: Nullable<PhoneAttributes>;
  externalId: Nullable<string>;
  email: Nullable<string>;
  slug: string;
  autoInvitation: boolean;
  invitationSentAt: Nullable<string>;
  healthClinicId: Nullable<string>;
  active: boolean;
};
