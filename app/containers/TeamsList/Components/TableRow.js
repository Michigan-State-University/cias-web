import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import StyledTextButton from 'components/Button/StyledTextButton';
import Text from 'components/Text';
import { StripedTR, TD } from 'components/Table';
import { colors, themeColors } from 'theme';

import Team from 'models/Teams/Team';
import { TeamListContext } from './utils';
import messages from '../messages';

const TableRow = ({
  team: { id, name, teamAdmin },
  history,
  openModal,
  formatMessage,
}) => {
  const { isAdmin } = useContext(TeamListContext);

  const handleClick = (e) => {
    e.stopPropagation();
    openModal({
      id,
      name,
      teamAdmin,
    });
  };

  const handleRedirect = () => history.push(`/teams/${id}`);

  const text = formatMessage(messages.deleteTeam);

  const textColor = themeColors.warning;

  return (
    <StripedTR
      lastItemHoverable={isAdmin ? 1 : 0}
      cursor="pointer"
      hoverBg={colors.linkWater}
      color={colors.white}
      textColor={colors.black}
      onClick={handleRedirect}
    >
      <TD pl={20}>{name}</TD>
      <TD pl={20}>{teamAdmin?.fullName}</TD>
      <TD pl={20}>{teamAdmin?.email}</TD>
      {isAdmin && (
        <TD>
          <Row width="100%" justify="end" pr={20}>
            <StyledTextButton onClick={handleClick}>
              <Text color={textColor} fontWeight="bold">
                {text}
              </Text>
            </StyledTextButton>
          </Row>
        </TD>
      )}
    </StripedTR>
  );
};

TableRow.propTypes = {
  team: PropTypes.shape(Team),
  history: PropTypes.object,
  openModal: PropTypes.func,
  formatMessage: PropTypes.func.isRequired,
};

export default TableRow;
