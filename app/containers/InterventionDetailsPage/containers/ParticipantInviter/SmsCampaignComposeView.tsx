import React, { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  SmsCampaignComposableKind,
  SmsCampaignKind,
  SmsCampaignLink,
  SmsCampaignMeta,
} from 'models/SmsCampaign';

import {
  clearSmsCampaignErrors,
  createSmsCampaignRequest,
  fetchSmsCampaignsMetaRequest,
  makeSelectCreateSmsCampaignErrorCodes,
  makeSelectCreateSmsCampaignRetryAfter,
  makeSelectSmsCampaignsLoader,
  makeSelectSmsCampaignsMeta,
  makeSelectSmsCampaignsMetaError,
} from 'global/reducers/smsCampaigns';

import { calculateSmsBodyLength, isSmsBodyValid } from 'utils/smsBodyLength';

import { colors } from 'theme';

import Button from 'components/Button';
import Column from 'components/Column';
import ErrorAlert from 'components/ErrorAlert';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Text from 'components/Text';

import { InviteParticipantsModalBackButton } from './InviteParticipantsModalBackButton';
import { ParticipantInvitationType } from './types';
import { SmsCampaignBodyField } from './SmsCampaignBodyField';
import { SmsCampaignScheduledReminderFields } from './SmsCampaignScheduledReminderFields';
import { SmsCampaignErrorList } from './SmsCampaignErrorList';
import messages from './messages';

const DEFAULT_DAYS_AFTER = 3;

export type Props = {
  interventionId: string;
  kind: SmsCampaignComposableKind;
  onBack: () => void;
};

export const SmsCampaignComposeView: FC<Props> = ({
  interventionId,
  kind,
  onBack,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const meta: Nullable<SmsCampaignMeta> = useSelector(
    makeSelectSmsCampaignsMeta(),
  );
  const metaLoading = useSelector(makeSelectSmsCampaignsLoader('fetchingMeta'));
  const metaError = useSelector(makeSelectSmsCampaignsMetaError());
  const submitting = useSelector(
    makeSelectSmsCampaignsLoader('creatingCampaign'),
  );
  const errorCodes = useSelector(makeSelectCreateSmsCampaignErrorCodes());
  const retryAfter = useSelector(makeSelectCreateSmsCampaignRetryAfter());

  const [body, setBody] = useState('');
  const [links, setLinks] = useState<SmsCampaignLink[]>([]);

  const isInvitation = kind === SmsCampaignKind.INVITATION;

  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderBody, setReminderBody] = useState('');
  const [reminderLinks, setReminderLinks] = useState<SmsCampaignLink[]>([]);
  const [daysAfter, setDaysAfter] = useState<string>(
    String(DEFAULT_DAYS_AFTER),
  );

  const fetchMeta = () =>
    dispatch(fetchSmsCampaignsMetaRequest(interventionId));

  useEffect(() => {
    if (!meta) fetchMeta();
    return () => {
      dispatch(clearSmsCampaignErrors());
    };
  }, [interventionId]);

  if (!meta && metaError && !metaLoading) {
    return (
      <Column flex={1} gap={20}>
        <InviteParticipantsModalBackButton
          invitationType={ParticipantInvitationType.PREDEFINED}
          onBack={onBack}
        />
        <ErrorAlert errorText={formatMessage(messages.smsCampaignMetaError)} />
        <Row justify="start">
          <Button
            width="auto"
            px={24}
            inverted
            onClick={fetchMeta}
            data-cy="sms-campaign-meta-retry"
          >
            {formatMessage(messages.smsCampaignMetaRetryButton)}
          </Button>
        </Row>
      </Column>
    );
  }

  if (metaLoading || !meta) return <Loader type="inline" />;

  const parsedDaysAfter = Number(daysAfter);
  const daysAfterValid =
    Number.isInteger(parsedDaysAfter) &&
    parsedDaysAfter >= 1 &&
    parsedDaysAfter <= meta.maxReminderDaysAfter;

  const bodyCounter = calculateSmsBodyLength(body, links, meta);
  const reminderCounter = calculateSmsBodyLength(
    reminderBody,
    reminderLinks,
    meta,
  );

  const bodyValid = isSmsBodyValid(body, bodyCounter);

  const reminderValid =
    !reminderEnabled ||
    (isSmsBodyValid(reminderBody, reminderCounter) && daysAfterValid);

  const canSubmit = bodyValid && reminderValid && !submitting;

  const handleSubmit = () => {
    if (!canSubmit) return;

    dispatch(
      createSmsCampaignRequest(
        interventionId,
        {
          kind,
          body,
          links,
          ...(isInvitation && reminderEnabled
            ? {
                scheduledReminder: {
                  body: reminderBody,
                  daysAfter: parsedDaysAfter,
                  links: reminderLinks,
                },
              }
            : {}),
        },
        onBack,
      ),
    );
  };

  return (
    <Column flex={1} overflow="auto" gap={20}>
      <InviteParticipantsModalBackButton
        invitationType={ParticipantInvitationType.PREDEFINED}
        onBack={onBack}
      />

      <Text fontSize={13} color={colors.manatee}>
        {formatMessage(
          isInvitation
            ? messages.smsCampaignInvitationRecipientsInfo
            : messages.smsCampaignReminderRecipientsInfo,
        )}
      </Text>

      <SmsCampaignBodyField
        label={formatMessage(
          isInvitation
            ? messages.smsCampaignInvitationBodyLabel
            : messages.smsCampaignReminderBodyLabel,
        )}
        body={body}
        onBodyChange={setBody}
        links={links}
        onLinksChange={setLinks}
        counter={bodyCounter}
        maxLength={meta.maxBodyLength}
        disabled={submitting}
        dataCyPrefix="sms-campaign"
      />

      {isInvitation && (
        <SmsCampaignScheduledReminderFields
          enabled={reminderEnabled}
          onEnabledChange={setReminderEnabled}
          body={reminderBody}
          onBodyChange={setReminderBody}
          links={reminderLinks}
          onLinksChange={setReminderLinks}
          counter={reminderCounter}
          daysAfter={daysAfter}
          onDaysAfterChange={setDaysAfter}
          meta={meta}
          disabled={submitting}
        />
      )}

      <SmsCampaignErrorList errorCodes={errorCodes} retryAfter={retryAfter} />

      <Row justify="end">
        <Button
          width="auto"
          px={24}
          onClick={handleSubmit}
          disabled={!canSubmit}
          loading={submitting}
          data-cy="sms-campaign-submit"
        >
          {formatMessage(
            isInvitation
              ? messages.smsCampaignSendInvitationSubmit
              : messages.smsCampaignSendReminderSubmit,
          )}
        </Button>
      </Row>
    </Column>
  );
};
