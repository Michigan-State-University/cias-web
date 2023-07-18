import { MessageDescriptor } from '@formatjs/intl/src/types';

import { formatMessage } from './intlOutsideReact';

export const formatApiErrorMessage = (
  error: any,
  defaultMessage: MessageDescriptor,
) => error?.response?.data?.message ?? formatMessage(defaultMessage);
