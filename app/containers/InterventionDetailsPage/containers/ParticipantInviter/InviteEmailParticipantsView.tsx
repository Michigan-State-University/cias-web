import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  makeSelectInterventionLoader,
  sendInterventionInvitationsRequest,
  SendInterventionInvitationsData,
} from 'global/reducers/intervention';

import Column from 'components/Column';
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
  onBack: () => void;
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
  const dispatch = useDispatch();

  const submitting = useSelector(
    makeSelectInterventionLoader('sendInterventionInvitations'),
  );

  const handleSubmit: InviteEmailParticipantsFormProps['onSubmit'] = (
    values,
  ) => {
    const invitations: SendInterventionInvitationsData =
      prepareSendInvitationsPayload(values, interventionId);

    dispatch(
      sendInterventionInvitationsRequest(interventionId, invitations, () =>
        onBack(),
      ),
    );
  };

  return (
    <Column flex={1} overflow="auto" gap={24}>
      <BackButton
        invitationType={ParticipantInvitationType.EMAIL}
        onBack={onBack}
      />
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
