import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { OrganizableInvitation } from 'models/Organization';
import { InterventionStatus } from 'models/Intervention';
import { canInviteEmailParticipants } from 'models/Status/statusPermissions';

import {
  fetchInterventionInvitationsRequest,
  makeSelectInterventionInvitations,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';

import Loader from 'components/Loader';
import Column from 'components/Column';
import Row from 'components/Row';

import { NoParticipantsInfo } from './NoParticipantsInfo';
import { ParticipantInvitationType } from './types';
import { InviteParticipantsButton } from './InviteParticipantsButton';
import messages from './messages';

export type Props = {
  interventionId: string;
  interventionStatus: InterventionStatus;
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const EmailParticipantsTab: FC<Props> = ({
  interventionId,
  interventionStatus,
  onInvite,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const invitations: Nullable<OrganizableInvitation[]> = useSelector(
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

  const invitingPossible = canInviteEmailParticipants(interventionStatus);

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
    <Column>
      <Row mb={16}>
        <InviteParticipantsButton
          invitationType={ParticipantInvitationType.EMAIL}
          onInvite={onInvite}
          disabled={!invitingPossible}
        />
      </Row>
      {JSON.stringify(invitations, null, 2)}
    </Column>
  );
};
