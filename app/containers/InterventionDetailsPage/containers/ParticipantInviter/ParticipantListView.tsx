import { FC } from 'react';
import { useIntl } from 'react-intl';

import { InterventionStatus } from 'models/Intervention';
import { canInviteEmailParticipants } from 'models/Status/statusPermissions';

import { SelectOption } from 'components/Select/types';
import Tabs from 'components/Tabs';

import { CopyLinkForm } from './CopyLinkForm';
import {
  NormalizedHealthClinicsInfos,
  NormalizedSessions,
  ParticipantInvitationType,
} from './types';
import messages from './messages';
import { EmailParticipantsTab } from './EmailParticipantsTab';
import { PredefinedParticipantsTab } from './PredefinedParticipantsTab';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  interventionName: string;
  interventionStatus: InterventionStatus;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  normalizedSessions: NormalizedSessions;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  onInvite: (invitationType: ParticipantInvitationType) => void;
  onUploadEmails: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const ParticipantListView: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  interventionName,
  interventionStatus,
  sessionOptions,
  healthClinicOptions,
  normalizedSessions,
  normalizedHealthClinicsInfos,
  onInvite,
  onUploadEmails,
  activeTab,
  setActiveTab,
}) => {
  const { formatMessage } = useIntl();

  const invitingPossible = canInviteEmailParticipants(interventionStatus);

  return (
    <>
      {/* @ts-ignore */}
      <Tabs
        controlled
        controlledTabActive={activeTab}
        controlledSetTabActive={setActiveTab}
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
        <div label={formatMessage(messages.emailParticipantsTab)}>
          <EmailParticipantsTab
            interventionId={interventionId}
            interventionName={interventionName}
            isModularIntervention={isModularIntervention}
            isReportingIntervention={isReportingIntervention}
            invitingPossible={invitingPossible}
            normalizedSessions={normalizedSessions}
            normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
            onInvite={onInvite}
            onUploadEmails={onUploadEmails}
          />
        </div>
        {/* @ts-ignore */}
        <div label={formatMessage(messages.predefinedParticipantsTab)}>
          <PredefinedParticipantsTab
            interventionId={interventionId}
            isReportingIntervention={isReportingIntervention}
            normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
            onInvite={onInvite}
          />
        </div>
      </Tabs>
      {invitingPossible && (
        <CopyLinkForm
          isModularIntervention={isModularIntervention}
          isReportingIntervention={isReportingIntervention}
          interventionId={interventionId}
          sessionOptions={sessionOptions}
          healthClinicOptions={healthClinicOptions}
        />
      )}
    </>
  );
};
