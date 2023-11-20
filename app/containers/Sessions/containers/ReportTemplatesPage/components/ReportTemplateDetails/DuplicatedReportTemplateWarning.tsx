import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { colors } from 'theme';

import { Alert } from 'components/Alert';

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
      background={colors.chardonnay}
      onDismiss={onDismiss}
      mb={24}
    />
  );
};
