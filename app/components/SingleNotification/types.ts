import { CustomDayjsLocale } from 'utils/dayjs';

export type NotificationLayoutCommonProps = {
  timeFormatLocale: CustomDayjsLocale;
  timeFormatWithSuffix?: boolean;
};

export type NotificationLayoutProps<T> = T & NotificationLayoutCommonProps;
