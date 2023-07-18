import React from 'react';

import CollaborateIcon from 'assets/svg/collaborate-icon.svg';

import { themeColors } from 'theme';

import Icon from 'components/Icon';

const ICON_SIZE = 14;

export const CollaboratingIndicator = () => (
  <Icon
    src={CollaborateIcon}
    width={ICON_SIZE}
    height={ICON_SIZE}
    wrapperProps={{ display: 'flex' }}
    fill={themeColors.secondary}
  />
);
