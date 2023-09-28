import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import groupBy from 'lodash/groupBy';

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
import { HealthClinicCollapse } from './HealthClinicCollapse';

export type Props = {
  interventionId: string;
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  normalizedSessions: NormalizedSessions;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  onInvite: (invitationType: ParticipantInvitationType) => void;
};

export const PredefinedParticipantsTab: FC<Props> = ({
  interventionId,
  isModularIntervention,
  isReportingIntervention,
  normalizedSessions,
  normalizedHealthClinicsInfos,
  onInvite,
}) => {
  const predefinedParticipants = [];

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
    </Column>
  );
};
