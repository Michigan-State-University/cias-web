import React, { PropsWithChildren } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useSelector } from 'react-redux';

import { NotificationEvent } from 'models/Notification';

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

  const { readNotification } = useNotificationChannel();

  const readConversationNotifications = (conversationId: string) => {
    notifications.forEach(({ id, data, event }) => {
      if (event !== NotificationEvent.NEW_CONVERSATION) return;
      if (data.conversationId === conversationId) {
        readNotification({ notificationId: id });
      }
    });
  };

  return (
    <NotificationsActionsContext.Provider
      value={{ readConversationNotifications, readNotification }}
    >
      {children}
    </NotificationsActionsContext.Provider>
  );
};
