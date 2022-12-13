import React, { PropsWithChildren } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useSelector } from 'react-redux';

import {
  NotificationsActionsContext,
  useNotificationChannel,
} from 'utils/useNotificationChannel';

import {
  withNotificationsReducer,
  withAllNotificationsSagas,
  makeSelectNotifications,
} from 'global/reducers/notifications';

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
      if (!('conversationId' in data)) return;
      if (data.conversationId === conversationId) {
        readNotification({ notificationId: id });
      }
    });
  };

  return (
    <NotificationsActionsContext.Provider
      value={{
        readConversationNotifications,
        readNotification,
        setNavigatorAvailability,
      }}
    >
      {children}
    </NotificationsActionsContext.Provider>
  );
};
