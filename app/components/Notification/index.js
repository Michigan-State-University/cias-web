import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-grid-system';

import { boxShadows, colors, themeColors } from 'theme';

import checklist from 'assets/svg/checklist.svg';

import Box from 'components/Box';
import Img from 'components/Img';
import { Col } from 'components/ReactGridSystem';
import Circle from 'components/Circle';
import Text from 'components/Text';
import ActionIcon from 'components/ActionIcon';

const Notification = ({ title, description, onClose, className }) => (
  <Box
    width="max-content"
    bg={colors.white}
    shadow={boxShadows.black}
    borderRadius={10}
    padding={8}
    zIndex={1}
    className={className}
  >
    <Row style={{ margin: 0 }}>
      <Col style={{ padding: 8 }}>
        <Row align="center">
          <Col xs={3}>
            <Circle
              size="50px"
              bg={colors.linkWater}
              child={<Img src={checklist} role="presentation" />}
            />
          </Col>
          <Col xs={9}>
            <Text fontWeight="bold">{title}</Text>
            <Text color={themeColors.secondary} fontWeight="bold">
              {description}
            </Text>
          </Col>
        </Row>
      </Col>
      <Col align="end" xs="content" style={{ padding: 0 }}>
        <ActionIcon margin="0px" onClick={onClose} />
      </Col>
    </Row>
  </Box>
);

Notification.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.node,
  onClose: PropTypes.func,
};

export default Notification;
