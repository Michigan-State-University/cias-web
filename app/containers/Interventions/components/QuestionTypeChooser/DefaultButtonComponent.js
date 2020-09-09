import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import HoverableBox from 'components/Box/HoverableBox';
import Row from 'components/Row';
import Text from 'components/Text';
import { colors, borders, themeColors } from 'theme';

import messages from './messages';

const DefaultButtonComponent = ({ onClick }) => (
  <HoverableBox
    px={21}
    py={14}
    onClick={onClick}
    display="flex"
    justify="center"
    align="center"
    border={`${borders.borderWidth} dashed ${colors.greyishBlue}`}
    borderRadius={5}
    height={80}
    width="100%"
  >
    <Row align="center">
      <Text fontWeight="bold" color={themeColors.secondary}>
        <FormattedMessage {...messages.addScreen} />
      </Text>
    </Row>
  </HoverableBox>
);

DefaultButtonComponent.propTypes = {
  onClick: PropTypes.func,
};

export default DefaultButtonComponent;
