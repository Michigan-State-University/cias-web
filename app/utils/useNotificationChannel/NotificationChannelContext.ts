import { createContext } from 'react';

import { NotificationChannel } from './useNotificationChannel';

export type NotificationChannelContextType = {
  readConversationNotifications: (conversationId: string) => void;
} & Pick<NotificationChannel, 'readNotification' | 'setNavigatorAvailability'>;

export const NotificationChannelContext =
  createContext<Nullable<NotificationChannelContextType>>(null);
