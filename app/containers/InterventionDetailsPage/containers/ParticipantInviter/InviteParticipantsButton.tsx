import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import Button from 'components/Button';

import { ParticipantInvitationType } from './types';
import messages from './messages';

export type Props = {
  invitationType: ParticipantInvitationType;
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const InviteParticipantsButton: FC<Props> = ({
  invitationType,
  onInvite,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Button
      width="auto"
      height="auto"
      px={24}
      py={12}
      onClick={() => onInvite(invitationType)}
    >
      {formatMessage(messages.inviteParticipantsButtonTitle, {
        invitationType,
      })}
    </Button>
  );
};
