import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import CollaborateIcon from 'assets/svg/collaborate-icon.svg';

import { themeColors } from 'theme';

import Icon from 'components/Icon';

import messages from './messages';

export type Props = {
  iconSize: number;
};

export const CollaboratingIndicator: FC<Props> = ({ iconSize }) => {
  const { formatMessage } = useIntl();

  return (
    <Icon
      src={CollaborateIcon}
      width={iconSize}
      height={iconSize}
      wrapperProps={{ display: 'flex' }}
      fill={themeColors.secondary}
      title={formatMessage(messages.title)}
    />
  );
};
