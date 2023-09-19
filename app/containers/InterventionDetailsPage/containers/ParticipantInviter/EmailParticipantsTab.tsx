import { FC } from 'react';

import { NoParticipantsInfo } from './NoParticipantsInfo';
import { ParticipantInvitationType } from './types';

export type Props = {
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const EmailParticipantsTab: FC<Props> = ({ onInvite }) => (
  // TODO fetch invitations
  <NoParticipantsInfo
    invitationType={ParticipantInvitationType.EMAIL}
    onInvite={onInvite}
  />
);
