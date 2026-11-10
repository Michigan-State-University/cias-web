import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';

import { SmsCampaign, SmsCampaignStatus } from 'models/SmsCampaign';

import { colors, themeColors } from 'theme';

import Badge from 'components/Badge';
import { TextButton } from 'components/Button';
import Row from 'components/Row';
import { NoMaxWidthTD, StripedTR } from 'components/Table';
import Text from 'components/Text';

import globalMessages from 'global/i18n/globalMessages';

import messages from './messages';
import { TEXT_BUTTON_PROPS } from './constants';
import { formatTimestamp } from './utils';

const STATUS_COLORS: Record<SmsCampaignStatus, string> = {
  [SmsCampaignStatus.SCHEDULED]: colors.manatee,
  [SmsCampaignStatus.SENDING]: colors.manatee,
  [SmsCampaignStatus.SENT]: colors.jungleGreen,
  [SmsCampaignStatus.FAILED]: themeColors.warning,
  [SmsCampaignStatus.CANCELLED]: colors.manatee,
  [SmsCampaignStatus.SKIPPED]: colors.manatee,
};

export type Props = {
  campaign: SmsCampaign;
  cancelling: boolean;
  onCancel: (campaignId: string) => void;
};

const SmsCampaignsTableRowComponent: FC<Props> = ({
  campaign,
  cancelling,
  onCancel,
}) => {
  const { formatMessage } = useIntl();

  const {
    id,
    kind,
    status,
    scheduledAt,
    sentAt,
    acceptedCount,
    failedCount,
    recipientsCount,
    scheduledAtProvisional,
  } = campaign;

  const cancellable = status === SmsCampaignStatus.SCHEDULED;

  return (
    <StripedTR
      height={44}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
      data-cy={`sms-campaign-row-${id}`}
    >
      <NoMaxWidthTD padding={8}>
        <Text fontSize={13}>
          {formatMessage(messages.smsCampaignKindValue, { kind })}
        </Text>
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8}>
        <Badge
          bg={STATUS_COLORS[status]}
          color={colors.white}
          data-cy={`sms-campaign-status-${id}`}
        >
          {formatMessage(messages.smsCampaignStatusValue, { status })}
        </Badge>
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8}>
        <Text fontSize={13}>
          {formatTimestamp(sentAt ?? scheduledAt) ?? '—'}
          {scheduledAtProvisional &&
            ` ${formatMessage(messages.smsCampaignScheduledAtProvisional)}`}
        </Text>
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8}>
        <Text fontSize={13}>
          {recipientsCount === null
            ? formatMessage(messages.smsCampaignRecipientsResolvedAtSendTime)
            : formatMessage(messages.smsCampaignRecipientsValue, {
                recipients: recipientsCount,
                accepted: acceptedCount,
                failed: failedCount,
              })}
        </Text>
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8}>
        {cancellable && (
          <Row justify="end">
            <TextButton
              buttonProps={{
                ...TEXT_BUTTON_PROPS,
                'data-cy': `sms-campaign-cancel-${id}`,
              }}
              onClick={() => onCancel(id)}
              disabled={cancelling}
              loading={cancelling}
            >
              {formatMessage(globalMessages.cancel)}
            </TextButton>
          </Row>
        )}
      </NoMaxWidthTD>
    </StripedTR>
  );
};

export const SmsCampaignsTableRow = memo(SmsCampaignsTableRowComponent);
