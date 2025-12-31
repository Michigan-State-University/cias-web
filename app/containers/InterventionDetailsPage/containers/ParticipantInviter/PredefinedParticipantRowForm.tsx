import React, { FC } from 'react';

import { colors, themeColors } from 'theme';
import { formatPhone } from 'utils/phone';

import { NoMaxWidthTD, StripedTR } from 'components/Table';
import { EllipsisText } from 'components/Text';
import { TextButton } from 'components/Button';
import Row from 'components/Row';

import { ParsedPredefinedParticipantCsvRow } from './types';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  participant: ParsedPredefinedParticipantCsvRow;
  onRemove: () => void;
};

export const PredefinedParticipantRowForm: FC<Props> = ({
  participant,
  onRemove,
}) => {
  const fullName =
    [participant.firstName, participant.lastName].filter(Boolean).join(' ') ||
    participant.externalId ||
    '';

  const phone = participant.number
    ? formatPhone({ prefix: participant.iso, number: participant.number })
    : '';

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
    >
      <NoMaxWidthTD padding={8} width="40%">
        <EllipsisText text={fullName} fontSize={15} />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8} width="30%">
        <EllipsisText text={participant.email || ''} fontSize={15} />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8} width="20%">
        <EllipsisText text={phone} fontSize={15} />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8} width="10%">
        <Row justify="end">
          <TextButton
            buttonProps={{ ...TEXT_BUTTON_PROPS, color: themeColors.warning }}
            onClick={onRemove}
          >
            Remove
          </TextButton>
        </Row>
      </NoMaxWidthTD>
    </StripedTR>
  );
};
