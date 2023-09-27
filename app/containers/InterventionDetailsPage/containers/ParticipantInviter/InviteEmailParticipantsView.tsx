import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import globalMessages from 'global/i18n/globalMessages';
import {
  makeSelectInterventionLoader,
  sendInterventionInvitationsRequest,
  SendInvitationsPayload,
} from 'global/reducers/intervention';

import Column from 'components/Column';
import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';

import { BackButton } from './BackButton';
import {
  NormalizedHealthClinicsInfos,
  ParticipantInvitationType,
} from './types';
import {
  InviteEmailParticipantsForm,
  Props as InviteEmailParticipantsFormProps,
} from './InviteEmailParticipantsForm';
import { prepareSendInvitationsPayload } from './utils';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  interventionId: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  onBack: (invitationType: ParticipantInvitationType) => void;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
};

export const InviteEmailParticipantsView: FC<Props> = ({
  onBack,
  isModularIntervention,
  isReportingIntervention,
  interventionId,
  sessionOptions,
  healthClinicOptions,
  normalizedHealthClinicsInfos,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const submitting = useSelector(
    makeSelectInterventionLoader('sendInterventionInvitations'),
  );

  const handleSubmit: InviteEmailParticipantsFormProps['onSubmit'] = (
    values,
  ) => {
    const invitations: SendInvitationsPayload = prepareSendInvitationsPayload(
      values,
      interventionId,
    );

    dispatch(
      sendInterventionInvitationsRequest(interventionId, invitations, () =>
        onBack(ParticipantInvitationType.EMAIL),
      ),
    );
  };

  return (
    <Column flex={1} overflow="auto">
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
          onSubmit={handleSubmit}
          submitting={submitting}
          normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
        />
      </Column>
    </Column>
  );
};
