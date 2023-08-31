import React from 'react';
import { useIntl } from 'react-intl';

import EmptyIcon from 'assets/svg/empty.svg';

import Icon from 'components/Icon';

import messages from './messages';

export const DataClearedIcon = () => {
  const { formatMessage } = useIntl();

  return (
    <Icon
      src={EmptyIcon}
      wrapperProps={{ lineHeight: 1 }}
      title={formatMessage(messages.dataClearedIconTitle)}
    />
  );
};
