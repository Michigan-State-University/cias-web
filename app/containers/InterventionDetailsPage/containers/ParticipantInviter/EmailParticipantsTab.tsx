import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import groupBy from 'lodash/groupBy';

import { InterventionInvitation } from 'models/Intervention';

import {
  fetchInterventionInvitationsRequest,
  InvitationListItemState,
  makeSelectInterventionError,
  makeSelectInterventionInvitations,
  makeSelectInterventionLoader,
  makeSelectInvitationsStates,
  resendInterventionInvitationRequest,
} from 'global/reducers/intervention';

import Loader from 'components/Loader';
import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import ErrorAlert from 'components/ErrorAlert';

import { NoParticipantsInfo } from './NoParticipantsInfo';
import {
  NormalizedHealthClinicsInfos,
  NormalizedSessions,
  ParticipantInvitationType,
} from './types';
import { InviteParticipantsButton } from './InviteParticipantsButton';
import { EmailParticipantsTable } from './EmailParticipantsTable';
import messages from './messages';
import { HealthClinicCollapse } from './HealthClinicCollapse';
import { ExportEmailsButton } from './ExportEmailsButton';
import { UploadEmailsButton } from './UploadEmailsButton';

export type Props = {
  interventionId: string;
  interventionName: string;
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  invitingPossible: boolean;
  normalizedSessions: NormalizedSessions;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  onInvite: (invitationType: ParticipantInvitationType) => void;
  onUploadEmails: () => void;
};

export const EmailParticipantsTab: FC<Props> = ({
  interventionId,
  interventionName,
  isModularIntervention,
  isReportingIntervention,
  invitingPossible,
  normalizedSessions,
  normalizedHealthClinicsInfos,
  onInvite,
  onUploadEmails,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const invitations: Nullable<InterventionInvitation[]> = useSelector(
    makeSelectInterventionInvitations(),
  );
  const invitationsLoading = useSelector(
    makeSelectInterventionLoader('fetchInterventionInvitations'),
  );
  const invitationsError = useSelector(
    makeSelectInterventionError('fetchInterventionInvitations'),
  );
  const invitationsStates: Record<
    InterventionInvitation['id'],
    InvitationListItemState
  > = useSelector(makeSelectInvitationsStates());

  useEffect(() => {
    if (!invitations) {
      dispatch(fetchInterventionInvitationsRequest(interventionId));
    }
  }, [interventionId, invitations]);

  const handleResendInvitation = (invitationId: string) => {
    dispatch(resendInterventionInvitationRequest(invitationId, interventionId));
  };

  const invitationsGroupedByHealthClinic = useMemo(() => {
    if (!isReportingIntervention) return [];
    return Object.entries(groupBy(invitations, 'healthClinicId'));
  }, [isReportingIntervention, invitations]);

  if (invitationsLoading) return <Loader type="inline" />;

  if (invitationsError) {
    return <ErrorAlert errorText={invitationsError} />;
  }

  if (!invitations?.length) {
    return (
      <NoParticipantsInfo
        invitationType={ParticipantInvitationType.EMAIL}
        onInvite={onInvite}
        invitingPossible={invitingPossible}
        invitingNotPossibleMessage={formatMessage(
          messages.invitingEmailsParticipantsNotPossibleMessage,
        )}
        onUploadEmails={onUploadEmails}
      />
    );
  }

  return (
    <Column maxHeight="100%">
      <Row mb={16} align="center" gap={12}>
        <InviteParticipantsButton
          invitationType={ParticipantInvitationType.EMAIL}
          onInvite={onInvite}
          disabled={!invitingPossible}
        />
        <Row>
          <ExportEmailsButton
            invitations={invitations}
            isModularIntervention={isModularIntervention}
            normalizedSessions={normalizedSessions}
            normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
            interventionName={interventionName}
          />
          <UploadEmailsButton onClick={onUploadEmails} />
        </Row>
      </Row>
      <Box overflow="auto" maxHeight="100%">
        {!isReportingIntervention && (
          <EmailParticipantsTable
            invitations={invitations}
            invitationsStates={invitationsStates}
            isModularIntervention={isModularIntervention}
            normalizedSessions={normalizedSessions}
            invitingPossible={invitingPossible}
            onResendInvitation={handleResendInvitation}
          />
        )}
        {isReportingIntervention &&
          invitationsGroupedByHealthClinic.map(
            ([healthClinicId, groupedInvitations]) => (
              <HealthClinicCollapse
                key={healthClinicId}
                healthClinicInfo={normalizedHealthClinicsInfos[healthClinicId]}
              >
                <EmailParticipantsTable
                  healthClinicId={healthClinicId}
                  invitations={groupedInvitations}
                  invitationsStates={invitationsStates}
                  isModularIntervention={isModularIntervention}
                  normalizedSessions={normalizedSessions}
                  invitingPossible={invitingPossible}
                  onResendInvitation={handleResendInvitation}
                />
              </HealthClinicCollapse>
            ),
          )}
      </Box>
    </Column>
  );
};
