import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { SmsCampaignLink, SmsCampaignMeta } from 'models/SmsCampaign';

import { SmsBodyLength } from 'utils/smsBodyLength';

import { colors } from 'theme';

import Checkbox from 'components/Checkbox';
import Column from 'components/Column';
import Input from 'components/Input';
import Row from 'components/Row';
import Text from 'components/Text';

import { SmsCampaignBodyField } from './SmsCampaignBodyField';
import messages from './messages';

export type Props = {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  body: string;
  onBodyChange: (body: string) => void;
  links: SmsCampaignLink[];
  onLinksChange: (links: SmsCampaignLink[]) => void;
  counter: SmsBodyLength;
  /** Kept as a string so a half-typed value is not coerced to NaN. */
  daysAfter: string;
  onDaysAfterChange: (daysAfter: string) => void;
  meta: SmsCampaignMeta;
  disabled: boolean;
};

export const SmsCampaignScheduledReminderFields: FC<Props> = ({
  enabled,
  onEnabledChange,
  body,
  onBodyChange,
  links,
  onLinksChange,
  counter,
  daysAfter,
  onDaysAfterChange,
  meta,
  disabled,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Column gap={12}>
      <Checkbox
        id="sms-campaign-add-reminder"
        checked={enabled}
        onChange={onEnabledChange}
        disabled={disabled}
      >
        <Text data-cy="sms-campaign-add-reminder-label">
          {formatMessage(messages.smsCampaignAddReminderLabel)}
        </Text>
      </Checkbox>

      {enabled && (
        <Column gap={12}>
          <SmsCampaignBodyField
            label={formatMessage(messages.smsCampaignReminderBodyLabel)}
            body={body}
            onBodyChange={onBodyChange}
            links={links}
            onLinksChange={onLinksChange}
            counter={counter}
            maxLength={meta.maxBodyLength}
            disabled={disabled}
            dataCyPrefix="sms-campaign-reminder"
          />

          <Row align="center" gap={8}>
            <Text>{formatMessage(messages.smsCampaignDaysAfterLabel)}</Text>
            <Input
              type="number"
              min={1}
              max={meta.maxReminderDaysAfter}
              width={80}
              value={daysAfter}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onDaysAfterChange(event.target.value)
              }
              disabled={disabled}
              data-cy="sms-campaign-days-after"
              aria-label={formatMessage(messages.smsCampaignDaysAfterLabel)}
            />
            <Text fontSize={12} color={colors.manatee}>
              {formatMessage(messages.smsCampaignDaysAfterHint, {
                max: meta.maxReminderDaysAfter,
              })}
            </Text>
          </Row>
        </Column>
      )}
    </Column>
  );
};
