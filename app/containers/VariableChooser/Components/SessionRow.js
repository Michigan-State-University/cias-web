import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import presentationProjector from 'assets/svg/presentation-projector.svg';
import presentationProjectorSelected from 'assets/svg/presentation-projector-selected.svg';

import Row from 'components/Row';

import Img from 'components/Img';
import Badge from 'components/Badge';
import EllipsisText from 'components/Text/EllipsisText';
import Box from 'components/Box';

import messages from '../messages';

const SessionRow = ({ id, isInitialSession, isLast, name, onClick }) => {
  const { formatMessage } = useIntl();

  return (
    <Row
      data-testid={`${id}-select-session`}
      mb={!isLast && 15}
      onClick={() => onClick(id)}
      align="center"
      clickable
    >
      <Img
        src={
          isInitialSession
            ? presentationProjectorSelected
            : presentationProjector
        }
        mr={10}
      />
      <Box mr={10}>
        <EllipsisText
          text={name}
          fontWeight={isInitialSession ? 'bold' : ''}
          fontSize={13}
        />
      </Box>
      {isInitialSession && (
        <Badge bg={themeColors.secondary} color={colors.white}>
          {formatMessage(messages.selectedInterventionBadge)}
        </Badge>
      )}
    </Row>
  );
};

SessionRow.propTypes = {
  id: PropTypes.string,
  isLast: PropTypes.bool,
  isInitialSession: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

export default memo(SessionRow);
