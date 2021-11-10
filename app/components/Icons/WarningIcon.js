import React from 'react';
import { useIntl } from 'react-intl';

import WarningSVG from 'assets/svg/warning.svg';

import Icon from 'components/Icon';

import messages from './messages';

export const WarningIcon = () => {
  const { formatMessage } = useIntl();

  return (
    <Icon
      src={WarningSVG}
      alt={formatMessage(messages.warningIconDescription)}
    />
  );
};
