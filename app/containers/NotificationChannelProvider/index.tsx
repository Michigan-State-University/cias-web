import React, { PropsWithChildren, useMemo } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useSelector } from 'react-redux';

import {
  NotificationChannelContext,
  useNotificationChannel,
} from 'utils/useNotificationChannel';

import {
  withNotificationsReducer,
  withAllNotificationsSagas,
  makeSelectNotifications,
} from 'global/reducers/notifications';

export const NotificationChannelProvider = ({
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

  const contextValue = useMemo(
    () => ({
      readConversationNotifications,
      readNotification,
      setNavigatorAvailability,
    }),
    [readNotification, setNavigatorAvailability, notifications],
  );

  return (
    <NotificationChannelContext.Provider value={contextValue}>
      {children}
    </NotificationChannelContext.Provider>
  );
};
