import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-grid-system';

import { boxShadows, colors, themeColors } from 'theme';

import cross from 'assets/svg/cross.svg';
import checklist from 'assets/svg/checklist.svg';

import Box from 'components/Box';
import Img from 'components/Img';
import { Col } from 'components/ReactGridSystem';
import Circle from 'components/Circle';
import Text from 'components/Text';
import { CrossButton } from 'components/ActionIcon/styled';

const Notification = ({ title, description, onClose, style }) => (
  <Box
    width="max-content"
    bg={colors.white}
    shadow={boxShadows.black}
    borderRadius={10}
    padding={8}
    zIndex={1}
    {...style}
  >
    <Row style={{ margin: 0 }}>
      <Col style={{ padding: 8 }}>
        <Row align="center">
          <Col xs={3}>
            <Circle
              size="50px"
              bg={colors.linkWater}
              child={<Img src={checklist} />}
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
        <CrossButton margin="0px" onClick={onClose}>
          <Img src={cross} alt="cross" />
        </CrossButton>
      </Col>
    </Row>
  </Box>
);

Notification.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.node,
  onClose: PropTypes.func,
};

export default Notification;