import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import groupBy from 'lodash/groupBy';

import { InterventionInvitation } from 'models/Intervention';

import {
  fetchInterventionInvitationsRequest,
  InvitationListItemState,
  makeSelectInterventionInvitations,
  makeSelectInterventionLoader,
  makeSelectInvitationsStates,
  resendInterventionInvitationRequest,
} from 'global/reducers/intervention';

import Loader from 'components/Loader';
import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';

import { NoParticipantsInfo } from './NoParticipantsInfo';
import {
  NormalizedHealthClinicsInfos,
  NormalizedSessions,
  ParticipantInvitationType,
} from './types';
import { InviteParticipantsButton } from './InviteParticipantsButton';
import { EmailParticipantsTable } from './EmailParticipantsTable';
import messages from './messages';
import { HealthClinicInvitationsCollapse } from './HealthClinicInvitationsCollapse';

export type Props = {
  interventionId: string;
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  invitingPossible: boolean;
  normalizedSessions: NormalizedSessions;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const EmailParticipantsTab: FC<Props> = ({
  interventionId,
  isModularIntervention,
  isReportingIntervention,
  invitingPossible,
  normalizedSessions,
  normalizedHealthClinicsInfos,
  onInvite,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const invitations: Nullable<InterventionInvitation[]> = useSelector(
    makeSelectInterventionInvitations(),
  );
  const invitationsLoading = useSelector(
    makeSelectInterventionLoader('fetchInterventionInvitations'),
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

  if (!invitations?.length) {
    return (
      <NoParticipantsInfo
        invitationType={ParticipantInvitationType.EMAIL}
        onInvite={onInvite}
        invitingPossible={invitingPossible}
        invitingNotPossibleMessage={formatMessage(
          messages.invitingEmailsParticipantsNotPossibleMessage,
        )}
      />
    );
  }

  return (
    <Column maxHeight="100%">
      <Row mb={16}>
        <InviteParticipantsButton
          invitationType={ParticipantInvitationType.EMAIL}
          onInvite={onInvite}
          disabled={!invitingPossible}
        />
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
              <HealthClinicInvitationsCollapse
                key={healthClinicId}
                healthClinicId={healthClinicId}
                {...normalizedHealthClinicsInfos[healthClinicId]}
                invitations={groupedInvitations}
                invitationsStates={invitationsStates}
                isModularIntervention={isModularIntervention}
                normalizedSessions={normalizedSessions}
                invitingPossible={invitingPossible}
                onResendInvitation={handleResendInvitation}
              />
            ),
          )}
      </Box>
    </Column>
  );
};
