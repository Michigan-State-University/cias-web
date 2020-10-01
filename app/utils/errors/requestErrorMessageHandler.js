import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

export const requestErrorMessageHandler = error => {
  const { status, data } = error.response;

  if (status <= 400 || status >= 500)
    return formatMessage(globalMessages.errors.unknownRequestError);
  return data.message;
};
