import { CustomDayjsLocale } from 'utils/dayjs';

export type NotificationLayoutCommonProps = {
  timeFormatLocale: CustomDayjsLocale;
};

export type NotificationLayoutProps<T> = T & NotificationLayoutCommonProps;
