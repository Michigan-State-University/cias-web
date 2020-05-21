import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { colors, themeColors } from 'theme';
import Circle from 'components/Circle';
import { fontSizes } from 'theme/fonts';
import HoverableBox from 'components/Box/HoverableBox';

const NumberCircle = props => (
  <Circle
    {...props}
    size="23px"
    bg={themeColors.primary}
    fontSize={fontSizes.small}
    {...(props.isSelected
      ? { opacity: 1, color: colors.white }
      : { opacity: 0.3, color: colors.jungleGreen })}
  />
);

NumberCircle.propTypes = {
  isSelected: PropTypes.bool,
};

const ToggleableBox = styled(HoverableBox)`
  ${props =>
    props.isSelected ? { backgroundColor: themeColors.highlight } : {}};
`;

ToggleableBox.propTypes = {
  isSelected: PropTypes.bool,
};

export { NumberCircle, ToggleableBox };
