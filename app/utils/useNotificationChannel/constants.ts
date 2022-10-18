export const NOTIFICATION_CHANNEL_NAME = 'NotificationChannel';

// Replace placeholder with real topic when first introduced
export enum NotificationChannelMessageTopic {
  UNREAD_NOTIFICATIONS_FETCHED = 'unread_notifications_fetched',
  NEW_NOTIFICATION = 'new_notification',
}

export enum NotificationChannelActionName {
  ON_READ_NOTIFICATION = 'on_read_notification',
  ON_NAVIGATOR_AVAILABILITY_SET = 'on_navigator_availability_set',
}
