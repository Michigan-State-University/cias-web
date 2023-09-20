import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { InterventionInvitation } from 'models/Intervention';
import { Session } from 'models/Session';

import {
  fetchInterventionInvitationsRequest,
  makeSelectInterventionInvitations,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';

import Loader from 'components/Loader';
import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';

import { NoParticipantsInfo } from './NoParticipantsInfo';
import { ParticipantInvitationType } from './types';
import { InviteParticipantsButton } from './InviteParticipantsButton';
import { EmailParticipantsTable } from './EmailParticipantsTable';
import messages from './messages';

export type Props = {
  interventionId: string;
  isModularIntervention: boolean;
  invitingPossible: boolean;
  normalizedSessions: Record<Session['id'], Session>;
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const EmailParticipantsTab: FC<Props> = ({
  interventionId,
  isModularIntervention,
  invitingPossible,
  normalizedSessions,
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

  useEffect(() => {
    if (!invitations) {
      dispatch(fetchInterventionInvitationsRequest(interventionId));
    }
  }, [interventionId, invitations]);

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
        <EmailParticipantsTable
          invitations={invitations}
          isModularIntervention={isModularIntervention}
          normalizedSessions={normalizedSessions}
          invitingPossible={invitingPossible}
        />
      </Box>
    </Column>
  );
};
