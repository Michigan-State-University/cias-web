import { createContext } from 'react';

import { useNotificationChannel } from './useNotificationChannel';

export type NotificationsActionsContextType = {
  readConversationNotifications: (conversationId: string) => void;
} & Pick<
  ReturnType<typeof useNotificationChannel>,
  'readNotification' | 'setNavigatorAvailability'
>;

export const NotificationsActionsContext =
  createContext<Nullable<NotificationsActionsContextType>>(null);