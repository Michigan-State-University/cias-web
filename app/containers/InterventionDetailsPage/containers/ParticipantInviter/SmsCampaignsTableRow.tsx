import React, { FC, memo, useState } from 'react';
import { useIntl } from 'react-intl';
// @ts-ignore
import styled from 'styled-components';

import { SmsCampaign, SmsCampaignStatus } from 'models/SmsCampaign';

import { borders, colors, themeColors } from 'theme';

import arrowheadDown from 'assets/svg/arrowhead-down.svg';
import arrowheadUp from 'assets/svg/arrowhead-up.svg';

import Badge from 'components/Badge';
import { TextButton } from 'components/Button';
import Img from 'components/Img';
import Row from 'components/Row';
import { NoMaxWidthTD, TD, TR } from 'components/Table';
import Text from 'components/Text';

import globalMessages from 'global/i18n/globalMessages';

import messages from './messages';
import { TEXT_BUTTON_PROPS } from './constants';
import { SMS_CAMPAIGNS_COLUMN_COUNT } from './smsCampaignsTableColumns';
import { SmsCampaignPreview } from './SmsCampaignPreview';
import { formatTimestamp } from './utils';

type CampaignTRProps = {
  $bg: string;
  $roundTop: boolean;
  $roundBottom: boolean;
};

const CampaignTR = styled(TR)`
  --round-top: ${({ $roundTop }: CampaignTRProps) =>
    $roundTop ? borders.borderRadius : 0};
  --round-bottom: ${({ $roundBottom }: CampaignTRProps) =>
    $roundBottom ? borders.borderRadius : 0};
  background: ${({ $bg }: CampaignTRProps) => $bg};

  td:first-child {
    border-top-left-radius: var(--round-top);
    border-bottom-left-radius: var(--round-bottom);
  }

  td:last-child {
    border-top-right-radius: var(--round-top);
    border-bottom-right-radius: var(--round-bottom);
  }
`;

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
  striped: boolean;
};

const SmsCampaignsTableRowComponent: FC<Props> = ({
  campaign,
  cancelling,
  onCancel,
  striped,
}) => {
  const { formatMessage } = useIntl();

  const [expanded, setExpanded] = useState(false);

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
    body,
    links,
  } = campaign;

  const cancellable = status === SmsCampaignStatus.SCHEDULED;
  const bg = striped ? colors.aliceBlueSaturated : colors.white;

  return (
    <>
      <CampaignTR
        height={44}
        $bg={bg}
        $roundTop
        $roundBottom={!expanded}
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
        <TD padding={8}>
          <Row justify="end">
            <TextButton
              buttonProps={{
                ...TEXT_BUTTON_PROPS,
                'data-cy': `sms-campaign-toggle-preview-${id}`,
                'aria-expanded': expanded,
                'aria-label': formatMessage(
                  expanded
                    ? messages.smsCampaignHidePreviewLabel
                    : messages.smsCampaignShowPreviewLabel,
                ),
              }}
              onClick={() => setExpanded((isExpanded) => !isExpanded)}
            >
              <Img src={expanded ? arrowheadUp : arrowheadDown} alt="" />
            </TextButton>
          </Row>
        </TD>
      </CampaignTR>

      {expanded && (
        <CampaignTR height="auto" $bg={bg} $roundTop={false} $roundBottom>
          <TD
            colSpan={SMS_CAMPAIGNS_COLUMN_COUNT}
            padding={8}
            data-cy={`sms-campaign-preview-cell-${id}`}
          >
            <SmsCampaignPreview
              body={body}
              links={links}
              dataCy={`sms-campaign-preview-${id}`}
            />
          </TD>
        </CampaignTR>
      )}
    </>
  );
};

export const SmsCampaignsTableRow = memo(SmsCampaignsTableRowComponent);
