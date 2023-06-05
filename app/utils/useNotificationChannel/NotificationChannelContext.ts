import { createContext } from 'react';

import { useNotificationChannel } from './useNotificationChannel';

export type NotificationChannelContextType = {
  readConversationNotifications: (conversationId: string) => void;
} & Pick<
  ReturnType<typeof useNotificationChannel>,
  'readNotification' | 'setNavigatorAvailability'
>;

export const NotificationChannelContext =
  createContext<Nullable<NotificationChannelContextType>>(null);
