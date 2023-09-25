import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import {
  makeSelectInterventionLoader,
  sendInterventionInvitationsRequest,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';
import { Alert } from 'components/Alert';

import { BackButton } from './BackButton';
import { ParticipantInvitationType } from './types';
import {
  InviteEmailParticipantsForm,
  Props as InviteEmailParticipantsFormProps,
} from './InviteEmailParticipantsForm';
import messages from './messages';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  onBack: (invitationType: ParticipantInvitationType) => void;
};

export const UploadEmailsView: FC<Props> = ({
  onBack,
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  sessionOptions,
  healthClinicOptions,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const submitting = useSelector(
    makeSelectInterventionLoader('sendInterventionInvitations'),
  );

  const handleSubmit: InviteEmailParticipantsFormProps['onFormSubmit'] = (
    sessionId,
    healthClinicId,
    emails,
  ) => {
    dispatch(
      sendInterventionInvitationsRequest(
        interventionId,
        isModularIntervention,
        sessionId,
        healthClinicId,
        emails,
        () => onBack(ParticipantInvitationType.EMAIL),
      ),
    );
  };

  return (
    <Column flex={1}>
      <BackButton
        invitationType={ParticipantInvitationType.EMAIL}
        onBack={onBack}
      />
      <Alert
        content={formatMessage(messages.uploadEmailsInfo)}
        background={themeColors.highlight}
        contentProps={{ maxWidth: 510 }}
        mt={24}
      />
      <Text my={24}>{formatMessage(globalMessages.requiredFields)}</Text>
      <Column flex={1}>
        <InviteEmailParticipantsForm
          isModularIntervention={isModularIntervention}
          isReportingIntervention={isReportingIntervention}
          sessionOptions={sessionOptions}
          healthClinicOptions={healthClinicOptions}
          onFormSubmit={handleSubmit}
          submitting={submitting}
        />
      </Column>
    </Column>
  );
};
