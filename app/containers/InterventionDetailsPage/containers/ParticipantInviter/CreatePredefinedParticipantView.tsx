import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  PredefinedParticipantData,
  createPredefinedParticipantRequest,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import { Alert, AlertType } from 'components/Alert';

import { InviteParticipantsModalBackButton } from './InviteParticipantsModalBackButton';
import {
  InviteParticipantModalView,
  InviteParticipantModalViewState,
  ParticipantInvitationType,
  PredefinedParticipantFormMode,
} from './types';
import {
  PredefinedParticipantForm,
  Props as PredefinedParticipantFormProps,
} from './PredefinedParticipantForm';
import { preparePredefinedParticipantData } from './utils';
import messages from './messages';

export type Props = {
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
    const predefinedParticipantData: PredefinedParticipantData =
      preparePredefinedParticipantData(values);

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
    <Column flex={1} overflow="auto" gap={24}>
      <InviteParticipantsModalBackButton
        invitationType={ParticipantInvitationType.PREDEFINED}
        onBack={onBack}
      />
      <Alert
        content={formatMessage(messages.predefinedParticipantsInfo)}
        type={AlertType.INFO}
        contentProps={{ maxWidth: 510 }}
      />
      <Column flex={1}>
        <PredefinedParticipantForm
          mode={PredefinedParticipantFormMode.CREATE}
          isReportingIntervention={isReportingIntervention}
          healthClinicOptions={healthClinicOptions}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Column>
    </Column>
  );
};
