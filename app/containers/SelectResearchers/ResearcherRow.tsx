import React from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import InviteIcon from 'assets/svg/invite.svg';
import CheckGreenIcon from 'assets/svg/check-green.svg';

import { UserItemState, UserWithState } from 'global/reducers/userList';

import { StripedTR } from 'components/Table';
import Row from 'components/Row';
import { EllipsisText } from 'components/Text';
import { ImageButton } from 'components/Button';

import messages from './messages';
import { StyledTD } from './styled';

type Props = {
  researcher: UserWithState;
  onSelected: () => void;
  actionName: string;
};

const ResearcherRow = ({
  researcher: { fullName, email, state },
  onSelected,
  actionName,
}: Props) => {
  const { formatMessage } = useIntl();

  const trimmedFullName = fullName.trim();

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
      mb={4}
    >
      <StyledTD padding={8}>
        <EllipsisText
          text={trimmedFullName || formatMessage(messages.waitingForActivation)}
          color={!trimmedFullName && themeColors.warning}
        />
      </StyledTD>
      <StyledTD padding={8}>
        <EllipsisText text={email} />
      </StyledTD>
      <StyledTD pl={8}>
        <Row>
          {(!state ||
            state === UserItemState.IDLE ||
            state === UserItemState.LOADING) && (
            <ImageButton
              src={InviteIcon}
              onClick={onSelected}
              title={actionName}
              loading={state === UserItemState.LOADING}
              spinnerProps={{ margin: 'initial', color: colors.black }}
            />
          )}
          {state === UserItemState.SUCCESS && (
            <ImageButton
              src={CheckGreenIcon}
              title={formatMessage(messages.success)}
            />
          )}
        </Row>
      </StyledTD>
    </StripedTR>
  );
};

export default ResearcherRow;
