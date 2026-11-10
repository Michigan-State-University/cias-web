import React, { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { SmsCampaign } from 'models/SmsCampaign';

import {
  cancelSmsCampaignRequest,
  makeSelectCancelSmsCampaignErrorCodes,
  makeSelectSmsCampaigns,
  makeSelectSmsCampaignsLoader,
} from 'global/reducers/smsCampaigns';

import { colors } from 'theme';

import Column from 'components/Column';
import Loader from 'components/Loader';
import { TBody, TH, THead, TR, Table } from 'components/Table';
import Text from 'components/Text';

import { SmsCampaignErrorList } from './SmsCampaignErrorList';
import { SmsCampaignsTableRow } from './SmsCampaignsTableRow';
import messages from './messages';

const COLUMN_HEADERS = [
  messages.smsCampaignKindColumnHeader,
  messages.statusColumnHeader,
  messages.smsCampaignDateColumnHeader,
  messages.smsCampaignRecipientsColumnHeader,
];

export type Props = {
  interventionId: string;
};

export const SmsCampaignsList: FC<Props> = ({ interventionId }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const campaigns: SmsCampaign[] = useSelector(makeSelectSmsCampaigns());
  const loading = useSelector(
    makeSelectSmsCampaignsLoader('fetchingCampaigns'),
  );
  const cancellingId = useSelector(
    makeSelectSmsCampaignsLoader('cancellingCampaignId'),
  );
  const cancelErrorCodes = useSelector(makeSelectCancelSmsCampaignErrorCodes());

  const handleCancel = useCallback(
    (campaignId: string) => {
      dispatch(cancelSmsCampaignRequest(interventionId, campaignId));
    },
    [dispatch, interventionId],
  );

  if (loading && !campaigns.length) return <Loader type="inline" />;

  if (!campaigns.length) {
    return (
      <Text fontSize={13} color={colors.manatee} data-cy="sms-campaigns-empty">
        {formatMessage(messages.smsCampaignsListEmpty)}
      </Text>
    );
  }

  return (
    <Column gap={8} data-cy="sms-campaigns-list">
      <Text fontWeight="bold">
        {formatMessage(messages.smsCampaignsListHeader)}
      </Text>
      <SmsCampaignErrorList errorCodes={cancelErrorCodes} />
      <Table width="100%">
        <THead>
          <TR height={40}>
            {COLUMN_HEADERS.map((header) => (
              <TH key={header.id} padding={8}>
                <Text textAlign="left" fontWeight="bold" fontSize={13}>
                  {formatMessage(header)}
                </Text>
              </TH>
            ))}
            <TH width={90} />
          </TR>
        </THead>
        <TBody>
          {campaigns.map((campaign) => (
            <SmsCampaignsTableRow
              key={campaign.id}
              campaign={campaign}
              cancelling={cancellingId === campaign.id}
              onCancel={handleCancel}
            />
          ))}
        </TBody>
      </Table>
    </Column>
  );
};
