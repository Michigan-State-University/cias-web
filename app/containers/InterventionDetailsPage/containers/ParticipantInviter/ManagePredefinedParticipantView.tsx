import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  PredefinedParticipantData,
  makeSelectInterventionLoader,
  makeSelectPredefinedParticipantById,
  updatePredefinedParticipantRequest,
  deactivatePredefinedParticipantRequest,
  activatePredefinedParticipantRequest,
  sendPredefinedParticipantSmsInvitationRequest,
  sendPredefinedParticipantEmailInvitationRequest,
} from 'global/reducers/intervention';

import { PredefinedParticipant } from 'models/PredefinedParticipant';

import Column from 'components/Column';
import Text from 'components/Text';
import { SelectOption } from 'components/Select/types';
import Row from 'components/Row';
import { Button } from 'components/Button';

import { InviteParticipantsModalBackButton } from './InviteParticipantsModalBackButton';
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
import { SentInvitationsInfo } from './SentInvitationsInfo';

export type Props = {
  participantId: string;
  isReportingIntervention: boolean;
  interventionId: string;
  healthClinicOptions: SelectOption<string>[];
  onBack: () => void;
  invitingPossible: boolean;
};

export const ManagePredefinedParticipantView: FC<Props> = ({
  participantId,
  onBack,
  isReportingIntervention,
  interventionId,
  healthClinicOptions,
  invitingPossible,
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

  const deactivating = useSelector(
    makeSelectInterventionLoader('deactivatePredefinedParticipant'),
  );
  const handleDeactivate = () => {
    dispatch(
      deactivatePredefinedParticipantRequest(interventionId, participantId),
    );
  };

  const activating = useSelector(
    makeSelectInterventionLoader('activatePredefinedParticipant'),
  );
  const handleActivate = () => {
    dispatch(
      activatePredefinedParticipantRequest(interventionId, participantId),
    );
  };

  const sendingSmsInvitation = useSelector(
    makeSelectInterventionLoader('sendPredefinedParticipantSmsInvitation'),
  );
  const handleSendSmsInvitation = () => {
    dispatch(
      sendPredefinedParticipantSmsInvitationRequest(
        interventionId,
        participantId,
      ),
    );
  };

  const sendingEmailInvitation = useSelector(
    makeSelectInterventionLoader('sendPredefinedParticipantEmailInvitation'),
  );
  const handleSendEmailInvitation = () => {
    dispatch(
      sendPredefinedParticipantEmailInvitationRequest(
        interventionId,
        participantId,
      ),
    );
  };

  const url = useMemo(() => {
    if (!participant) return '';
    return getPredefinedParticipantUrl(participant.slug);
  }, []);

  return (
    <Column flex={1} overflow="auto" gap={24}>
      <InviteParticipantsModalBackButton
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
          <Column>
            <SentInvitationsInfo participant={participant} />
            <Row mt={16} gap={16}>
              <Button
                width="auto"
                px={24}
                inverted
                onClick={handleSendSmsInvitation}
                loading={sendingSmsInvitation}
                disabled={
                  !invitingPossible || !participant.phone || !participant.active
                }
              >
                {formatMessage(
                  messages[
                    participant.smsInvitationSentAt
                      ? 'predefinedParticipantResendSmsInvitationButtonTitle'
                      : 'predefinedParticipantSendSmsInvitationButtonTitle'
                  ],
                )}
              </Button>
              <Button
                width="auto"
                px={24}
                inverted
                onClick={handleSendEmailInvitation}
                loading={sendingEmailInvitation}
                disabled={
                  !invitingPossible ||
                  !participant.email ||
                  participant.emailAutogenerated ||
                  !participant.active
                }
              >
                {formatMessage(
                  messages[
                    participant.emailInvitationSentAt
                      ? 'predefinedParticipantResendEmailInvitationButtonTitle'
                      : 'predefinedParticipantSendEmailInvitationButtonTitle'
                  ],
                )}
              </Button>
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
              deactivating={deactivating}
              onDeactivate={handleDeactivate}
              activating={activating}
              onActivate={handleActivate}
            />
          </Column>
        </>
      )}
    </Column>
  );
};
