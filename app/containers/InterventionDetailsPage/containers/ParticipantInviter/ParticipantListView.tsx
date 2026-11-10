import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { SelectOption } from 'components/Select/types';
import Tabs from 'components/Tabs';

import CopyLinkForm from './CopyLinkForm';
import {
  NormalizedHealthClinicsInfos,
  NormalizedSessions,
  ParticipantInvitationType,
} from './types';
import messages from './messages';
import { EmailParticipantsTab } from './EmailParticipantsTab';
import { PredefinedParticipantsTab } from './PredefinedParticipantsTab';
import { TestLinkTab } from './TestLinkTab';
import { useCanMintTestLink } from './CopyTestLinkButton';

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
  onOpenSmsCampaigns: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

/**
 * `Tabs` reads `label`, `hidden` and `data-cy` off its children's props, which
 * a plain <div> does not type. Passing them as one spread keeps that in a
 * single place instead of a @ts-ignore above every tab.
 */
const tabProps = (label: string, dataCy: string, hidden?: boolean) =>
  ({
    label,
    'data-cy': dataCy,
    hidden,
  }) as Record<string, unknown>;

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
  onOpenSmsCampaigns,
  activeTab,
  setActiveTab,
}) => {
  const { formatMessage } = useIntl();

  const canMintTestLink = useCanMintTestLink();
  const showTestLinkTab = copyingInvitationLinkPossible && canMintTestLink;

  const emailParticipantsTabLabel = formatMessage(
    messages.emailParticipantsTab,
  );
  const testParticipantsTabLabel = formatMessage(messages.testParticipantsTab);

  useEffect(() => {
    if (!showTestLinkTab && activeTab === testParticipantsTabLabel) {
      setActiveTab(emailParticipantsTabLabel);
    }
  }, [
    showTestLinkTab,
    activeTab,
    testParticipantsTabLabel,
    emailParticipantsTabLabel,
  ]);

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
        <div
          {...tabProps(
            formatMessage(messages.emailParticipantsTab),
            'email-participants-tab',
          )}
        >
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
        <div
          {...tabProps(
            formatMessage(messages.predefinedParticipantsTab),
            'predefined-participants-tab',
          )}
        >
          <PredefinedParticipantsTab
            interventionId={interventionId}
            isReportingIntervention={isReportingIntervention}
            normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
            creatingPredefinedParticipantsPossible={
              creatingPredefinedParticipantsPossible
            }
            onInvite={onInvite}
            onManage={onManage}
            onOpenSmsCampaigns={onOpenSmsCampaigns}
          />
        </div>
        <div
          {...tabProps(
            testParticipantsTabLabel,
            'test-link-tab',
            !showTestLinkTab,
          )}
        >
          <TestLinkTab
            isModularIntervention={isModularIntervention}
            isReportingIntervention={isReportingIntervention}
            interventionId={interventionId}
            interventionLanguageCode={interventionLanguageCode}
            sessionOptions={sessionOptions}
            healthClinicOptions={healthClinicOptions}
          />
        </div>
      </Tabs>
      {copyingInvitationLinkPossible &&
        activeTab === emailParticipantsTabLabel && (
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
