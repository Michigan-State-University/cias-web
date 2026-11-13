import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  makeSelectLatestSmsCampaign,
  makeSelectSmsCampaignsLoader,
} from 'global/reducers/smsCampaigns';

import { colors } from 'theme';

import { AlertType, getBackgroundColorByType } from 'components/Alert';
import { TextButton } from 'components/Button';
import Row from 'components/Row';
import Text from 'components/Text';

import messages from './messages';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  onOpen: () => void;
};

export const SmsCampaignsSummaryBar: FC<Props> = ({ onOpen }) => {
  const { formatMessage } = useIntl();

  const { latest, inProgress } = useSelector(makeSelectLatestSmsCampaign());
  const loading = useSelector(
    makeSelectSmsCampaignsLoader('fetchingCampaigns'),
  );

  return (
    // Same geometry as `Alert`; padding stays in both states so the row does
    // not jump when a campaign starts.
    <Row
      width="100%"
      borderRadius="8px"
      py={12}
      px={16}
      gap={16}
      align="center"
      justify="between"
      bg={inProgress ? getBackgroundColorByType(AlertType.INFO) : undefined}
      data-cy="sms-campaigns-summary-bar"
    >
      <Text fontSize={13} color={colors.manatee}>
        {!latest && !loading && formatMessage(messages.smsCampaignsSummaryNone)}
        {latest && (
          <>
            {formatMessage(messages.smsCampaignsSummaryLatest, {
              kind: formatMessage(messages.smsCampaignKindValue, {
                kind: latest.kind,
              }),
              status: formatMessage(messages.smsCampaignStatusValue, {
                status: latest.status,
              }),
            })}
            {latest.recipientsCount !== null &&
              ` · ${formatMessage(messages.smsCampaignsSummaryRecipients, {
                recipients: latest.recipientsCount,
              })}`}
          </>
        )}
      </Text>

      <TextButton
        buttonProps={{
          ...TEXT_BUTTON_PROPS,
          'data-cy': 'open-sms-campaigns-view',
        }}
        onClick={onOpen}
      >
        {formatMessage(messages.smsCampaignsSummaryOpenButton)}
      </TextButton>
    </Row>
  );
};
