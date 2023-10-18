import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import Button from 'components/Button';

import { ParticipantInvitationType } from './types';
import messages from './messages';

export type Props = {
  invitationType: ParticipantInvitationType;
  onInvite: (invitationType: ParticipantInvitationType) => void;
  disabled?: boolean;
};

export const InviteParticipantsButton: FC<Props> = ({
  invitationType,
  onInvite,
  disabled,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Button
      width="auto"
      px={24}
      onClick={() => onInvite(invitationType)}
      disabled={disabled}
    >
      {formatMessage(messages.inviteParticipantsButtonTitle, {
        invitationType,
      })}
    </Button>
  );
};
