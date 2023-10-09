import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import groupBy from 'lodash/groupBy';
import { useIntl } from 'react-intl';

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
import {
  NormalizedHealthClinicsInfos,
  ParticipantInvitationType,
} from './types';
import { InviteParticipantsButton } from './InviteParticipantsButton';
import { PredefinedParticipantsTable } from './PredefinedParticipantsTable';
import { HealthClinicCollapse } from './HealthClinicCollapse';
import messages from './messages';

export type Props = {
  interventionId: string;
  isReportingIntervention: boolean;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  creatingPredefinedParticipantsPossible: boolean;
  onInvite: (invitationType: ParticipantInvitationType) => void;
  onManage: (participantId: string) => void;
};

export const PredefinedParticipantsTab: FC<Props> = ({
  interventionId,
  isReportingIntervention,
  normalizedHealthClinicsInfos,
  creatingPredefinedParticipantsPossible,
  onInvite,
  onManage,
}) => {
  const { formatMessage } = useIntl();
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

  const participantsGroupedByHealthClinic = useMemo(() => {
    if (!isReportingIntervention) return [];
    return Object.entries(groupBy(predefinedParticipants, 'healthClinicId'));
  }, [isReportingIntervention, predefinedParticipants]);

  if (predefinedParticipantsLoading) return <Loader type="inline" />;

  if (predefinedParticipantsError) {
    return <ErrorAlert errorText={predefinedParticipantsError} />;
  }

  if (!predefinedParticipants?.length) {
    return (
      <NoParticipantsInfo
        invitationType={ParticipantInvitationType.PREDEFINED}
        onInvite={onInvite}
        invitingPossible={creatingPredefinedParticipantsPossible}
        invitingNotPossibleMessage={formatMessage(
          messages.creatingPredefinedParticipantsNotPossibleMessage,
        )}
      />
    );
  }

  return (
    <Column maxHeight="100%">
      <Row mb={16} align="center">
        <InviteParticipantsButton
          invitationType={ParticipantInvitationType.PREDEFINED}
          onInvite={onInvite}
          disabled={!creatingPredefinedParticipantsPossible}
        />
      </Row>
      <Box overflow="auto" maxHeight="100%">
        {!isReportingIntervention && (
          <PredefinedParticipantsTable
            predefinedParticipants={predefinedParticipants}
            onManage={onManage}
          />
        )}
        {isReportingIntervention &&
          participantsGroupedByHealthClinic.map(
            ([healthClinicId, groupedParticipants]) => (
              <HealthClinicCollapse
                key={healthClinicId}
                healthClinicInfo={normalizedHealthClinicsInfos[healthClinicId]}
              >
                <PredefinedParticipantsTable
                  predefinedParticipants={groupedParticipants}
                  onManage={onManage}
                />
              </HealthClinicCollapse>
            ),
          )}
      </Box>
    </Column>
  );
};
