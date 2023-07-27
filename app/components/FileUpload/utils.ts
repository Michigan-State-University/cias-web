import { IntlShape } from 'react-intl';
import { FileRejection } from 'react-dropzone';

import messages from './messages';
import { FileErrorCode } from './types';

export const formatFileErrorMessage = (
  formatMessage: IntlShape['formatMessage'],
  fileRejections: FileRejection[],
) => {
  const { code, message } = fileRejections[0]?.errors[0] ?? {};
  if (code && code in messages) {
    return formatMessage(messages[code as FileErrorCode]);
  }
  if (message) return message;
  return formatMessage(messages.error);
};
