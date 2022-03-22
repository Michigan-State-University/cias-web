import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

export const requestErrorMessageHandler = (error) => {
  if (!error) return formatMessage(globalMessages.errors.unknownRequestError);

  if (error.isAxiosError && error.response) {
    const {
      response: { status, data },
    } = error;

    if (status <= 400 || status >= 500)
      return formatMessage(globalMessages.errors.unknownRequestError);

    return data.message || data.error;
  }

  return error.toString();
};
