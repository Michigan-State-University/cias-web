import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { SmsCampaignComposableKind, SmsCampaignKind } from 'models/SmsCampaign';

import { makeSelectCanCurrentUserMakeChanges } from 'global/reducers/intervention';

import Button from 'components/Button';
import Row from 'components/Row';
import Tooltip from 'components/Tooltip';

import messages from './messages';

export type Props = {
  /** The intervention must be published — the API rejects anything else. */
  sendingPossible: boolean;
  /** No participant has been invited yet, so there is nobody to remind. */
  remindingPossible: boolean;
  onCompose: (kind: SmsCampaignComposableKind) => void;
};

export const SendSmsCampaignButtons: FC<Props> = ({
  sendingPossible,
  remindingPossible,
  onCompose,
}) => {
  const { formatMessage } = useIntl();

  // The campaign endpoints also require being the current editor (else 403).
  const canCurrentUserMakeChanges = !!useSelector(
    makeSelectCanCurrentUserMakeChanges(),
  );

  const allowed = sendingPossible && canCurrentUserMakeChanges;

  let disabledReason = messages.smsCampaignNoInvitedParticipantsInfo;
  if (!sendingPossible) disabledReason = messages.smsCampaignNotPublishedInfo;
  else if (!canCurrentUserMakeChanges)
    disabledReason = messages.smsCampaignNotEditorInfo;

  return (
    <Row align="center" gap={16}>
      <Tooltip
        id="sms-campaign-invitation-disabled"
        visible={!allowed}
        text={formatMessage(disabledReason)}
        nonInteractive
      >
        <Button
          width="auto"
          px={24}
          onClick={() => onCompose(SmsCampaignKind.INVITATION)}
          disabled={!allowed}
          data-cy="send-sms-invitation-button"
        >
          {formatMessage(messages.sendSmsInvitationButtonTitle)}
        </Button>
      </Tooltip>

      <Tooltip
        id="sms-campaign-reminder-disabled"
        visible={!allowed || !remindingPossible}
        text={formatMessage(disabledReason)}
        nonInteractive
      >
        <Button
          width="auto"
          px={24}
          inverted
          onClick={() => onCompose(SmsCampaignKind.MANUAL_REMINDER)}
          disabled={!allowed || !remindingPossible}
          data-cy="send-sms-reminder-button"
        >
          {formatMessage(messages.sendSmsReminderButtonTitle)}
        </Button>
      </Tooltip>
    </Row>
  );
};
