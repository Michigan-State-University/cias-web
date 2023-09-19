import { FC } from 'react';

import { Session } from 'models/Session';
import { HealthSystem } from 'models/Organization';

import Column from 'components/Column';

import { CopyLinkForm } from './CopyLinkForm';

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
}) => (
  <>
    <Column flex={1} />
    <CopyLinkForm
      isModularIntervention={isModularIntervention}
      isReportingIntervention={isReportingIntervention}
      interventionId={interventionId}
      sessions={sessions}
      healthSystems={healthSystems}
    />
  </>
);
