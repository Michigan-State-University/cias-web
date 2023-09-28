import { FC } from 'react';

import Column from 'components/Column';
import Row from 'components/Row';

import { NoParticipantsInfo } from './NoParticipantsInfo';
import { ParticipantInvitationType } from './types';
import { InviteParticipantsButton } from './InviteParticipantsButton';

export type Props = {
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const PredefinedParticipantsTab: FC<Props> = ({ onInvite }) => {
  const predefinedParticipants = [];

  if (!predefinedParticipants?.length) {
    return (
      <NoParticipantsInfo
        invitationType={ParticipantInvitationType.PREDEFINED}
        onInvite={onInvite}
        invitingPossible
      />
    );
  }

  return (
    <Column maxHeight="100%">
      <Row mb={16} align="center">
        <InviteParticipantsButton
          invitationType={ParticipantInvitationType.PREDEFINED}
          onInvite={onInvite}
        />
      </Row>
    </Column>
  );
};
