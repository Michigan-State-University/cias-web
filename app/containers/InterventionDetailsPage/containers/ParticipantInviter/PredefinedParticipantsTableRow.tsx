import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';

import { PredefinedParticipant } from 'models/PredefinedParticipant';

import { formatPhone } from 'utils/phone';

import { colors } from 'theme';

import { NoMaxWidthTD, StripedTR } from 'components/Table';
import { EllipsisText } from 'components/Text';
import { TextButton } from 'components/Button';
import Row from 'components/Row';

import messages from './messages';
import { TEXT_BUTTON_PROPS } from './constants';
import { CopyPredefinedParticipantUrlButton } from './CopyPredefinedParticipantUrlButton';
import { getPredefinedParticipantUrl } from './utils';

export type Props = {
  predefinedParticipant: PredefinedParticipant;
  onManage: (participantId: string) => void;
};

const PredefinedParticipantsTableRowComponent: FC<Props> = ({
  predefinedParticipant,
  onManage,
}) => {
  const { formatMessage } = useIntl();

  const {
    id,
    fullName,
    externalId,
    active,
    smsInvitationSentAt,
    emailInvitationSentAt,
    phone,
    slug,
  } = predefinedParticipant;

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
    >
      <NoMaxWidthTD padding={8} width="40%">
        <EllipsisText
          text={
            fullName?.trim() ||
            (phone && formatPhone(phone)) ||
            externalId ||
            ''
          }
          fontSize={15}
        />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8} width="20%">
        <EllipsisText
          text={formatMessage(messages.statusColumnValue, { active })}
          fontSize={15}
        />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8} width="20%">
        <EllipsisText
          text={formatMessage(messages.invitationColumnValue, {
            invitationSent: !!(smsInvitationSentAt || emailInvitationSentAt),
          })}
          fontSize={15}
        />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8} width="20%">
        <Row justify="end" gap={16}>
          <CopyPredefinedParticipantUrlButton
            url={getPredefinedParticipantUrl(slug)}
          />
          <TextButton
            buttonProps={TEXT_BUTTON_PROPS}
            onClick={() => onManage(id)}
          >
            {formatMessage(messages.managePredefinedParticipantButtonLabel)}
          </TextButton>
        </Row>
      </NoMaxWidthTD>
    </StripedTR>
  );
};

export const PredefinedParticipantsTableRow = memo(
  PredefinedParticipantsTableRowComponent,
);
