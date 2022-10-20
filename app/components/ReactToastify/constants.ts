import { ToastOptions } from 'react-toastify/dist/types';

export const CustomNotificationToastClassnames: Pick<
  ToastOptions,
  'className' | 'progressClassName' | 'bodyClassName'
> = {
  progressClassName: 'notification-progress-bar',
};
