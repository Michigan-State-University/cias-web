import { FC } from 'react';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import { BackButton } from './BackButton';
import { ParticipantInvitationType } from './types';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  onBack: (invitationType: ParticipantInvitationType) => void;
};

export const InviteEmailParticipantsView: FC<Props> = ({ onBack }) => (
  <Column>
    <BackButton
      invitationType={ParticipantInvitationType.EMAIL}
      onBack={onBack}
    />
  </Column>
);
