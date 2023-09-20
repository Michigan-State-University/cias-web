import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { InterventionInvitation } from 'models/Intervention';

import { colors, themeColors } from 'theme';

import { NoMaxWidthTD, StripedTR } from 'components/Table';
import { EllipsisText } from 'components/Text';
import { TextButton } from 'components/Button';
import Row from 'components/Row';
import { Tooltip } from 'components/Tooltip';
import { CircleCounter } from 'components/CircleCounter';

import messages from './messages';

export type Props = {
  invitation: InterventionInvitation;
};

export const EmailParticipantsTableRow: FC<Props> = ({
  invitation: { email, id },
}) => {
  const { formatMessage } = useIntl();

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
    >
      <NoMaxWidthTD padding={8} width="50%">
        <EllipsisText text={email} fontSize={15} />
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8} width="20%">
        <Row align="center">
          {/* TODO implement session counter */}
          <Tooltip
            id={`session-invitations-count-tooltip-${id}`}
            content={formatMessage(messages.sessionInvitationsCountTitle)}
          >
            <CircleCounter count={1} size={24} bg={themeColors.secondary} />
          </Tooltip>
        </Row>
      </NoMaxWidthTD>
      <NoMaxWidthTD padding={8} width="30%">
        <Row justify="end">
          <TextButton
            buttonProps={{
              color: themeColors.secondary,
            }}
          >
            {formatMessage(messages.resendInvitationButtonLabel)}
          </TextButton>
        </Row>
      </NoMaxWidthTD>
    </StripedTR>
  );
};
