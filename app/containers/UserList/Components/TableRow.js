import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import trim from 'lodash/trim';

import Row from 'components/Row';
import StyledTextButton from 'components/Button/StyledTextButton';
import Text from 'components/Text';
import UserRoleTile from 'components/UserRoleTile';
import { StripedTR, TD } from 'components/Table';
import { colors } from 'theme';
import { ternary } from 'utils/ternary';

import { RemoveFromTeamModalContext, TeamIdContext } from './utils';
import messages from '../messages';

const TableRow = ({
  user: { id, email, fullName, roles, active },
  history,
  openModal,

  formatMessage,
}) => {
  const teamId = useContext(TeamIdContext);
  const openRemoveFromTeamModal = useContext(RemoveFromTeamModalContext);

  const handleClick = e => {
    e.stopPropagation();
    openModal({
      id,
      email,
      fullName,
      active,
    });
  };

  const handleRemoveFromTeamClick = e => {
    e.stopPropagation();
    openRemoveFromTeamModal({
      id,
      email,
      fullName,
      active,
      teamId,
    });
  };

  const handleRedirect = () => history.push(`/users/${id}`);
  const text = active
    ? formatMessage(messages.deactivateAccount)
    : formatMessage(messages.activateAccount);
  const textColor = active ? colors.flamingo : colors.jungleGreen;
  const trimmedFullName = trim(fullName);
  const nameColumn = ternary(
    trimmedFullName,
    trimmedFullName,
    <Text color={colors.flamingo}>
      {formatMessage(messages.waitingForActivation)}
    </Text>,
  );
  return (
    <StripedTR
      lastItemHoverable={teamId ? 2 : 1}
      cursor="pointer"
      hoverBg={colors.linkWater}
      color={colors.white}
      textColor={active ? colors.black : colors.grey}
      onClick={handleRedirect}
    >
      <TD pl={20}>{nameColumn}</TD>
      <TD pl={20}>{email}</TD>
      <TD pl={20}>
        <UserRoleTile role={roles[0]} disabled={!active} />
      </TD>
      <TD pl={20}>
        <Row width="100%" justify="start" pr={20}>
          <StyledTextButton onClick={handleClick} textAlign="start">
            <Text color={textColor} fontWeight="bold">
              {text}
            </Text>
          </StyledTextButton>
        </Row>
      </TD>
      {teamId && (
        <TD pl={20}>
          <Row width="100%" justify="start" pr={20}>
            <StyledTextButton
              onClick={handleRemoveFromTeamClick}
              textAlign="start"
            >
              <Text color={textColor} fontWeight="bold">
                {formatMessage(messages.deleteFromTeam)}
              </Text>
            </StyledTextButton>
          </Row>
        </TD>
      )}
    </StripedTR>
  );
};

TableRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    fullName: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.bool,
  }),
  history: PropTypes.object,
  openModal: PropTypes.func,
  formatMessage: PropTypes.func.isRequired,
};

export default TableRow;
