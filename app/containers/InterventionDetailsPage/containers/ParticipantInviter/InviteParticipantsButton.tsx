import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import Button from 'components/Button';

import { ParticipantInvitationType } from './types';
import messages from './messages';

export type Props = {
  invitationType: ParticipantInvitationType;
  onInvite: () => void;
};

export const InviteParticipantsButton: FC<Props> = ({ invitationType }) => {
  const { formatMessage } = useIntl();

  return (
    <Button width="auto" px={24} py={12}>
      {formatMessage(messages.inviteParticipantsButtonTitle, {
        invitationType,
      })}
    </Button>
  );
};
