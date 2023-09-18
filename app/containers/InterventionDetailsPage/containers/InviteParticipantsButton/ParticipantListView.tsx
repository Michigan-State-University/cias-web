import { FC } from 'react';

import { Session } from 'models/Session';

import Column from 'components/Column';

import { CopyLinkForm } from './CopyLinkForm';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessions: Session[];
  // TODO add types for organization
  healthSystems: any[];
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
