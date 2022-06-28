import { Phone } from 'models/Phone';

export enum NotifyByOptions {
  EMAIL = 'email',
  SMS = 'sms',
}

export type NavigatorSetup = {
  contactEmail: string;
  id: string;
  noNavigatorAvailableMessage: string;
  notifyBy: NotifyByOptions;
  participantLinks: any[];
  phone: Nullable<Omit<Phone, 'id' | 'confirmed'>>;
  isNavigatorNotificationOn: boolean;
};
