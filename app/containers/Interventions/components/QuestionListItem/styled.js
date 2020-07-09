import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { colors, themeColors } from 'theme';
import Circle from 'components/Circle';
import { fontSizes } from 'theme/fonts';
import HoverableBox from 'components/Box/HoverableBox';
import H3 from 'components/H3';

const NumberCircle = props => (
  <Circle
    {...props}
    size="23px"
    bg={themeColors.primary}
    fontSize={fontSizes.small}
    {...(props.isSelected
      ? { textOpacity: 1, color: colors.white }
      : { textOpacity: 0.3, color: colors.jungleGreen })}
  />
);

NumberCircle.propTypes = {
  isSelected: PropTypes.bool,
};

const ToggleableBox = styled(HoverableBox)`
  ${props => (props.isSelected ? { backgroundColor: colors.zirkon } : {})};
`;

ToggleableBox.propTypes = {
  isSelected: PropTypes.bool,
};

const ClampedTitle = styled(H3)`
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-box-orient: vertical;
  -o-box-orient: vertical;
  display: -webkit-box;
`;

export { NumberCircle, ToggleableBox, ClampedTitle };
