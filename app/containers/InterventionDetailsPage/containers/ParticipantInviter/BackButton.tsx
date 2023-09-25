import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import TriangleBackIcon from 'assets/svg/triangle-back.svg';

import { themeColors } from 'theme';

import { TextButton } from 'components/Button';
import Icon from 'components/Icon';

import { ParticipantInvitationType } from './types';
import messages from './messages';

export type Props = {
  invitationType: ParticipantInvitationType;
  onBack: (invitationType: ParticipantInvitationType) => void;
};

export const BackButton: FC<Props> = ({ invitationType, onBack }) => {
  const { formatMessage } = useIntl();

  return (
    <TextButton
      onClick={() => onBack(invitationType)}
      buttonProps={{
        color: themeColors.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        gap: 8,
      }}
    >
      <Icon src={TriangleBackIcon} />
      {formatMessage(messages.backButtonTitle, { invitationType })}
    </TextButton>
  );
};
