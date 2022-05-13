import { InterventionInviteDTO } from 'models/Intervention';
import { ApiData } from 'models/Api';

export type EmailLoadingType = {
  id?: string;
  email?: string;
};

export type EmailInvitation = {
  id: string;
  email: string;
};

export type InterventionInviteApiResponse = ApiData<InterventionInviteDTO>;

export enum ShareBoxType {
  INTERVENTION = 'INTERVENTION',
  SESSION = 'SESSION',
}
