import { CharacterType } from 'models/Character';

export type NewConversationNotificationData = {
  conversationId: string;
  userId: string;
  avatarUrl?: Nullable<string>;
  firstName: string;
  lastName: string;
  message: string;
};

export type NewNarratorWasSetNotificationData = {
  name: string;
  newNarrator: CharacterType;
};

// Union type
export type NotificationData =
  | NewConversationNotificationData
  | NewNarratorWasSetNotificationData;
