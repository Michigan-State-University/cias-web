import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import globalMessages from 'global/i18n/globalMessages';
import {
  CreatePredefinedParticipantData,
  createPredefinedParticipantRequest,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';

import { themeColors } from 'theme';

import Column from 'components/Column';
import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';
import { Alert } from 'components/Alert';

import { BackButton } from './BackButton';
import {
  InviteParticipantModalView,
  InviteParticipantModalViewState,
  ParticipantInvitationType,
} from './types';
import {
  PredefinedParticipantForm,
  Props as PredefinedParticipantFormProps,
} from './PredefinedParticipantForm';
import { prepareCreatePredefinedParticipantData } from './utils';
import messages from './messages';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  healthClinicOptions: SelectOption<string>[];
  onBack: (view?: InviteParticipantModalViewState) => void;
};

export const CreatePredefinedParticipantView: FC<Props> = ({
  onBack,
  isReportingIntervention,
  interventionId,
  healthClinicOptions,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const submitting = useSelector(
    makeSelectInterventionLoader('createPredefinedParticipant'),
  );

  const handleSubmit: PredefinedParticipantFormProps['onSubmit'] = (values) => {
    const predefinedParticipantData: CreatePredefinedParticipantData =
      prepareCreatePredefinedParticipantData(values);

    dispatch(
      createPredefinedParticipantRequest(
        interventionId,
        predefinedParticipantData,
        (participantId: string) =>
          onBack({
            view: InviteParticipantModalView.MANAGE_PREDEFINED_PARTICIPANT,
            participantId,
          }),
      ),
    );
  };

  return (
    <Column flex={1} overflow="auto">
      <BackButton
        invitationType={ParticipantInvitationType.PREDEFINED}
        onBack={onBack}
      />
      <Alert
        content={formatMessage(messages.predefinedParticipantsInfo)}
        background={themeColors.highlight}
        contentProps={{ maxWidth: 510 }}
        mt={24}
      />
      <Text my={24}>{formatMessage(globalMessages.requiredFields)}</Text>
      <Column flex={1}>
        <PredefinedParticipantForm
          isReportingIntervention={isReportingIntervention}
          healthClinicOptions={healthClinicOptions}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Column>
    </Column>
  );
};
