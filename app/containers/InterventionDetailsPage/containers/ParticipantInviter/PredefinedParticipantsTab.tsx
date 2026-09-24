import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import groupBy from 'lodash/groupBy';
import { useIntl } from 'react-intl';

import { PredefinedParticipant } from 'models/PredefinedParticipant';
import { SessionTypes } from 'models/Session';

import {
  fetchPredefinedParticipantsRequest,
  makeSelectIntervention,
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
import { UploadPredefinedParticipantsButton } from './UploadPredefinedParticipantsButton';

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
  const intervention = useSelector(makeSelectIntervention());
  const hasRaSession = useMemo(
    () =>
      intervention?.sessions?.some(
        (s: { type: string }) => s.type === SessionTypes.RA_SESSION,
      ) ?? false,
    [intervention?.sessions],
  );

  useEffect(() => {
    if (!predefinedParticipants) {
      dispatch(fetchPredefinedParticipantsRequest(interventionId));
    }
  }, [interventionId, predefinedParticipants]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(fetchPredefinedParticipantsRequest(interventionId));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [interventionId]);

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
        onUploadPredefinedParticipants={() =>
          onInvite(ParticipantInvitationType.PREDEFINED_CSV_UPLOAD)
        }
      />
    );
  }

  return (
    <Column maxHeight="100%">
      <Row mb={16} align="center" gap={16}>
        <InviteParticipantsButton
          invitationType={ParticipantInvitationType.PREDEFINED}
          onInvite={onInvite}
          disabled={!creatingPredefinedParticipantsPossible}
        />
        <UploadPredefinedParticipantsButton
          onClick={() =>
            onInvite(ParticipantInvitationType.PREDEFINED_CSV_UPLOAD)
          }
          disabled={!creatingPredefinedParticipantsPossible}
        />
      </Row>
      <Box overflow="auto" maxHeight="100%">
        {predefinedParticipants?.length && !isReportingIntervention && (
          <PredefinedParticipantsTable
            predefinedParticipants={predefinedParticipants}
            onManage={onManage}
            hasRaSession={hasRaSession}
          />
        )}
        {predefinedParticipants?.length &&
          isReportingIntervention &&
          participantsGroupedByHealthClinic.map(
            ([healthClinicId, groupedParticipants]) => (
              <HealthClinicCollapse
                key={healthClinicId}
                healthClinicInfo={normalizedHealthClinicsInfos[healthClinicId]}
              >
                <PredefinedParticipantsTable
                  predefinedParticipants={groupedParticipants}
                  onManage={onManage}
                  hasRaSession={hasRaSession}
                />
              </HealthClinicCollapse>
            ),
          )}
      </Box>
    </Column>
  );
};
