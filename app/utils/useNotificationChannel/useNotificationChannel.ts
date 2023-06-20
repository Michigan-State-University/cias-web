import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useInjectSaga } from 'redux-injectors';

import { Notification, NotificationEvent } from 'models/Notification';

import { SocketMessageListener, useSocket } from 'utils/useSocket';
import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';

import { makeSelectIsUserLoggedIn } from 'global/reducers/auth';
import {
  markNotificationReadLocally,
  onNewNotificationReceive,
  onUnreadNotificationsFetchedReceive,
  setNavigatorAvailabilityLocally,
} from 'global/reducers/notifications/actions';
import {
  onCollaboratorRemovedReceive,
  onStopEditingInterventionReceive,
  updateInterventionConversationsTranscript,
  withOnCollaboratorRemovedReceiveSaga,
  withOnStopEditingInterventionReceiveSaga,
} from 'global/reducers/intervention';
import { updateConversationTranscript } from 'global/reducers/liveChat';
import { refetchInterventions } from 'global/reducers/interventions';

import {
  NewNotificationData,
  NotificationChannelAction,
  NotificationChannelMessage,
  ReadNotificationData,
  SetNavigatorAvailabilityData,
  UnreadNotificationsFetchedData,
} from './types';
import {
  NOTIFICATION_CHANNEL_NAME,
  NotificationChannelActionName,
  NotificationChannelMessageTopic,
} from './constants';

export type NotificationChannel = ReturnType<typeof useNotificationChannel>;

export const useNotificationChannel = () => {
  const dispatch = useDispatch();

  useInjectSaga(withOnCollaboratorRemovedReceiveSaga);
  useInjectSaga(withOnStopEditingInterventionReceiveSaga);

  const isLoggedIn = useSelector(makeSelectIsUserLoggedIn());

  const onUnreadNotificationsFetched = (
    data: UnreadNotificationsFetchedData,
  ) => {
    const notifications = jsonApiToArray(data, 'notification');
    notifications.reverse();
    dispatch(onUnreadNotificationsFetchedReceive(notifications));
  };

  const onNewNotification = (socketMessageData: NewNotificationData) => {
    const notification: Notification = jsonApiToObject(
      socketMessageData,
      'notification',
    );
    dispatch(onNewNotificationReceive(notification));

    const { event, data } = notification;

    switch (event) {
      case NotificationEvent.INTERVENTION_CONVERSATIONS_TRANSCRIPT_READY: {
        dispatch(updateInterventionConversationsTranscript(data.transcript));
        break;
      }
      case NotificationEvent.CONVERSATION_TRANSCRIPT_READY: {
        const { conversationId, archived, transcript } = data;
        dispatch(
          updateConversationTranscript(conversationId, archived, transcript),
        );
        break;
      }
      case NotificationEvent.SUCCESSFULLY_RESTORED_INTERVENTION:
      case NotificationEvent.NEW_COLLABORATOR_ADDED: {
        dispatch(refetchInterventions());
        break;
      }
      case NotificationEvent.COLLABORATOR_REMOVED: {
        dispatch(refetchInterventions());
        dispatch(onCollaboratorRemovedReceive(data.interventionId));
        break;
      }
      case NotificationEvent.STOP_EDITING_INTERVENTION: {
        dispatch(refetchInterventions());
        dispatch(onStopEditingInterventionReceive(data.interventionId));
        break;
      }
      default:
        break;
    }
  };

  const messageListener: SocketMessageListener<NotificationChannelMessage> = ({
    data,
    topic,
  }) => {
    switch (topic) {
      case NotificationChannelMessageTopic.UNREAD_NOTIFICATIONS_FETCHED:
        onUnreadNotificationsFetched(data);
        break;
      case NotificationChannelMessageTopic.NEW_NOTIFICATION:
        onNewNotification(data);
        break;
      default:
        break;
    }
  };

  const channel = useSocket<
    NotificationChannelMessage,
    NotificationChannelAction
  >(NOTIFICATION_CHANNEL_NAME, messageListener, { suspend: !isLoggedIn });

  const readNotification = (data: ReadNotificationData) => {
    const { notificationId } = data;
    dispatch(markNotificationReadLocally(notificationId));
    channel?.perform({
      name: NotificationChannelActionName.ON_READ_NOTIFICATION,
      data,
    });
    toast.dismiss(notificationId);
  };

  const setNavigatorAvailability = (data: SetNavigatorAvailabilityData) => {
    const { online } = data;
    dispatch(setNavigatorAvailabilityLocally(online));
    channel?.perform({
      name: NotificationChannelActionName.ON_NAVIGATOR_AVAILABILITY_SET,
      data,
    });
  };

  return {
    readNotification,
    setNavigatorAvailability,
  };
};
