import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import globalMessages from 'global/i18n/globalMessages';
import {
  PredefinedParticipantData,
  makeSelectInterventionLoader,
  makeSelectPredefinedParticipantById,
  updatePredefinedParticipantRequest,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';

import { BackButton } from './BackButton';
import {
  ParticipantInvitationType,
  PredefinedParticipantFormMode,
} from './types';
import {
  PredefinedParticipantForm,
  Props as PredefinedParticipantFormProps,
} from './PredefinedParticipantForm';
import { preparePredefinedParticipantData } from './utils';

export type Props = {
  participantId: string;
  isReportingIntervention: boolean;
  interventionId: string;
  healthClinicOptions: SelectOption<string>[];
  onBack: () => void;
};

export const ManagePredefinedParticipantView: FC<Props> = ({
  participantId,
  onBack,
  isReportingIntervention,
  interventionId,
  healthClinicOptions,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const participant = useSelector(
    makeSelectPredefinedParticipantById(participantId),
  );

  const submitting = useSelector(
    makeSelectInterventionLoader('updatePredefinedParticipant'),
  );

  const handleSubmit: PredefinedParticipantFormProps['onSubmit'] = (values) => {
    const predefinedParticipantData: PredefinedParticipantData =
      preparePredefinedParticipantData(values);

    dispatch(
      updatePredefinedParticipantRequest(
        interventionId,
        participantId,
        predefinedParticipantData,
      ),
    );
  };

  return (
    <Column flex={1} overflow="auto">
      <BackButton
        invitationType={ParticipantInvitationType.PREDEFINED}
        onBack={onBack}
      />
      <Text my={24}>{formatMessage(globalMessages.requiredFields)}</Text>
      <Column flex={1}>
        <PredefinedParticipantForm
          mode={PredefinedParticipantFormMode.UPDATE}
          participant={participant}
          isReportingIntervention={isReportingIntervention}
          healthClinicOptions={healthClinicOptions}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Column>
    </Column>
  );
};
