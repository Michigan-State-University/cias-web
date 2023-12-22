import { MessageDescriptor } from '@formatjs/intl/src/types';

import { formatMessage } from './intlOutsideReact';

export const formatApiErrorMessage = (
  error: any,
  defaultMessage: MessageDescriptor,
  defaultMessageValues?: Parameters<typeof formatMessage>[1],
) =>
  error?.response?.data?.message ??
  formatMessage(defaultMessage, defaultMessageValues);
