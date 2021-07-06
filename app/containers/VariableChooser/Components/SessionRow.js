import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import presentationProjector from 'assets/svg/presentation-projector.svg';
import presentationProjectorSelected from 'assets/svg/presentation-projector-selected.svg';

import Img from 'components/Img';
import Badge from 'components/Badge';
import EllipsisText from 'components/Text/EllipsisText';
import Box from 'components/Box';
import { Col, NoMarginRow } from 'components/ReactGridSystem';

import messages from '../messages';

const SessionRow = ({ id, isInitialSession, isLast, name, onClick }) => {
  const { formatMessage } = useIntl();

  return (
    <NoMarginRow
      data-testid={`${id}-select-session`}
      mb={!isLast && 15}
      onClick={() => onClick(id)}
      align="center"
      clickable
      nogutter
    >
      <Col xs="content">
        <Img
          src={
            isInitialSession
              ? presentationProjectorSelected
              : presentationProjector
          }
          mr={10}
        />
      </Col>

      <Col>
        <Box mr={10} width="100%">
          <EllipsisText
            text={name}
            fontWeight={isInitialSession ? 'bold' : ''}
            fontSize={13}
          />
        </Box>
      </Col>

      {isInitialSession && (
        <Col xs="content">
          <Badge bg={themeColors.secondary} color={colors.white}>
            {formatMessage(messages.selectedInterventionBadge)}
          </Badge>
        </Col>
      )}
    </NoMarginRow>
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
