export type NewConversationNotificationData = {
  conversationId: string;
  userId: string;
  avatarUrl?: Nullable<string>;
  firstName: string;
  lastName: string;
  message: string;
};

// Union type
export type NotificationData = NewConversationNotificationData;
