import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PredefinedParticipant } from 'models/PredefinedParticipant';

import {
  fetchPredefinedParticipantsRequest,
  makeSelectInterventionError,
  makeSelectInterventionLoader,
  makeSelectPredefinedParticipants,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import Row from 'components/Row';
import Loader from 'components/Loader';
import Box from 'components/Box';

import ErrorAlert from 'components/ErrorAlert';
import { NoParticipantsInfo } from './NoParticipantsInfo';
import { ParticipantInvitationType } from './types';
import { InviteParticipantsButton } from './InviteParticipantsButton';

export type Props = {
  interventionId: string;
  isReportingIntervention: boolean;
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const PredefinedParticipantsTab: FC<Props> = ({
  interventionId,
  isReportingIntervention,
  onInvite,
}) => {
  const dispatch = useDispatch();

  const predefinedParticipants: Nullable<PredefinedParticipant[]> = useSelector(
    makeSelectPredefinedParticipants(),
  );
  const predefinedParticipantsLoading = useSelector(
    makeSelectInterventionLoader('fetchPredefinedParticipants'),
  );
  const predefinedParticipantsError = useSelector(
    makeSelectInterventionError('fetchPredefinedParticipants'),
  );

  useEffect(() => {
    if (!predefinedParticipants) {
      dispatch(fetchPredefinedParticipantsRequest(interventionId));
    }
  }, [interventionId, predefinedParticipants]);

  if (predefinedParticipantsLoading) return <Loader type="inline" />;

  if (predefinedParticipantsError) {
    return <ErrorAlert errorText={predefinedParticipantsError} />;
  }

  if (!predefinedParticipants?.length) {
    return (
      <NoParticipantsInfo
        invitationType={ParticipantInvitationType.PREDEFINED}
        onInvite={onInvite}
        invitingPossible
      />
    );
  }

  return (
    <Column maxHeight="100%">
      <Row mb={16} align="center">
        <InviteParticipantsButton
          invitationType={ParticipantInvitationType.PREDEFINED}
          onInvite={onInvite}
        />
      </Row>
      <Box overflow="auto" maxHeight="100%">
        {!isReportingIntervention &&
          JSON.stringify(predefinedParticipants, null, 2)}
      </Box>
    </Column>
  );
};
