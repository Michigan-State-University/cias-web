import { Phone } from 'models/Phone';

export enum NotifyByOptions {
  EMAIL = 'email',
  SMS = 'sms',
}

export type ParticipantLink = {
  id: string;
  displayName: string;
  url: string;
  deleting?: boolean;
};

export type NoNavigatorAvailableData = {
  contactEmail: string;
  id: string;
  noNavigatorAvailableMessage: string;
  notifyBy: NotifyByOptions;
  participantLinks: ParticipantLink[];
  phone: Nullable<Omit<Phone, 'id' | 'confirmed'>>;
  isNavigatorNotificationOn: boolean;
};
