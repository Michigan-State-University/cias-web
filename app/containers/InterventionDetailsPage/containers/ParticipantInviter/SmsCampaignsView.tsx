import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { PredefinedParticipant } from 'models/PredefinedParticipant';
import { SmsCampaignComposableKind } from 'models/SmsCampaign';

import { makeSelectPredefinedParticipants } from 'global/reducers/intervention';

import { colors } from 'theme';

import Column from 'components/Column';
import Text from 'components/Text';

import { InviteParticipantsModalBackButton } from './InviteParticipantsModalBackButton';
import { SendSmsCampaignButtons } from './SendSmsCampaignButtons';
import { SmsCampaignsList } from './SmsCampaignsList';
import { ParticipantInvitationType } from './types';
import messages from './messages';

export type Props = {
  interventionId: string;
  /** The intervention must be published — the API rejects anything else. */
  sendingPossible: boolean;
  onCompose: (kind: SmsCampaignComposableKind) => void;
  onBack: () => void;
};

export const SmsCampaignsView: FC<Props> = ({
  interventionId,
  sendingPossible,
  onCompose,
  onBack,
}) => {
  const { formatMessage } = useIntl();

  const predefinedParticipants: Nullable<PredefinedParticipant[]> = useSelector(
    makeSelectPredefinedParticipants(),
  );

  // The manual reminder only reaches participants who already got an
  // invitation; without one the API answers 422 NO_RECIPIENTS.
  const remindingPossible = (predefinedParticipants ?? []).some(
    ({ smsInvitationSentAt }) => !!smsInvitationSentAt,
  );

  return (
    <Column flex={1} minHeight="0px" gap={20}>
      <InviteParticipantsModalBackButton
        invitationType={ParticipantInvitationType.PREDEFINED}
        onBack={onBack}
      />

      <Column flex={1} minHeight="0px" overflow="auto" gap={8}>
        <SmsCampaignsList interventionId={interventionId} />
      </Column>

      <Column gap={8}>
        <Text fontSize={13} color={colors.manatee}>
          {formatMessage(messages.smsCampaignsViewSendInfo)}
        </Text>
        <SendSmsCampaignButtons
          sendingPossible={sendingPossible}
          remindingPossible={remindingPossible}
          onCompose={onCompose}
        />
      </Column>
    </Column>
  );
};
