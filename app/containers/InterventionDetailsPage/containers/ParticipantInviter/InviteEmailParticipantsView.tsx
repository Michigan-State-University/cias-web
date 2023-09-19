import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import globalMessages from 'global/i18n/globalMessages';
import { sendInterventionInvitationsRequest } from 'global/reducers/intervention';

import Column from 'components/Column';
import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';

import { BackButton } from './BackButton';
import { ParticipantInvitationType } from './types';
import {
  InviteEmailParticipantsForm,
  Props as InviteEmailParticipantsFormProps,
} from './InviteEmailParticipantsForm';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  onBack: (invitationType: ParticipantInvitationType) => void;
};

export const InviteEmailParticipantsView: FC<Props> = ({
  onBack,
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  sessionOptions,
  healthClinicOptions,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

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
      ),
    );
  };

  return (
    <Column flex={1}>
      <BackButton
        invitationType={ParticipantInvitationType.EMAIL}
        onBack={onBack}
      />
      <Text my={24}>{formatMessage(globalMessages.requiredFields)}</Text>
      <Column flex={1}>
        <InviteEmailParticipantsForm
          isModularIntervention={isModularIntervention}
          isReportingIntervention={isReportingIntervention}
          sessionOptions={sessionOptions}
          healthClinicOptions={healthClinicOptions}
          onFormSubmit={handleSubmit}
          submitting={false}
        />
      </Column>
    </Column>
  );
};
