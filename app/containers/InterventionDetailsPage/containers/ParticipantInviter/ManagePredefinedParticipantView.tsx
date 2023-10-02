import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  PredefinedParticipantData,
  makeSelectInterventionLoader,
  makeSelectPredefinedParticipantById,
  updatePredefinedParticipantRequest,
} from 'global/reducers/intervention';

import { PredefinedParticipant } from 'models/PredefinedParticipant';

import Column from 'components/Column';
import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';
import Row from 'components/Row';

import { BackButton } from './BackButton';
import {
  ParticipantInvitationType,
  PredefinedParticipantFormMode,
} from './types';
import {
  PredefinedParticipantForm,
  Props as PredefinedParticipantFormProps,
} from './PredefinedParticipantForm';
import {
  getPredefinedParticipantUrl,
  preparePredefinedParticipantData,
} from './utils';
import messages from './messages';
import { CopyPredefinedParticipantUrlButton } from './CopyPredefinedParticipantUrlButton';

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

  const participant: Nullable<PredefinedParticipant> = useSelector(
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

  const url = useMemo(() => {
    if (!participant) return '';
    return getPredefinedParticipantUrl(participant.slug);
  }, []);

  const handleDeactivate = () => {};

  const handleActivate = () => {};

  return (
    <Column flex={1} overflow="auto" gap={24}>
      <BackButton
        invitationType={ParticipantInvitationType.PREDEFINED}
        onBack={onBack}
      />
      {participant && (
        <>
          <Column gap={8}>
            <Text fontWeight="bold" lineHeight={1.2}>
              {formatMessage(messages.predefinedParticipantLinkLabel)}
            </Text>
            <Row gap={8} align="center">
              <Text lineHeight={1.2}>{url}</Text>
              <CopyPredefinedParticipantUrlButton url={url} />
            </Row>
          </Column>
          <Column flex={1}>
            <PredefinedParticipantForm
              mode={PredefinedParticipantFormMode.UPDATE}
              participant={participant}
              isReportingIntervention={isReportingIntervention}
              healthClinicOptions={healthClinicOptions}
              onSubmit={handleSubmit}
              submitting={submitting}
              onDeactivate={handleDeactivate}
              onActivate={handleActivate}
            />
          </Column>
        </>
      )}
    </Column>
  );
};
