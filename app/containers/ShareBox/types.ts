export type EmailLoadingType = {
  id?: string;
  email?: string;
};

export type EmailInvitation = {
  id: string;
  email: string;
};

export enum ShareBoxType {
  INTERVENTION = 'INTERVENTION',
  SESSION = 'SESSION',
}
