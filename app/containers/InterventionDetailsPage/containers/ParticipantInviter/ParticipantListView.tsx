import { FC } from 'react';
import { useIntl } from 'react-intl';

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
  interventionLanguageCode: string;
  invitingPossible: boolean;
  copyingInvitationLinkPossible: boolean;
  creatingPredefinedParticipantsPossible: boolean;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  normalizedSessions: NormalizedSessions;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  onInvite: (invitationType: ParticipantInvitationType) => void;
  onUploadEmails: () => void;
  onManage: (participantId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const ParticipantListView: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  interventionName,
  interventionLanguageCode,
  invitingPossible,
  copyingInvitationLinkPossible,
  creatingPredefinedParticipantsPossible,
  sessionOptions,
  healthClinicOptions,
  normalizedSessions,
  normalizedHealthClinicsInfos,
  onInvite,
  onUploadEmails,
  onManage,
  activeTab,
  setActiveTab,
}) => {
  const { formatMessage } = useIntl();

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
            creatingPredefinedParticipantsPossible={
              creatingPredefinedParticipantsPossible
            }
            onInvite={onInvite}
            onManage={onManage}
          />
        </div>
      </Tabs>
      {copyingInvitationLinkPossible &&
        activeTab === formatMessage(messages.emailParticipantsTab) && (
          <CopyLinkForm
            isModularIntervention={isModularIntervention}
            isReportingIntervention={isReportingIntervention}
            interventionId={interventionId}
            interventionLanguageCode={interventionLanguageCode}
            sessionOptions={sessionOptions}
            healthClinicOptions={healthClinicOptions}
          />
        )}
    </>
  );
};
