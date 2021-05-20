import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { colors, themeColors } from 'theme';

import { Col, Row } from 'components/ReactGridSystem';
import Circle from 'components/Circle';
import Tooltip from 'components/Tooltip';
import Icon from 'components/Icon';
import Text from 'components/Text';

import { ChartButtonBox } from '../styled';
import { FullWidthContainer } from '../../../styled';

const ChartButton = ({ onClick, title, helperText, icon }) => (
  <ChartButtonBox onClick={onClick}>
    <FullWidthContainer>
      <Row justify="end">
        <Col xs="content">
          <Tooltip id={`Chart-Tooltip-${title}`} content={helperText}>
            <Circle
              bg={themeColors.secondary}
              color={colors.white}
              size="16px"
              fontWeight="bold"
              fontSize={11}
              child="?"
            />
          </Tooltip>
        </Col>
      </Row>

      <Row justify="center" mt={3}>
        <Col xs="content">
          <Icon src={icon} />
        </Col>
      </Row>

      <Row justify="center" mt={12}>
        <Col xs="content">
          <Text fontWeight="bold">{title}</Text>
        </Col>
      </Row>
    </FullWidthContainer>
  </ChartButtonBox>
);

ChartButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.string,
};

export default memo(ChartButton);
