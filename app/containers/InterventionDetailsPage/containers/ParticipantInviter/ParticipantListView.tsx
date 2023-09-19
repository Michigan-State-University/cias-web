import { FC } from 'react';

import { Session } from 'models/Session';
import { HealthSystem } from 'models/Organization';

import Column from 'components/Column';

import { CopyLinkForm } from './CopyLinkForm';
import { NoParticipantsInfo } from './NoParticipantsInfo';
import { ParticipantInvitationType } from './types';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessions: Session[];
  healthSystems: HealthSystem[];
};

export const ParticipantListView: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  sessions,
  healthSystems,
}) => {
  const handleInvite = () => {};

  return (
    <>
      <Column flex={1}>
        <NoParticipantsInfo
          invitationType={ParticipantInvitationType.EMAIL}
          onInvite={handleInvite}
        />
      </Column>
      <CopyLinkForm
        isModularIntervention={isModularIntervention}
        isReportingIntervention={isReportingIntervention}
        interventionId={interventionId}
        sessions={sessions}
        healthSystems={healthSystems}
      />
    </>
  );
};
