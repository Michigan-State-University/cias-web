import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OrganizableInvitation } from 'models/Organization';

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

export type Props = {
  interventionId: string;
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const EmailParticipantsTab: FC<Props> = ({
  interventionId,
  onInvite,
}) => {
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

  if (invitationsLoading) return <Loader type="inline" />;

  if (!invitations?.length) {
    return (
      <NoParticipantsInfo
        invitationType={ParticipantInvitationType.EMAIL}
        onInvite={onInvite}
      />
    );
  }

  return (
    <Column>
      <Row mb={16}>
        <InviteParticipantsButton
          invitationType={ParticipantInvitationType.EMAIL}
          onInvite={onInvite}
        />
      </Row>
      {JSON.stringify(invitations, null, 2)}
    </Column>
  );
};
