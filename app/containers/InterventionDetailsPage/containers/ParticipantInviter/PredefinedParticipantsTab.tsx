import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import groupBy from 'lodash/groupBy';

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

export type Props = {
  interventionId: string;
  isReportingIntervention: boolean;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const PredefinedParticipantsTab: FC<Props> = ({
  interventionId,
  isReportingIntervention,
  normalizedHealthClinicsInfos,
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
        {!isReportingIntervention && (
          <PredefinedParticipantsTable
            predefinedParticipants={predefinedParticipants}
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
                />
              </HealthClinicCollapse>
            ),
          )}
      </Box>
    </Column>
  );
};
