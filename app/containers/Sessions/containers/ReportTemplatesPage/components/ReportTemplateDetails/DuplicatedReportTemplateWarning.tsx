import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { Alert, AlertType } from 'components/Alert';

import messages from '../../messages';

export type Props = {
  onDismiss: () => void;
};

export const DuplicatedReportTemplateWarning: FC<Props> = ({ onDismiss }) => {
  const { formatMessage } = useIntl();

  return (
    <Alert
      content={formatMessage(messages.duplicatedReportTemplateWarning)}
      contentProps={{ maxWidth: 290 }}
      type={AlertType.WARNING}
      onDismiss={onDismiss}
      mb={24}
    />
  );
};
