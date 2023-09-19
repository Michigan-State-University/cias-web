import { FC } from 'react';
import { useIntl } from 'react-intl';

import { Session } from 'models/Session';
import { HealthSystem } from 'models/Organization';

import Tabs from 'components/Tabs';

import { CopyLinkForm } from './CopyLinkForm';
import { NoParticipantsInfo } from './NoParticipantsInfo';
import { ParticipantInvitationType } from './types';
import messages from './messages';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessions: Session[];
  healthSystems: HealthSystem[];
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const ParticipantListView: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  sessions,
  healthSystems,
  onInvite,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      {/* @ts-ignore */}
      <Tabs
        flex={1}
        display="flex"
        direction="column"
        containerProps={{
          flex: 1,
          display: 'flex',
          direction: 'column',
          mt: 24,
          mx: 0,
          mb: 0,
          minHeight: '0px',
          overflowY: 'auto',
        }}
        minHeight="0px"
      >
        {/* @ts-ignore */}
        <div label={formatMessage(messages.emailParticipants)}>
          <NoParticipantsInfo
            invitationType={ParticipantInvitationType.EMAIL}
            onInvite={onInvite}
          />
        </div>
        {/* @ts-ignore */}
        <div label={formatMessage(messages.predefinedParticipants)}></div>
      </Tabs>
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
