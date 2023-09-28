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
import { ParticipantInvitationType } from './types';
import {
  CreatePredefinedParticipantForm,
  Props as CreatePredefinedParticipantFormProps,
} from './CreatePredefinedParticipantForm';
import { prepareCreatePredefinedParticipantData } from './utils';
import messages from './messages';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  healthClinicOptions: SelectOption<string>[];
  onBack: (invitationType: ParticipantInvitationType) => void;
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

  const handleSubmit: CreatePredefinedParticipantFormProps['onSubmit'] = (
    values,
  ) => {
    const predefinedParticipantData: CreatePredefinedParticipantData =
      prepareCreatePredefinedParticipantData(values);

    dispatch(
      createPredefinedParticipantRequest(
        interventionId,
        predefinedParticipantData,
        // TODO https://htdevelopers.atlassian.net/browse/CIAS30-3642 open manage participant page after creation
        () => onBack(ParticipantInvitationType.PREDEFINED),
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
        <CreatePredefinedParticipantForm
          isReportingIntervention={isReportingIntervention}
          healthClinicOptions={healthClinicOptions}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Column>
    </Column>
  );
};
