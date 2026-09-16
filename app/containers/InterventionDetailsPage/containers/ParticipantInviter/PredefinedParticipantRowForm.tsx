import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { getCountryCallingCode } from 'libphonenumber-js';

import { colors, themeColors } from 'theme';
import { formatPhone } from 'utils/phone';

import { NoMaxWidthTD, StripedTR } from 'components/Table';
import { EllipsisText } from 'components/Text';
import { TextButton } from 'components/Button';
import Row from 'components/Row';

import { ParsedPredefinedParticipantCsvRow, RaAnswerColumnMap } from './types';
import { TEXT_BUTTON_PROPS } from './constants';
import messages from './messages';

export type Props = {
  rowNumber: number;
  participant: ParsedPredefinedParticipantCsvRow;
  onRemove: () => void;
  raAnswerColumns?: RaAnswerColumnMap;
};

export const PredefinedParticipantRowForm: FC<Props> = ({
  rowNumber,
  participant,
  onRemove,
  raAnswerColumns,
}) => {
  const { formatMessage } = useIntl();

  const fullName =
    [participant.firstName, participant.lastName].filter(Boolean).join(' ') ||
    participant.externalId ||
    '';

  let phone = '';
  if (participant.number && participant.iso) {
    try {
      phone = formatPhone({
        prefix: `+${getCountryCallingCode(participant.iso.value)}`,
        number: participant.number,
        iso: participant.iso.value,
      });
    } catch {
      // Invalid country code, leave phone empty
    }
  }

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
    >
      <NoMaxWidthTD padding={8}>
        <EllipsisText
          text={String(rowNumber)}
          fontSize={12}
          fontWeight="bold"
        />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8}>
        <EllipsisText text={fullName} fontSize={12} />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8}>
        <EllipsisText text={participant.email || ''} fontSize={12} />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8}>
        <EllipsisText text={phone} fontSize={12} />
      </NoMaxWidthTD>
      {Object.keys(raAnswerColumns ?? {}).map((columnKey) => (
        <NoMaxWidthTD key={columnKey} padding={8}>
          <EllipsisText
            text={participant.raAnswers?.[columnKey] ?? '—'}
            fontSize={12}
          />
        </NoMaxWidthTD>
      ))}
      <NoMaxWidthTD padding={8}>
        <Row justify="end">
          <TextButton
            buttonProps={{ ...TEXT_BUTTON_PROPS, color: themeColors.warning }}
            onClick={onRemove}
          >
            {formatMessage(messages.removeParticipantRow)}
          </TextButton>
        </Row>
      </NoMaxWidthTD>
    </StripedTR>
  );
};
