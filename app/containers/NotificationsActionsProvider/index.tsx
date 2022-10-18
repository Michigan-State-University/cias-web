import React, { createContext, PropsWithChildren } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useSelector } from 'react-redux';

import { useNotificationChannel } from 'utils/useNotificationChannel';

import {
  withNotificationsReducer,
  withAllNotificationsSagas,
  makeSelectNotifications,
} from 'global/reducers/notifications';

export type NotificationsActionsContextType = {
  readConversationNotifications: (conversationId: string) => void;
} & Pick<ReturnType<typeof useNotificationChannel>, 'setNavigatorAvailability'>;

export const NotificationsActionsContext =
  createContext<Nullable<NotificationsActionsContextType>>(null);

export const NotificationsActionsProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  useInjectReducer(withNotificationsReducer);
  useInjectSaga(withAllNotificationsSagas);
  const notifications = useSelector(makeSelectNotifications());

  const { readNotification, setNavigatorAvailability } =
    useNotificationChannel();

  const readConversationNotifications = (conversationId: string) => {
    notifications.forEach(({ id, data }) => {
      if (data?.conversationId === conversationId) {
        readNotification({ notificationId: id });
      }
    });
  };

  return (
    <NotificationsActionsContext.Provider
      value={{ readConversationNotifications, setNavigatorAvailability }}
    >
      {children}
    </NotificationsActionsContext.Provider>
  );
};
