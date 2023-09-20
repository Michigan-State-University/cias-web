import { FC } from 'react';
import { useIntl } from 'react-intl';

import { InterventionStatus } from 'models/Intervention';

import { SelectOption } from 'components/Select/types';
import Tabs from 'components/Tabs';

import { CopyLinkForm } from './CopyLinkForm';
import { ParticipantInvitationType } from './types';
import messages from './messages';
import { EmailParticipantsTab } from './EmailParticipantsTab';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  interventionStatus: InterventionStatus;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const ParticipantListView: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  interventionStatus,
  sessionOptions,
  healthClinicOptions,
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
          <EmailParticipantsTab
            interventionId={interventionId}
            interventionStatus={interventionStatus}
            isModularIntervention={isModularIntervention}
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
        sessionOptions={sessionOptions}
        healthClinicOptions={healthClinicOptions}
      />
    </>
  );
};
